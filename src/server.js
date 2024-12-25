// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import logger from './logger.js';
import { fileURLToPath } from 'url';
import { ModbusClient } from './services/modbusClient.js';
import { ModbusSimulator } from './services/modbusSimulator.js';
import pageRoutes from './routes/pageRoutes.js';
import kotel1Routes from './routes/kotel1Routes.js';
import kotel2Routes from './routes/kotel2Routes.js';
import kotel3Routes from './routes/kotel3Routes.js';
import { connectDB } from './services/dataBaseService.js';
import { devicesConfig } from './services/devicesConfig.js';

// Определяем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загружаем переменные окружения
dotenv.config();
const port = process.env.PORT || 3002;

// Определяем, использовать ли симулятор или реальный ModbusClient
const isProduction = process.env.NODE_ENV === 'production';
const Client = isProduction ? ModbusClient : ModbusSimulator;
logger.info(`Используется ${isProduction ? 'ModbusClient' : 'ModbusSimulator'}`);

// Создаем приложение Express
const app = express();

// Подключаем middleware
app.use(cors());
app.use(express.json());

// Настройка статической папки
app.use(express.static(path.join(__dirname, '../public')));

// Маршруты для страниц
app.use('/', pageRoutes);

// Подключение к базе данных
connectDB();

// Создаем карту Modbus-клиентов для каждого COM-порта
const modbusClients = {};

// Объекты для хранения очередей запросов и флагов состояния для каждого порта
const requestQueues = {};
const isProcessing = {};

// Функция для добавления в очередь с таймаутом
const addToQueueWithTimeout = (port, fn, timeout = 10000) => {
  if (!requestQueues[port]) {
    requestQueues[port] = [];
  }
  requestQueues[port].push({ fn, timeout });
  processQueue(port);
};

// Функция для обработки очереди
const processQueue = async (port) => {
  if (isProcessing[port]) return;
  isProcessing[port] = true;

  while (requestQueues[port] && requestQueues[port].length) {
    const { fn, timeout } = requestQueues[port].shift();
    try {
      await Promise.race([
        fn(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Queue operation timed out')), timeout)),
      ]);
    } catch (err) {
      logger.error(`Ошибка при выполнении операции из очереди на порту ${port}:`, err);
      if (err.message === 'Queue operation timed out') {
        await modbusClients[port].disconnect();
        await modbusClients[port].connect();
      }
    }
    // Добавляем задержку между операциями
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Задержка в 2 секунды
  }

  isProcessing[port] = false;
};

// Инициализация клиентов
devicesConfig.forEach((device) => {
  const { port, baudRate, timeout, retryInterval, maxRetries, unstable } = device;

  if (!modbusClients[port]) {
    modbusClients[port] = new Client(port, baudRate, timeout, retryInterval, maxRetries, unstable);

    modbusClients[port]
      .connect()
      .then(() => logger.info(`Успешное подключение к порту ${port}`))
      .catch((err) => {
        logger.error(`Ошибка при начальном подключении к порту ${port}:`, err);
        // Здесь можно вызвать функцию переподключения, если необходимо
      });
  }
});

// Функция для опроса всех устройств на основе конфигурации
const pollDevices = async (devices, client, port) => {
  const results = await Promise.allSettled(
    devices.map((device) =>
      addToQueueWithTimeout(port, async () => {
        const module = await import(device.serviceModule);
        const readDataFunction = module[device.readDataFunction];
        const { deviceID, name: deviceLabel } = device;

        try {
          if (!client.isConnected) await client.safeReconnect();
          await readDataFunction(client, deviceID, deviceLabel);
          logger.info(`[${deviceLabel}] Устройство успешно опрошено.`);
          return { deviceLabel, success: true };
        } catch (err) {
          logger.error(`[${deviceLabel}] Ошибка при опросе устройства:`, err);
          return { deviceLabel, success: false, error: err.message };
        }
      })
    )
  );

  // Лог результатов
  results.forEach((result, index) => {
    const device = devices[index];
    if (result.status === 'fulfilled' && result.value.success) {
      logger.info(`[${device.name}] Устройство успешно опрошено.`);
    } else {
      logger.warn(`[${device.name}] Устройство не отвечает.`);
    }
  });
};

// Функция для опроса данных Modbus
const startDataRetrieval = async () => {
  const ports = [...new Set(devicesConfig.map((device) => device.port))];

  for (const port of ports) {
    const devices = devicesConfig.filter((device) => device.port === port);
    const client = modbusClients[port];

    const retrieveData = async () => {
      try {
        if (!client.isConnected) {
          logger.warn(`Modbus клиент на порту ${port} не подключен. Переподключение...`);
          await client.safeReconnect();
        }

        // Опрос всех устройств на порту через очередь
        await pollDevices(devices, client, port);
      } catch (err) {
        logger.error(`Ошибка при опросе данных на порту ${port}:`, err);
      }
    };

    // Запуск первоначального опроса
    retrieveData();

    // Устанавливаем интервал для периодического опроса
    setInterval(retrieveData, 10000);
  }
};

// Запускаем опрос данных Modbus
startDataRetrieval();

// Используем маршруты
app.use('/api', kotel1Routes);
app.use('/api', kotel2Routes);
app.use('/api', kotel3Routes);

app.get('/api/server-time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

// Режим разработки
app.get('/config.js', (req, res) => {
  res.type('application/javascript');
  res.send(`window.NODE_ENV = "${process.env.NODE_ENV}";`);
});

// Запуск сервера
app.listen(port, () => {
  logger.info(`Сервер запущен на http://localhost:${port}`);
});
