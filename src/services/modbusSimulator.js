export class ModbusSimulator {
  constructor(port) {
    this.port = port;
    this.isConnected = true;
    this.currentValues = {}; // Хранит текущие значения для каждого параметра

    // Карта устройств для быстрого доступа по deviceLabel
    this.devices = {
      // Существующие устройства
      kotel: this.kotel,
    };
  }

  async connect() {
    console.log(`Симулятор Modbus подключен к порту ${this.port}`);
    return Promise.resolve();
  }

  // Существующие объекты для каждого типа оборудования
  kotel = {
    parametersAddressesList: [
      0x002C, 0x002E, 0x0030, 0x0032, 0x0034, 0x0036, 0x0038
    ],
    imAddressesList: [
      0x003A, 0x003C, 0x003E, 0x0040
    ],
    infoAddressesList: [
      0x0012, 0x0014, 0x0016, 0x0018, 0x001A, 0x001C, 0x001E,
      0x0020, 0x0022, 0x0024, 0x0026, 0x0028, 0x002A
    ],
    alarmsAddressesList: [
      0x0000, 0x0002, 0x0004, 0x0006, 0x0008, 0x000A, 0x000C, 0x000E, 0x0010
    ],
    otherAddressesList: [
      0x0042, 0x0044, 0x0046, 0x0048, 0x004A
    ],

    getRange(address) {
      if (this.parametersAddressesList.includes(address)) return { min: 0, max: 100, step: 5 };
      if (this.imAddressesList.includes(address)) return { min: 0, max: 100, step: 3 };
      if (this.infoAddressesList.includes(address)) return { min: 0, max: 1, step: 1 };
      if (this.otherAddressesList.includes(address)) return { min: 0, max: 1, step: 1 };
      if (this.alarmsAddressesList.includes(address)) return { min: 0, max: 1, step: 1 };
    }
  };


  // Метод для чтения значений с учётом объекта и диапазона
  async readFloat(deviceID, address, deviceLabel = '') {
    let range = null;

    // Проверка диапазонов для всех объектов
    const device = this.devices[deviceLabel];
    if (device && device.getRange) {
      range = device.getRange(address, deviceLabel);
    }

    // Если диапазон не найден, устанавливаем дефолтное значение
    if (!range) range = { min: 0, max: 100, step: 10 };

    const key = `${deviceID}-${address}`;
    if (!this.currentValues[key]) {
      this.currentValues[key] = this.initializeValue(range.min, range.max);
    }

    const maxStep = range.step || 50;

    // Генерация случайного изменения в пределах диапазона
    const change = (Math.random() - 0.5) * Math.min(maxStep, range.max - range.min);  // Ограничиваем изменение

    let newValue = this.currentValues[key] + change;

    // Проверка на выход за пределы диапазона
    if (newValue > range.max) newValue = range.max;
    if (newValue < range.min) newValue = range.min;

    // Логирование изменений (можно раскомментировать при необходимости)
    // console.log(`Старое значение: ${this.currentValues[key]}, Изменение: ${change}, Новое значение: ${newValue}`);

    this.currentValues[key] = newValue;
    return parseFloat(newValue.toFixed(2));  // Возвращаем значение с двумя знаками после запятой
  }

  // Метод для чтения int16 значений
  async readInt16(deviceID, address, deviceLabel = '') {
    let range = null;

    // Проверка диапазонов для всех объектов
    const device = this.devices[deviceLabel];
    if (device && device.getRange) {
      range = device.getRange(address);
    }

    if (!range) range = { min: 0, max: 100, step: 10 };  // Дефолтные значения

    const key = `${deviceID}-${address}`;
    if (!this.currentValues[key]) {
      this.currentValues[key] = this.initializeValue(range.min, range.max);
    }

    const maxStep = range.step || 50;

    // Генерация случайного изменения
    const change = (Math.random() - 0.5) * Math.min(maxStep, range.max - range.min);
    let newValue = this.currentValues[key] + change;

    // Проверка на выход за пределы диапазона
    if (newValue > range.max) newValue = range.max;
    if (newValue < range.min) newValue = range.min;

    this.currentValues[key] = newValue;
    return parseInt(newValue.toFixed(0));  // Возвращаем целочисленное значение
  }

  // Метод для чтения float LE (Little Endian)
  async readFloatLE(deviceID, address, deviceLabel = '') {
    // Симуляция чтения float LE аналогично readFloat
    // В реальном случае может потребоваться другая логика
    return await this.readFloat(deviceID, address, deviceLabel);
  }

  // Метод для чтения float BE (Big Endian)
  async readFloatBE(deviceID, address, deviceLabel = '') {
    // Симуляция чтения float BE аналогично readFloat
    // В реальном случае может потребоваться другая логика
    return await this.readFloat(deviceID, address, deviceLabel);
  }

  // Метод для чтения int32 значений
  async readInt32(deviceID, address, deviceLabel = '') {
    // Для симуляции int32 можно использовать два int16 и объединить их
    const high = await this.readInt16(deviceID, address, deviceLabel);
    const low = await this.readInt16(deviceID, address + 1, deviceLabel);
    return high * 65536 + low;
  }

  // Метод для инициализации значений
  initializeValue(min, max) {
    return min + Math.random() * (max - min);  // Инициализация случайным значением в пределах диапазона
  }
}
