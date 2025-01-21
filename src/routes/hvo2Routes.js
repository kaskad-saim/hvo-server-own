import express from 'express';
import { Hvo2Model } from '../models/hvoModel.js';
import logger from '../logger.js';

const router = express.Router();

router.get('/hvo2-data', async (req, res) => {
  try {
    // Получаем последние данные из базы
    const data = await Hvo2Model.find().sort({ lastUpdated: -1 }).limit(1);

    // Если данные не найдены
    if (!data[0]) {
      return res.status(404).json({ message: 'Данные не найдены' });
    }

    // Проверка актуальности данных
    const lastUpdated = new Date(data[0].lastUpdated);
    const currentTime = new Date();
    const isDataOutdated = currentTime - lastUpdated > 60000; // 60000 мс = 1 минута

    // Если данные устарели, заменяем их на прочерки
    const responseData = isDataOutdated
      ? {
          parameters: mapValuesToDash(data[0].parameters), // Заменяем значения на прочерки
          lastUpdated: new Date(data[0].lastUpdated).toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        }
      : {
          ...data[0]._doc,
          lastUpdated: new Date(data[0].lastUpdated).toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        };

    // Отправляем данные клиенту
    res.json(responseData);
  } catch (err) {
    logger.error('Ошибка при получении данных Hvo2:', err); // Логируем ошибку
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Функция для замены всех значений в объекте на прочерк
const mapValuesToDash = (obj) => {
  return Object.fromEntries(Object.keys(obj).map((key) => [key, '—']));
};

export default router;