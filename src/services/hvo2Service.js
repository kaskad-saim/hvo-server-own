import { Hvo2Model } from "../models/hvoModel.js";

export const readDataHvo2 = async (modbusClient, deviceID, deviceLabel) => {
  try {
    const parameters = {
      'Расход умягченной воды после Ф4/1,2,3': (await modbusClient.readFloat(deviceID, 0x0000, deviceLabel) * 2).toFixed(0),
      'Расход воды в канализацию': (await modbusClient.readFloat(deviceID, 0x0002, deviceLabel) * 0.6).toFixed(0),
      'Уровень воды в E2/1 (Титан)': (await modbusClient.readFloat(deviceID, 0x0004, deviceLabel) * 60 + 820).toFixed(0),
      'Уровень воды в E2/1 (Мида)': (await modbusClient.readFloat(deviceID, 0x0006, deviceLabel) * 60 + 820).toFixed(0),
      'Уровень воды в E2/2 (Титан)': (await modbusClient.readFloat(deviceID, 0x0008, deviceLabel) * 60 + 820).toFixed(0),
      'Уровень воды в E2/2 (Мида)': (await modbusClient.readFloat(deviceID, 0x000A, deviceLabel) * 60 + 820).toFixed(0),
      'Контроль положения ИМ2': (await modbusClient.readFloat(deviceID, 0x000C, deviceLabel)).toFixed(0),
      'Давление воды на карбон': (await modbusClient.readFloat(deviceID, 0x000E, deviceLabel) * 0.1).toFixed(1),
      'Давление воды на к265': (await modbusClient.readFloat(deviceID, 0x0010, deviceLabel) * 0.1).toFixed(1),
      'Давление воды на к312': (await modbusClient.readFloat(deviceID, 0x0012, deviceLabel) * 0.1).toFixed(1),
      'Температура в емкости E2/1 север': (await modbusClient.readFloat(deviceID, 0x0014, deviceLabel)).toFixed(0),
      'Температура в емкости E2/1 юг': (await modbusClient.readFloat(deviceID, 0x0016, deviceLabel)).toFixed(0),
      'Температура в емкости E2/2 север': (await modbusClient.readFloat(deviceID, 0x0018, deviceLabel)).toFixed(0),
      'Температура в емкости E2/2 юг': (await modbusClient.readFloat(deviceID, 0x001A, deviceLabel)).toFixed(0),
      'Давление воды после насоса H4/1': (await modbusClient.readFloat(deviceID, 0x001C, deviceLabel) * 0.1).toFixed(1),
      'Давление воды после Ф4/1,2,3': (await modbusClient.readFloat(deviceID, 0x001E, deviceLabel) * 0.1).toFixed(1),
      'Давление воды после насоса H4/2': (await modbusClient.readFloat(deviceID, 0x0020, deviceLabel) * 0.1).toFixed(1),
      'Давление воды после насоса H5/1': (await modbusClient.readFloat(deviceID, 0x0022, deviceLabel) * 0.1).toFixed(1),
      'Давление воды после насоса H5/2': (await modbusClient.readFloat(deviceID, 0x0024, deviceLabel) * 0.1).toFixed(1),
      'Давление воды после насоса H6/1': (await modbusClient.readFloat(deviceID, 0x0026, deviceLabel) * 0.1).toFixed(1),
      'Давление воды после насоса H6/2': (await modbusClient.readFloat(deviceID, 0x0028, deviceLabel) * 0.1).toFixed(1),
      'Давление воды после насоса H6/3': (await modbusClient.readFloat(deviceID, 0x002A, deviceLabel) * 0.1).toFixed(1),
      'Рабочая частота насоса H4/1 (Гц)': (await modbusClient.readFloat(deviceID, 0x002C, deviceLabel)).toFixed(0),
      'Рабочая частота насоса H4/2 (Гц)': (await modbusClient.readFloat(deviceID, 0x002E, deviceLabel)).toFixed(0),
      'Рабочая частота насоса H5/1 (Гц)': (await modbusClient.readFloat(deviceID, 0x0030, deviceLabel)).toFixed(0),
      'Рабочая частота насоса H5/2 (Гц)': (await modbusClient.readFloat(deviceID, 0x0032, deviceLabel)).toFixed(0),
      'Рабочая частота насоса H6/1 (Гц)': (await modbusClient.readFloat(deviceID, 0x0034, deviceLabel)).toFixed(0),
      'Рабочая частота насоса H6/2 (Гц)': (await modbusClient.readFloat(deviceID, 0x0036, deviceLabel)).toFixed(0),
      'Рабочая частота насоса H6/3 (Гц)': (await modbusClient.readFloat(deviceID, 0x0038, deviceLabel)).toFixed(0),
      'УПД №1 (Шкаф №2)': (await modbusClient.readFloat(deviceID, 0x003A, deviceLabel)).toFixed(0),
      'УПД №2 (Шкаф №2)': (await modbusClient.readFloat(deviceID, 0x003C, deviceLabel)).toFixed(0),
      'Измерение уровня воды на регулятор уровня': (await modbusClient.readFloat(deviceID, 0x003E, deviceLabel) * 60 + 820).toFixed(0),
    };


    // Формирование объекта данных
    const formattedDataHvo2 = {
      parameters: parameters,
      lastUpdated: new Date(),
    };

    // Сохранение данных в базу данных
    await new Hvo2Model(formattedDataHvo2).save();
    // console.log(formattedDataHvo2);
  } catch (err) {
    console.error(`[${deviceLabel}] Ошибка при чтении данных:`, err);
  }
};