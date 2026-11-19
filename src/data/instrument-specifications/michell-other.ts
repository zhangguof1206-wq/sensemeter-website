import { r, type SpecificationSheet } from "./types";

const sampleFlow = r("Gas flow at the sensor", "Поток газа через датчик",
  "1–5 Nl/min in the standard sample block; 0–10 m/s with direct insertion",
  "1–5 норм. л/мин в штатном пробоотборном блоке; 0–10 м/с при прямой установке");
const analogDiagnostics = r("Factory analog diagnostics", "Заводская диагностика по токовому выходу",
  "Sensor fault: 23 mA; dew point below range: 4 mA; above range: 20 mA",
  "Неисправность датчика: 23 мА; точка росы ниже диапазона: 4 мА; выше диапазона: 20 мА");
const dewPointRepeatability = r("Dew-point repeatability", "Повторяемость измерения точки росы", "0.5 °C", "0,5 °C");
const stainlessHousing = r("Sensor housing", "Корпус датчика", "316 stainless steel", "Нержавеющая сталь 316");
const easidewFilter = r("Sensor filter", "Фильтр датчика",
  "Standard: HDPE <10 µm; optional: sintered 316 stainless steel <80 µm",
  "Стандартный: ПЭВП <10 мкм; опция: спечённая нержавеющая сталь 316, <80 мкм");
const onlineSignals = r("Monitor outputs", "Выходы индикатора",
  "4–20 mA or 0–20 mA; Modbus RTU over RS485; two programmable alarm relays",
  "4–20 мА или 0–20 мА; Modbus RTU по RS485; два программируемых реле сигнализации");
const onlineSampleBlock = r("Included sample block", "Пробоотборный блок в комплекте",
  "Stainless steel; 1/8\" NPT inlet and outlet", "Нержавеющая сталь; вход и выход 1/8\" NPT");
const onlineSensorCable = r("Sensor cable lengths", "Длины кабеля датчика", "0.8, 2, 5 or 10 m", "0,8; 2; 5 или 10 м");

export const michellOtherSpecifications: Record<string, SpecificationSheet> = {
  "easidew-34-m12": {
    source: { revision: "97554 V3.3 (04/2024)", pages: "2–4" },
    references: [{ label: "Easidew 34", revision: "V5.2 (03/2023)", pages: "3", url: "https://www.processsensing.com/docs/datasheet/Michell_Instruments_Easidew_34_Transmitter_EN_Datasheet_v5-2.pdf" }],
    groups: {
      measurement: [
        r("Dew-point measurement ranges", "Диапазоны измерения точки росы",
          "-110 to +20 °C or -100 to +20 °C; custom ranges on request",
          "От -110 до +20 °C или от -100 до +20 °C; другие диапазоны по запросу"),
        r("Dew-point accuracy", "Точность измерения точки росы",
          "±2 °C at -20 to +50 °C sensor temperature", "±2 °C при температуре датчика от -20 до +50 °C"),
        r("Response time", "Время отклика", "5 min to T95 (dry to wet)", "5 мин до T95 (при росте влажности)"),
        dewPointRepeatability,
        r("Calibration", "Калибровка", "Traceable calibration certificate (13 points)", "Калибровка в 13 точках с сертификатом и метрологической прослеживаемостью")
      ],
      electrical: [
        r("Output signals", "Выходные сигналы",
          "Configurable 4–20 mA, two-wire current source; Easidew M12 also lists Modbus RTU over RS485",
          "Настраиваемый двухпроводный токовый выход 4–20 мА; для Easidew M12 также указан Modbus RTU по RS485"),
        r("Analog output scaling", "Шкалирование аналогового выхода",
          "Dew point: -110 to +20 °C maximum span; gas moisture: 0 to 3000 ppmV",
          "Точка росы: максимальный диапазон от -110 до +20 °C; содержание влаги в газе: от 0 до 3000 ppmV"),
        r("Supply voltage", "Напряжение питания", "12–28 V DC", "12–28 В пост. тока"),
        r("Maximum analog load", "Максимальное сопротивление нагрузки", "250 Ω at 14 V; 500 Ω at 24 V", "250 Ом при 14 В; 500 Ом при 24 В"),
        r("Current draw", "Потребляемый ток", "Up to 23 mA, depending on output signal", "До 23 мА в зависимости от выходного сигнала"),
        analogDiagnostics,
        r("Conformity", "Соответствие требованиям", "CE, UKCA")
      ],
      operating: [
        r("Operating and storage temperatures", "Рабочая температура и температура хранения", "-40 to +60 °C (both)", "От -40 до +60 °C в обоих случаях"),
        r("Temperature compensation", "Диапазон температурной компенсации", "-20 to +50 °C", "От -20 до +50 °C"),
        r("Maximum operating pressure", "Максимальное рабочее давление",
          "Family datasheet V3.3: 52.5 MPa (525 barg); Easidew 34-specific datasheet V5.2 (03/2023): 45 MPa (450 barg)",
          "Общий паспорт V3.3: 52,5 МПа (525 бар изб.); паспорт Easidew 34 V5.2 (03/2023): 45 МПа (450 бар изб.)"),
        sampleFlow
      ],
      mechanical: [
        r("Process thread", "Резьба для подключения к процессу",
          'Easidew 34: 3/4"-16 UNF; Easidew M12: 5/8"-18 UNF, 3/4"-16 UNF or G1/2" BSP',
          'Easidew 34: 3/4"-16 UNF; Easidew M12: 5/8"-18 UNF, 3/4"-16 UNF или G1/2" BSP'),
        r("Electrical connector", "Электрический разъём",
          "Easidew 34: MiniDIN 43650 form C; Easidew M12: 5-pin M12, A-coded",
          "Easidew 34: MiniDIN 43650, форма C; Easidew M12: 5-контактный M12 с A-кодировкой"),
        r("Ingress protection", "Степень защиты", "Easidew 34: IP66 / NEMA 4; Easidew M12: IP65"),
        r("Dimensions with connector cable", "Габариты с кабельным разъёмом",
          "Easidew 34: 132 × Ø45 mm; Easidew M12: 155 × Ø45 mm", "Easidew 34: 132 × Ø45 мм; Easidew M12: 155 × Ø45 мм"),
        stainlessHousing,
        r("Weight", "Масса", "150 g", "150 г"),
        easidewFilter,
        r("Installation options", "Монтажные опции",
          'KF40 flange accessory for 5/8"-18 UNF and 3/4"-16 UNF; optional M12 cables: 0.8, 2 or 5 m',
          'Фланец KF40 для резьбы 5/8"-18 UNF и 3/4"-16 UNF; опциональные кабели M12: 0,8; 2 или 5 м'),
        r("Oxygen service", "Применение в кислородной среде",
          "Optional cleaning for oxygen-enriched service", "По заказу: очистка для работы в обогащённой кислородом среде")
      ]
    },
    note: {
      en: "The hazardous-area certificates in the family datasheet apply to the separate Easidew I.S. variant. Confirm the actual unit's pressure rating and loop limits against its model documentation before use.",
      ru: "Указанные в общем паспорте сертификаты для взрывоопасных зон относятся к отдельному исполнению Easidew I.S. Перед применением проверьте допустимое давление и параметры токовой петли по документации конкретного прибора."
    }
  },
  "easidew-online": {
    source: { revision: "97167 V5.1 (04/2024)", pages: "2–4" },
    groups: {
      measurement: [
        r("Dew-point measurement ranges", "Диапазоны измерения точки росы",
          "-110 to +20 °C or -100 to +20 °C; custom dew-point and ppmV ranges on request",
          "От -110 до +20 °C или от -100 до +20 °C; другие диапазоны точки росы и ppmV по запросу"),
        r("Dew-point accuracy", "Точность измерения точки росы",
          "±2 °C at -20 to +50 °C sensor temperature", "±2 °C при температуре датчика от -20 до +50 °C"),
        r("Response time", "Время отклика", "5 min to T95 (dry to wet)", "5 мин до T95 (при росте влажности)"),
        dewPointRepeatability,
        r("Sensor calibration", "Калибровка датчика",
          "Traceable 13-point certificate; p. 2 states -100 to +20 °C dew point for the supplied calibration",
          "Калибровка в 13 точках с сертификатом и метрологической прослеживаемостью; на стр. 2 указан диапазон точки росы от -100 до +20 °C")
      ],
      electrical: [
        onlineSignals,
        r("Maximum analog output span", "Максимальный диапазон шкалы аналогового выхода",
          "Dew point: -110 to +20 °C; gas moisture: 0 to 3000 ppmV",
          "Точка росы: от -110 до +20 °C; содержание влаги в газе: от 0 до 3000 ppmV"),
        r("Monitor supply options", "Варианты питания индикатора", "85–264 V AC or 24 V DC", "85–264 В перем. тока или 24 В пост. тока"),
        r("Monitor current draw", "Потребляемый ток индикатора", "60 mA max.", "Не более 60 мА"),
        r("Electrical safety", "Электробезопасность", "EN 61010-1"),
        analogDiagnostics
      ],
      operating: [
        r("Operating temperature", "Рабочая температура", "Sensor: -40 to +60 °C; monitor: 0 to +50 °C",
          "Датчик: от -40 до +60 °C; индикатор: от 0 до +50 °C"),
        r("Temperature compensation", "Диапазон температурной компенсации",
          "Sensor: -20 to +50 °C; not applicable to monitor", "Датчик: от -20 до +50 °C; для индикатора не применяется"),
        r("Storage temperature", "Температура хранения", "Sensor: -40 to +60 °C; monitor: -10 to +60 °C",
          "Датчик: от -40 до +60 °C; индикатор: от -10 до +60 °C"),
        r("Maximum operating pressure", "Максимальное рабочее давление", "52.5 MPa (525 barg)", "52,5 МПа (525 бар изб.)"),
        sampleFlow
      ],
      mechanical: [
        r("Ingress protection", "Степень защиты", "Sensor: IP66 / NEMA 4; monitor: IP65 / NEMA 4X, front panel only",
          "Датчик: IP66 / NEMA 4; индикатор: IP65 / NEMA 4X только со стороны передней панели"),
        r("Dimensions", "Габариты", "Sensor with connector cable: 132 × Ø45 mm; monitor: 96 × 48 × 85 mm (W × H × D), 1/8 DIN",
          "Датчик с кабельным разъёмом: 132 × Ø45 мм; индикатор: 96 × 48 × 85 мм (Ш × В × Г), 1/8 DIN"),
        r("Sensor process connection", "Подключение датчика к процессу", '5/8"-18 UNF; optional KF40 flange', '5/8"-18 UNF; фланец KF40 по заказу'),
        onlineSampleBlock,
        r("Sensor connector", "Разъём датчика", "MiniDIN 43650 form C", "MiniDIN 43650, форма C"),
        onlineSensorCable,
        stainlessHousing,
        r("Sensor weight", "Масса датчика", "150 g", "150 г"),
        easidewFilter,
        r("Oxygen service", "Применение в кислородной среде",
          "Optional sensor cleaning for oxygen-enriched service", "По заказу: очистка датчика для работы в обогащённой кислородом среде")
      ]
    }
  },
  "sf82-online": {
    source: { revision: "99992 V1 US (06/2020)", pages: "2–4" },
    groups: {
      measurement: [
        r("Dew-point measurement ranges", "Диапазоны измерения точки росы",
          "-60 to +60 °C, -50 to +50 °C or -50 to +30 °C; custom dew-point and ppmV ranges on request",
          "От -60 до +60 °C, от -50 до +50 °C или от -50 до +30 °C; другие диапазоны точки росы и ppmV по запросу"),
        r("Dew-point accuracy", "Точность измерения точки росы",
          "±2 °C at -20 to +50 °C sensor temperature", "±2 °C при температуре датчика от -20 до +50 °C"),
        r("Response time", "Время отклика", "<3 min to T95 at -60 °C dew point", "<3 мин до T95 при точке росы -60 °C"),
        dewPointRepeatability,
        r("Sensor calibration", "Калибровка датчика", "Traceable 9-point certificate from -60 to +20 °C dew point",
          "Калибровка в 9 точках с сертификатом и метрологической прослеживаемостью; диапазон точки росы от -60 до +20 °C")
      ],
      electrical: [
        onlineSignals,
        r("Analog output scaling", "Шкалирование аналогового выхода",
          "Dew point: -80 to +20 °C as listed on p. 3; confirm scaling for the ordered configuration",
          "Точка росы: от -80 до +20 °C по таблице на стр. 3; шкалу конкретного исполнения следует уточнить при заказе"),
        r("Monitor supply voltage", "Напряжение питания индикатора", "85–264 V AC", "85–264 В перем. тока"),
        r("Monitor current draw", "Потребляемый ток индикатора", "60 mA max.", "Не более 60 мА"),
        r("Electrical safety", "Электробезопасность", "EN 61010-1"),
        analogDiagnostics
      ],
      operating: [
        r("Operating temperature", "Рабочая температура", "Sensor: -20 to +60 °C; monitor: 0 to +50 °C",
          "Датчик: от -20 до +60 °C; индикатор: от 0 до +50 °C"),
        r("Temperature compensation", "Диапазон температурной компенсации",
          "Sensor: -20 to +50 °C; not applicable to monitor", "Датчик: от -20 до +50 °C; для индикатора не применяется"),
        r("Storage temperature", "Температура хранения", "Sensor: -40 to +60 °C; monitor: -10 to +60 °C",
          "Датчик: от -40 до +60 °C; индикатор: от -10 до +60 °C"),
        r("Maximum operating pressure", "Максимальное рабочее давление", "10 MPa (100 barg)", "10 МПа (100 бар изб.)"),
        sampleFlow
      ],
      mechanical: [
        r("Ingress protection", "Степень защиты", "MiniDIN sensor: IP66 / NEMA 4; M12 sensor: IP65; monitor: IP65 / NEMA 4X, front panel only",
          "Датчик MiniDIN: IP66 / NEMA 4; датчик M12: IP65; индикатор: IP65 / NEMA 4X только со стороны передней панели"),
        r("Sensor dimensions with connector cable", "Габариты датчика с кабельным разъёмом",
          "MiniDIN: 133 × Ø45 mm; M12: 156 × Ø45 mm", "MiniDIN: 133 × Ø45 мм; M12: 156 × Ø45 мм"),
        r("Monitor dimensions", "Габариты индикатора", "96 × 48 × 85 mm (W × H × D), 1/8 DIN", "96 × 48 × 85 мм (Ш × В × Г), 1/8 DIN"),
        r("Sensor process threads", "Резьба датчика для подключения к процессу",
          '5/8"-18 UNF, 3/4"-16 UNF or G1/2" BSP; optional KF40 flange for UNF threads',
          '5/8"-18 UNF, 3/4"-16 UNF или G1/2" BSP; для резьбы UNF доступен фланец KF40'),
        onlineSampleBlock,
        r("Sensor connectors", "Разъёмы датчика", "MiniDIN 43650 form C or 5-pin M12, A-coded",
          "MiniDIN 43650, форма C, или 5-контактный M12 с A-кодировкой"),
        onlineSensorCable,
        stainlessHousing,
        r("Sensor weight", "Масса датчика", "150 g", "150 г"),
        r("Standard sensor filter", "Штатный фильтр датчика", "HMWPE <10 µm", "Высокомолекулярный полиэтилен (HMWPE), <10 мкм")
      ]
    },
    note: {
      en: "Page 2 quotes a 450 barg pressure rating; this is not the 100 barg maximum operating pressure specified on p. 3. Measurement range, calibration range and analog scaling are separate.",
      ru: "На стр. 2 приведено значение 450 бар изб.; его не следует путать с максимальным рабочим давлением 100 бар изб. на стр. 3. Диапазон измерения, диапазон калибровки и шкала аналогового выхода различаются."
    }
  },
  "pura-transmitter": {
    source: { revision: "99208 V1.1 (10/2023)", pages: "2–4" },
    groups: {
      measurement: [
        r("Dew-point measurement range", "Диапазон измерения точки росы", "-120 to -40 °C; custom ranges on request",
          "От -120 до -40 °C; другие диапазоны по запросу"),
        r("Dew-point accuracy", "Точность измерения точки росы",
          "±1 °C from -60 to -40 °C; ±2 °C from -100 to -60 °C; ±4 °C from -120 to -100 °C (extrapolated by the manufacturer)",
          "±1 °C от -60 до -40 °C; ±2 °C от -100 до -60 °C; ±4 °C от -120 до -100 °C (экстраполяция производителя)"),
        r("Calibration", "Калибровка", "Traceable calibration certificate (7 points)", "Калибровка в 7 точках с сертификатом и метрологической прослеживаемостью")
      ],
      electrical: [
        r("Analog output signal", "Аналоговый выходной сигнал",
          "4–20 mA; two-wire and I.S.: current source; three-wire analog: current sink",
          "4–20 мА; двухпроводное исполнение и I.S.: источник тока; трёхпроводное аналоговое исполнение: выход с поглощением тока"),
        r("Digital output", "Цифровой выход", "Pura M12: Modbus RTU over RS485; PUR-AOL-SEN-D (three-wire): Michell Mnet",
          "Pura M12: Modbus RTU по RS485; PUR-AOL-SEN-D (трёхпроводное исполнение): Michell Mnet"),
        r("Output and analog scaling", "Выходные величины и шкала аналогового выхода",
          "Dew point or moisture content (ppmV, ppbV); analog scales: -120 to -40 °C dew point or 0–127 ppmV in gas",
          "Точка росы или содержание влаги (ppmV, ppbV); аналоговые шкалы: от -120 до -40 °C по точке росы или 0–127 ppmV в газе"),
        r("Supply voltage", "Напряжение питания", "Two-wire, three-wire and I.S.: 12–28 V DC; M12 Modbus RTU only: 5–28 V DC",
          "Двухпроводное, трёхпроводное исполнения и I.S.: 12–28 В пост. тока; 5–28 В пост. тока только для M12 с цифровым выходом Modbus RTU"),
        r("Maximum analog load", "Максимальное сопротивление нагрузки", "250 Ω at 14 V; 500 Ω at 24 V", "250 Ом при 14 В; 500 Ом при 24 В"),
        r("Current draw", "Потребляемый ток", "Up to 23 mA, depending on output signal", "До 23 мА в зависимости от выходного сигнала"),
        analogDiagnostics,
        r("Conformity", "Соответствие требованиям", "CE, UKCA")
      ],
      operating: [
        r("Operating and storage temperatures", "Рабочая температура и температура хранения", "-40 to +60 °C (both)", "От -40 до +60 °C в обоих случаях"),
        r("Temperature compensation", "Диапазон температурной компенсации", "-20 to +50 °C", "От -20 до +50 °C"),
        r("Operating pressure", "Рабочее давление", "Min. 10⁻⁷ Pa (10⁻⁹ Torr); max. 24 MPa (240 barg)",
          "Мин. 10⁻⁷ Па (10⁻⁹ Торр); макс. 24 МПа (240 бар изб.)"),
        sampleFlow
      ],
      mechanical: [
        r("Process connections", "Присоединения к процессу", 'PRM (Premium) and OEM: two 1/4" male VCR ports; SEN (Sensor): one 1/2" male VCR port',
          'PRM (Premium) и OEM: два штуцера VCR 1/4" с наружной резьбой; SEN (Sensor): один штуцер VCR 1/2" с наружной резьбой'),
        r("Weight by build", "Масса по исполнениям", "PRM and OEM: 450 g; SEN: 180 g", "PRM и OEM: 450 г; SEN: 180 г"),
        r("Electrical connector", "Электрический разъём", "MiniDIN 43650 form C (including I.S.); Pura M12: 5-pin M12, A-coded",
          "MiniDIN 43650, форма C (в том числе I.S.); Pura M12: 5-контактный M12 с A-кодировкой"),
        r("Mating connector and cable options", "Ответный разъём и варианты кабеля",
          "Mating connector supplied as standard; optional M12 cable lengths: 0.8, 2 or 5 m",
          "Ответный разъём в стандартной комплектации; длины опциональных кабелей M12: 0,8; 2 или 5 м"),
        r("Ingress protection", "Степень защиты", "IP66 / NEMA 4; Pura M12: IP65"),
        stainlessHousing,
        r("Sample block finish", "Обработка пробоотборного блока",
          "Cold-drawn stainless steel; electropolished internally to Ra 0.1–0.2 µm",
          "Холоднотянутая нержавеющая сталь; внутренняя поверхность электрополирована до Ra 0,1–0,2 мкм"),
        r("PRM/OEM assembly dimensions", "Габариты PRM/OEM с пробоотборным блоком",
          'With 1/4" VCR sample block: 120 mm across ports; axial length 150.1 mm (MiniDIN) or 137.1 mm (M12). See p. 4 for SEN drawings.',
          'С блоком VCR 1/4": 120 мм по штуцерам; осевая длина 150,1 мм (MiniDIN) или 137,1 мм (M12). Чертежи SEN см. на стр. 4.'),
        r("Packaging by build", "Упаковка по исполнениям",
          "Premium: sealed double bag in ultra-high-purity inert gas; OEM and SEN: single polyethylene bag; SEN has a transport guard",
          "Premium: двойной герметичный пакет с особо чистым инертным газом; OEM и SEN: один полиэтиленовый пакет; у SEN транспортировочный защитный колпачок"),
        r("Hazardous-area approvals (Pura I.S. only)", "Допуски для взрывоопасных зон (только Pura I.S.)",
          "ATEX/UKCA: II 1 G Ex ia IIC T4 Ga; IECEx: Ex ia IIC T4 Ga; TR CU: 0Ex ia IIC T4 Ga (all -20 to +70 °C per certification)",
          "ATEX/UKCA: II 1 G Ex ia IIC T4 Ga; IECEx: Ex ia IIC T4 Ga; TR CU: 0Ex ia IIC T4 Ga (от -20 до +70 °C по всем трём сертификатам)"),
        r("North American approvals (Pura I.S. only)", "Допуски для Северной Америки (только Pura I.S.)",
          "cQPSus: Class I, Division 1, Groups A–D, T4; Class I, Zone 0, AEx ia IIC T4 Ga, Ex ia IIC T4 Ga; ambient +70 °C per marking",
          "cQPSus: Class I, Division 1, Groups A–D, T4; Class I, Zone 0, AEx ia IIC T4 Ga, Ex ia IIC T4 Ga; температура среды +70 °C по маркировке"),
        r("Approved galvanic isolators (Pura I.S. only)", "Допущенные гальванические развязки (только Pura I.S.)",
          "KFD0-CS-EX1.50P; KFD0-CS-EX2.50P; KFD2-STC4-EX1.H")
      ]
    },
    note: {
      en: "Pura is a transmitter family. Confirm the output, process connection, packaging and required approvals for the exact order code.",
      ru: "Pura — семейство преобразователей. Выход, присоединение к процессу, упаковку и необходимые допуски следует уточнять по коду заказа."
    }
  },
  "optidew-hz": {
    source: { revision: "97552 V3.1 US (04/2021)", pages: "1–4", label: "Optidew 401/501" },
    groups: {},
    note: {
      en: "The linked Michell datasheet covers the Optidew 401/501 chilled-mirror hygrometers for water dew point. It does not verify an Optidew-HZ model or hydrocarbon dew-point measurement. Specifications are pending manufacturer documentation for the exact model.",
      ru: "Привязанный паспорт Michell описывает гигрометры Optidew 401/501 с охлаждаемым зеркалом для измерения точки росы по воде. Паспорт не подтверждает модель Optidew-HZ или измерение точки росы по углеводородам. Для публикации характеристик нужна документация производителя на точную модель."
    }
  }
};
