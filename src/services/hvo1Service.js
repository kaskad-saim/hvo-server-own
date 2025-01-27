import { Hvo1Model } from '../models/hvoModel.js';

export const readDataHvo1 = async (modbusClient, deviceID, deviceLabel) => {
  try {
    const parameters = {
      // Давления умножаем на 0.1
      'Давление воды на входе установки': ((await modbusClient.readFloat(deviceID, 0x0000, deviceLabel)) * 0.1).toFixed(
        1
      ),
      'Давление воды после насосов H1/1,2,3': (
        (await modbusClient.readFloat(deviceID, 0x0002, deviceLabel)) * 0.1
      ).toFixed(1),
      'Давление воды после насосов H2/1,2': (
        (await modbusClient.readFloat(deviceID, 0x0004, deviceLabel)) * 0.1
      ).toFixed(1),
      'Давление воды после насосов H3/1,2 для промывки': (
        (await modbusClient.readFloat(deviceID, 0x0006, deviceLabel)) * 0.1
      ).toFixed(1),

      // Уровни воды умножаем на 16
      'Уровень воды в емкости E1/1': ((await modbusClient.readFloat(deviceID, 0x0008, deviceLabel)) * 16).toFixed(0),
      'Уровень воды в емкости E1/2': ((await modbusClient.readFloat(deviceID, 0x000a, deviceLabel)) * 16).toFixed(0),

      // Расходы воды умножаем на 1.5 и 2
      'Расход воды на установку (м3/ч)': ((await modbusClient.readFloat(deviceID, 0x000c, deviceLabel)) * 1.5).toFixed(
        0
      ),
      'Расход воды на промывку фильтров (м3/ч)': (
        (await modbusClient.readFloat(deviceID, 0x000e, deviceLabel)) * 2
      ).toFixed(0),

      // Остальные параметры без изменений
      'Контроль положения ИМ1': (await modbusClient.readFloat(deviceID, 0x0010, deviceLabel)).toFixed(0),
      'Уровень воды в емкости E2/1,2': (await modbusClient.readFloat(deviceID, 0x0012, deviceLabel)).toFixed(0),
      'Выход РАН давления воды для ПЧ H1/1 (%)': (await modbusClient.readFloat(deviceID, 0x0014, deviceLabel)).toFixed(
        0
      ),
      'Рабочая частота насоса H1/1 (Гц)': (await modbusClient.readFloat(deviceID, 0x0016, deviceLabel)).toFixed(0),
      'Выход РАН давления воды для ПЧ H1/2 (%)': (await modbusClient.readFloat(deviceID, 0x0018, deviceLabel)).toFixed(
        0
      ),
      'Рабочая частота насоса H1/2 (Гц)': (await modbusClient.readFloat(deviceID, 0x001a, deviceLabel)).toFixed(0),
      'Выход РАН давления воды для ПЧ H2/1 (%)': (await modbusClient.readFloat(deviceID, 0x001c, deviceLabel)).toFixed(
        0
      ),
      'Рабочая частота насоса H2/1 (Гц)': (await modbusClient.readFloat(deviceID, 0x001e, deviceLabel)).toFixed(0),
      'Выход РАН давления воды для ПЧ H2/2 (%)': (await modbusClient.readFloat(deviceID, 0x0020, deviceLabel)).toFixed(
        0
      ),
      'Рабочая частота насоса H2/2 (Гц)': (await modbusClient.readFloat(deviceID, 0x0022, deviceLabel)).toFixed(0),
      'Задание уровня воды в емкостях E1/1,2': (await modbusClient.readFloat(deviceID, 0x0024, deviceLabel)).toFixed(0),
      'Задание рег-ру давления воды после H1/1,2': (
        await modbusClient.readFloat(deviceID, 0x0026, deviceLabel)
      ).toFixed(2),
      'Задание рег-ру давления воды после H2/1,2': (
        await modbusClient.readFloat(deviceID, 0x0028, deviceLabel)
      ).toFixed(2),
      'УПД №1 (Шкаф №1)': (await modbusClient.readFloat(deviceID, 0x002c, deviceLabel)).toFixed(0),
      'УПД №2 (Шкаф №1)': (await modbusClient.readFloat(deviceID, 0x002e, deviceLabel)).toFixed(0),
    };

    // Формирование объекта данных
    const formattedDataHvo1 = {
      parameters: parameters,
      lastUpdated: new Date(),
    };

    // Сохранение данных в базу данных
    await new Hvo1Model(formattedDataHvo1).save();
    // console.log(formattedDataHvo1);
  } catch (err) {
    console.error(`[${deviceLabel}] Ошибка при чтении данных:`, err);
  }
};
