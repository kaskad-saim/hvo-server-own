import { Hvo2Model } from "../models/hvoModel.js";

export const readDataHvo2 = async (modbusClient, deviceID, deviceLabel) => {
  try {
    const parameters = {
      'Расход умягченной воды после Ф4/1,2,3': (await modbusClient.readFloat(deviceID, 0x0000, deviceLabel)).toFixed(2),
      'Расход воды в канализацию': (await modbusClient.readFloat(deviceID, 0x0002, deviceLabel)).toFixed(2),
      'Уровень воды в E2/1 (Титан)': (await modbusClient.readFloat(deviceID, 0x0004, deviceLabel)).toFixed(2),
      'Уровень воды в E2/1 (Мида)': (await modbusClient.readFloat(deviceID, 0x0006, deviceLabel)).toFixed(2),
      'Уровень воды в E2/2 (Титан)': (await modbusClient.readFloat(deviceID, 0x0008, deviceLabel)).toFixed(2),
      'Уровень воды в E2/2 (Мида)': (await modbusClient.readFloat(deviceID, 0x000A, deviceLabel)).toFixed(2),
      'Контроль положения ИМ2': (await modbusClient.readFloat(deviceID, 0x000C, deviceLabel)).toFixed(2),
      'Давление воды на карбон': (await modbusClient.readFloat(deviceID, 0x000E, deviceLabel)).toFixed(2),
      'Давление воды на к265': (await modbusClient.readFloat(deviceID, 0x0010, deviceLabel)).toFixed(2),
      'Давление воды на к312': (await modbusClient.readFloat(deviceID, 0x0012, deviceLabel)).toFixed(2),
      'Температура в емкости E2/1 север': (await modbusClient.readFloat(deviceID, 0x0014, deviceLabel)).toFixed(2),
      'Температура в емкости E2/1 юг': (await modbusClient.readFloat(deviceID, 0x0016, deviceLabel)).toFixed(2),
      'Температура в емкости E2/2 север': (await modbusClient.readFloat(deviceID, 0x0018, deviceLabel)).toFixed(2),
      'Температура в емкости E2/2 юг': (await modbusClient.readFloat(deviceID, 0x001A, deviceLabel)).toFixed(2),
      'Давление воды после насоса H4/1': (await modbusClient.readFloat(deviceID, 0x001C, deviceLabel)).toFixed(2),
      'Давление воды после Ф4/1,2,3': (await modbusClient.readFloat(deviceID, 0x001E, deviceLabel)).toFixed(2),
      'Давление воды после насоса H4/2': (await modbusClient.readFloat(deviceID, 0x0020, deviceLabel)).toFixed(2),
      'Давление воды после насоса H5/1': (await modbusClient.readFloat(deviceID, 0x0022, deviceLabel)).toFixed(2),
      'Давление воды после насоса H5/2': (await modbusClient.readFloat(deviceID, 0x0024, deviceLabel)).toFixed(2),
      'Давление воды после насоса H6/1': (await modbusClient.readFloat(deviceID, 0x0026, deviceLabel)).toFixed(2),
      'Давление воды после насоса H6/2': (await modbusClient.readFloat(deviceID, 0x0028, deviceLabel)).toFixed(2),
      'Давление воды после насоса H6/3': (await modbusClient.readFloat(deviceID, 0x002A, deviceLabel)).toFixed(2),
      'Рабочая частота насоса H4/1 (Гц)': (await modbusClient.readFloat(deviceID, 0x002C, deviceLabel)).toFixed(2),
      'Рабочая частота насоса H4/2 (Гц)': (await modbusClient.readFloat(deviceID, 0x002E, deviceLabel)).toFixed(2),
      'Рабочая частота насоса H5/1 (Гц)': (await modbusClient.readFloat(deviceID, 0x0030, deviceLabel)).toFixed(2),
      'Рабочая частота насоса H5/2 (Гц)': (await modbusClient.readFloat(deviceID, 0x0032, deviceLabel)).toFixed(2),
      'Рабочая частота насоса H6/1 (Гц)': (await modbusClient.readFloat(deviceID, 0x0034, deviceLabel)).toFixed(2),
      'Рабочая частота насоса H6/2 (Гц)': (await modbusClient.readFloat(deviceID, 0x0036, deviceLabel)).toFixed(2),
      'Рабочая частота насоса H6/3 (Гц)': (await modbusClient.readFloat(deviceID, 0x0038, deviceLabel)).toFixed(2),
      'УПД №1 (Шкаф №2)': (await modbusClient.readFloat(deviceID, 0x003A, deviceLabel)).toFixed(2),
      'УПД №2 (Шкаф №2)': (await modbusClient.readFloat(deviceID, 0x003C, deviceLabel)).toFixed(2),
      'Измерение уровня воды на регулятор уровня': (await modbusClient.readFloat(deviceID, 0x003E, deviceLabel)).toFixed(2),
    };

    // Формирование объекта данных
    const formattedDataHvo2 = {
      parameters: parameters,
      lastUpdated: new Date(),
    };

    // Сохранение данных в базу данных
    await new Hvo2Model(formattedDataHvo2).save();
    console.log(formattedDataHvo2);
  } catch (err) {
    console.error(`[${deviceLabel}] Ошибка при чтении данных:`, err);
  }
};