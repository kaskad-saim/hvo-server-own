import { Kotel3Model } from '../models/kotelModel.js';

export const readDataKotel3 = async (modbusClient, deviceID, deviceLabel) => {
  try {
    // НЕ вызываем modbusClient.connect();

    const alarms = {
      'Уровень высок котел №3': (await modbusClient.readFloat(deviceID, 0x0000, deviceLabel)) >= 1,
      'Уровень низок котел №3': (await modbusClient.readFloat(deviceID, 0x0002, deviceLabel)) >= 1,
      'Разрежение мало котел №3': (await modbusClient.readFloat(deviceID, 0x0004, deviceLabel)) >= 1,
      'Давление воздуха низко котел №3': (await modbusClient.readFloat(deviceID, 0x0006, deviceLabel)) >= 1,
      'Давление газа низко котел №3': (await modbusClient.readFloat(deviceID, 0x0008, deviceLabel)) >= 1,
      'Давление газа высоко котел №3': (await modbusClient.readFloat(deviceID, 0x000A, deviceLabel)) >= 1,
      'Факел горелки погас котел №3': (await modbusClient.readFloat(deviceID, 0x000C, deviceLabel)) >= 1,
      'Дымосос отключен котел №3': (await modbusClient.readFloat(deviceID, 0x000E, deviceLabel)) >= 1,
      'Останов по команде котел №3': (await modbusClient.readFloat(deviceID, 0x0010, deviceLabel)) >= 1,
    }

    const info = {
      'Клапан запальника котел №3': (await modbusClient.readFloat(deviceID, 0x0012, deviceLabel)) >= 1,
      'Искрообразование котел №3': (await modbusClient.readFloat(deviceID, 0x0014, deviceLabel)) >= 1,
      'Розжиг запальника котел №3': (await modbusClient.readFloat(deviceID, 0x0016, deviceLabel)) >= 1,
      'Останов котла котел №3': (await modbusClient.readFloat(deviceID, 0x0018, deviceLabel)) >= 1,
      'Режим вентиляции котел №3': (await modbusClient.readFloat(deviceID, 0x001A, deviceLabel)) >= 1,
      'Режим стабилизации запальника котел №3': (await modbusClient.readFloat(deviceID, 0x001C, deviceLabel)) >= 1,
      'Розжиг горелки котел №3': (await modbusClient.readFloat(deviceID, 0x001E, deviceLabel)) >= 1,
      'Режим стабилизации горелки котел №3': (await modbusClient.readFloat(deviceID, 0x0020, deviceLabel)) >= 1,
      'Клапан отсекатель котел №3': (await modbusClient.readFloat(deviceID, 0x0022, deviceLabel)) >= 1,
      'Рабочий режим котел №3': (await modbusClient.readFloat(deviceID, 0x0024, deviceLabel)) >= 1,
      'Факел запальника котел №3': (await modbusClient.readFloat(deviceID, 0x0026, deviceLabel)) >= 1,
      'Факел горелки котел №3': (await modbusClient.readFloat(deviceID, 0x0028, deviceLabel)) >= 1,
      'Работа дымососа котел №3': (await modbusClient.readFloat(deviceID, 0x002A, deviceLabel)) >= 1,
    }

    const parameters = {
      'Уровень в барабане котел №3': ((await modbusClient.readFloat(deviceID, 0x002C, deviceLabel)) * 6.3 + (-315)).toFixed(0) ,
      'Расход питательной воды котел №3': ((await modbusClient.readFloat(deviceID, 0x002E, deviceLabel))).toFixed(0) ,
      'Разрежение в топке котел №3': ((await modbusClient.readFloat(deviceID, 0x0030, deviceLabel)) * 0.25 + -(12.5)).toFixed(1) ,
      'Давление воздуха котел №3': ((await modbusClient.readFloat(deviceID, 0x0032, deviceLabel)) * 2.5).toFixed(0) ,
      'Давление газа котел №3': ((await modbusClient.readFloat(deviceID, 0x0034, deviceLabel)) * 40).toFixed(0) ,
      'Давление пара котел №3': ((await modbusClient.readFloat(deviceID, 0x0036, deviceLabel)) * 0.16).toFixed(1) ,
      'Расход пара котел №3': ((await modbusClient.readFloat(deviceID, 0x0038, deviceLabel))).toFixed(0) ,
    };

    const im = {
      'ИМ уровня котел №3': (await modbusClient.readFloat(deviceID, 0x003A, deviceLabel)).toFixed(0),
      'ИМ разрежения котел №3': (await modbusClient.readFloat(deviceID, 0x003C, deviceLabel)).toFixed(0),
      'ИМ воздуха котел №3': (await modbusClient.readFloat(deviceID, 0x003E, deviceLabel)).toFixed(0),
      'ИМ газа котел №3': (await modbusClient.readFloat(deviceID, 0x0040, deviceLabel)).toFixed(0),
    }

    const others = {
      'Время вентиляции котел №3': (await modbusClient.readFloat(deviceID, 0x0042, deviceLabel)),
      'Индикация работы вентилятора котел №3': (await modbusClient.readFloat(deviceID, 0x0044, deviceLabel)) >= 1,
      'Импульс больше котел №3': (await modbusClient.readFloat(deviceID, 0x0046, deviceLabel)) >= 1,
      'Импульс меньше котел №3': (await modbusClient.readFloat(deviceID, 0x0048, deviceLabel)) >= 1,
      'Задание на уровень котел №3': (await modbusClient.readFloat(deviceID, 0x004A, deviceLabel)),
    }

    // Формирование объекта данных
    const formattedDataKotel3 = {
      parameters: parameters,
      info: info,
      alarms: alarms,
      im: im,
      others: others,
      lastUpdated: new Date(),
    };

    // Сохранение данных в базу данных
    await new Kotel3Model(formattedDataKotel3).save();
    // console.log(formattedDataKotel3);
  } catch (err) {
    console.error(`[${deviceLabel}] Ошибка при чтении данных:`, err);
  }
};