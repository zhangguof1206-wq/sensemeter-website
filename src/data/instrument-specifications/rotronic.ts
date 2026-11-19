import { r, type SpecificationSheet } from "./types";

const hc2aPinout = r("Connector pinout", "Назначение контактов",
  "1 V+; 2 supply/digital ground; 3 RXD; 4 TXD; 5 humidity output; 6 temperature output; 7 analog ground.",
  "1 V+; 2 общий питания и цифровой цепи; 3 RXD; 4 TXD; 5 выход влажности; 6 выход температуры; 7 аналоговый общий.");

export const rotronicSpecifications: Record<string, SpecificationSheet> = {
  "hc2a-industrial": {
    source: { revision: "59082E/2020-11", pages: "1–4" },
    references: [{ label: "Rotronic HC2A-IC/IM/IE", revision: "", pages: "", url: "https://service.rotronic.com/products-manual/technical-specification2_2_3.html" }],
    groups: {
      measurement: [
        r("Humidity range", "Диапазон влажности", "0–100 %RH"),
        r("Accuracy at 23 °C", "Погрешность при 23 °C", "±0.8 %RH; ±0.1 K", "±0,8 %RH; ±0,1 K"),
        r("Humidity and temperature sensors", "Датчики влажности и температуры",
          "HYGROMER HT-1; Pt100, 1/3 Class B.", "HYGROMER HT-1; Pt100, 1/3 класса B."),
        r("Sensor response (t63)", "Время отклика датчиков (t63)",
          "<15 s for humidity and temperature, without a filter.", "<15 с для влажности и температуры, без фильтра."),
        r("Factory adjustment", "Заводская настройка", "23 °C; 10, 35, 80 %RH"),
        r("Long-term humidity stability", "Долговременная стабильность влажности", "<1 %RH/year", "<1 %RH/год"),
        r("Measurement timing", "Периодичность измерений", "First reading after 1.5 s; interval 1 s.", "Первое показание через 1,5 с; интервал 1 с.")
      ],
      electrical: [
        r("Supply and current", "Питание и потребляемый ток",
          "3.3–5 V DC; approx. 5 mA, adjusted at 3.3 V DC.", "3,3–5 В пост. тока; около 5 мА, настройка при 3,3 В пост. тока."),
        r("Digital interface", "Цифровой интерфейс",
          "UART, fixed at 19,200 baud. RoASCII by default; Modbus configurable in HW4.",
          "UART, фиксированная скорость 19 200 бод. По умолчанию RoASCII; Modbus настраивается в HW4."),
        r("Analog outputs and scaling", "Аналоговые выходы и масштабирование",
          "2 × 0–1 V DC; default full scales: 0–100 %RH and −40 to +60 °C. Scaling and dew/frost point are selectable in HW4.",
          "2 × 0–1 В пост. тока; шкалы по умолчанию: 0–100 %RH и −40…+60 °C. Масштабирование и выбор точки росы или инея в HW4."),
        hc2aPinout,
        r("Compatible readers", "Совместимые приборы", "HF5, HF8, HP32, HP23, HL-NT"),
        r("Reader extension", "Удлинение линии до прибора",
          "Up to 5 m with a passive extension or up to 100 m with the AC3003 amplifier.",
          "До 5 м с пассивным удлинителем или до 100 м с усилителем AC3003.")
      ],
      operating: [
        r("Measuring head temperature", "Температура измерительной головки",
          "−100 to +190 °C continuously; +200 °C peak for up to 100 h.",
          "−100…+190 °C при непрерывной работе; пиковая температура +200 °C не более 100 ч."),
        r("Electronics temperature", "Температура электронного блока",
          "−50 to +100 °C; temperatures above +40 °C may affect accuracy.",
          "−50…+100 °C; температура выше +40 °C может влиять на точность."),
        r("Pressure resistance, screw-in models only", "Стойкость к давлению, только резьбовые модели",
          "HC2A-IE02-G and HC2A-IE02-NPT: up to 100 bar (1450 psi); observe the separate seal temperature limit.",
          "HC2A-IE02-G и HC2A-IE02-NPT: до 100 бар (1450 psi); учитывайте отдельное ограничение по температуре уплотнения."),
        r("Maximum air velocity", "Максимальная скорость воздуха", "3.5 m/s without a filter.", "3,5 м/с без фильтра.")
      ],
      mechanical: [
        r("Ingress protection", "Степень защиты", "IP65 except the sensor area.", "IP65, кроме зоны датчика."),
        r("Probe materials", "Материалы зондов",
          "IC and IC-A: PPS and stainless steel 1.4301; IM-M and IE: stainless steel 1.4301.",
          "IC и IC-A: PPS и нержавеющая сталь 1.4301; IM-M и IE: нержавеющая сталь 1.4301."),
        r("HC2A-IC dimensions", "Размеры HC2A-IC",
          "Ø15 mm; probe length without/with carrier: IC102 and IC105 100/144 mm, IC302 250/294 mm; electronics 111 mm.",
          "Ø15 мм; длина зонда без держателя/с держателем: IC102 и IC105 100/144 мм, IC302 250/294 мм; электроника 111 мм."),
        r("HC2A-IC-A dimensions", "Размеры HC2A-IC-A",
          "Ø15/25 mm; probe length without/with carrier: IC402-A 384/428 mm, IC702-A 684/728 mm; electronics 111 mm.",
          "Ø15/25 мм; длина зонда без держателя/с держателем: IC402-A 384/428 мм, IC702-A 684/728 мм; электроника 111 мм."),
        r("HC2A-IM-M dimensions", "Размеры HC2A-IM-M",
          "Ø15 mm; probe length without/with carrier: IM102-M 86/130 mm, IM302-M and IM305-M 236/280 mm; electronics 97 mm.",
          "Ø15 мм; длина зонда без держателя/с держателем: IM102-M 86/130 мм, IM302-M и IM305-M 236/280 мм; электроника 97 мм."),
        r("HC2A-IE threads and dimensions", "Резьба и размеры HC2A-IE",
          'IE02-G: G 1/2"; IE02-NPT: 1/2" NPT. Both Ø15 mm; probe length without/with carrier 104/148 mm; electronics 97 mm.',
          'IE02-G: G 1/2"; IE02-NPT: 1/2" NPT. Оба Ø15 мм; длина зонда без держателя/с держателем 104/148 мм; электроника 97 мм.'),
        r("Integral cable length", "Длина встроенного кабеля",
          "IC105 and IM305-M: 5 m (4.85–5.00 m); all other listed codes: 2 m (1.92–2.00 m).",
          "IC105 и IM305-M: 5 м (4,85–5,00 м); остальные указанные модели: 2 м (1,92–2,00 м)."),
        r("Filter and delivery", "Фильтр и комплект поставки",
          "Probe, certificate and SPA-SS carrier; filter sold separately. Polyethylene: 40–50 µm, −50 to +100 °C; PTFE or steel mesh options: 10 µm; SPA-SSS sintered steel: 25 µm.",
          "Зонд, сертификат и держатель SPA-SS; фильтр приобретается отдельно. Полиэтилен: 40–50 мкм, −50…+100 °C; варианты из ПТФЭ или стальной сетки: 10 мкм; спечённая сталь SPA-SSS: 25 мкм.")
      ]
    },
    note: {
      en: "Consult the humidity and temperature windows on p. 4 for combined conditions. Rotronic's online HC2A-IC/IM/IE manual additionally limits the HC2A-IE sealing ring to −40 to +100 °C.",
      ru: "Допустимые сочетания влажности и температуры приведены на графиках на стр. 4. В онлайн-руководстве Rotronic для HC2A-IC/IM/IE дополнительно указан диапазон температуры уплотнительного кольца HC2A-IE: −40…+100 °C."
    }
  },
  "hc2a-series": {
    source: { revision: "59055E/2025-05", pages: "1–4" },
    groups: {
      measurement: [
        r("Measured parameters and humidity sensor", "Измеряемые параметры и датчик влажности",
          "Relative humidity and temperature; HYGROMER HT-1 humidity sensor.",
          "Относительная влажность и температура; датчик влажности HYGROMER HT-1."),
        r("Standard accuracy", "Погрешность стандартных зондов",
          "HC2A-S, HC2A-S3, HC2A-SM: ±0.8 %RH and ±0.1 K at 10–30 °C.",
          "HC2A-S, HC2A-S3 и HC2A-SM: ±0,8 %RH и ±0,1 K при 10–30 °C."),
        r("High-precision accuracy", "Погрешность высокоточных зондов",
          "HC2A-SH and HC2A-S3H: ±0.5 %RH and ±0.1 K at 10–30 °C and 10–90 %RH.",
          "HC2A-SH и HC2A-S3H: ±0,5 %RH и ±0,1 K при 10–30 °C и 10–90 %RH."),
        r("Factory adjustment and calibration", "Заводская настройка и калибровка",
          "Standard: adjusted at 23 °C and 10, 35, 80 %RH. High precision: adjusted at 23 °C from 10 to 90 %RH in 10 %RH steps, then calibrated at 20, 50, 80 %RH.",
          "Стандартные: настройка при 23 °C и 10, 35, 80 %RH. Высокоточные: настройка при 23 °C от 10 до 90 %RH с шагом 10 %RH, затем калибровка при 20, 50, 80 %RH."),
        r("Long-term humidity stability", "Долговременная стабильность влажности",
          "<1 %RH/year in clean air.", "<1 %RH/год в чистом воздухе."),
        r("Measurement timing", "Периодичность измерений", "First reading after 1.5 s; interval 1 s.", "Первое показание через 1,5 с; интервал 1 с.")
      ],
      electrical: [
        r("Supply and current", "Питание и потребляемый ток",
          "3.3–5 V DC; approx. 5 mA, adjusted at 3.3 V DC.", "3,3–5 В пост. тока; около 5 мА, настройка при 3,3 В пост. тока."),
        r("Digital interface", "Цифровой интерфейс", "UART, fixed at 19,200 baud; RoASCII.", "UART, фиксированная скорость 19 200 бод; RoASCII."),
        r("Analog outputs and load", "Аналоговые выходы и нагрузка", "2 × 0–1 V; load >10 kΩ.", "2 × 0–1 В; нагрузка >10 кОм."),
        r("Scaling and calculated outputs", "Масштабирование и расчётные выходные параметры",
          "Default full scales: 0–100 %RH and −40 to +60 °C. HygroSoft can rescale the outputs and assign dew or frost point.",
          "Шкалы по умолчанию: 0–100 %RH и −40…+60 °C. В HygroSoft можно менять шкалы и назначать на выход точку росы или инея."),
        hc2aPinout,
        r("PC configuration and extension", "Настройка с ПК и удлинение линии",
          "AC3001 USB service cable and HygroSoft; up to 5 m with a passive extension or 100 m with the AC3003 amplifier.",
          "Сервисный USB-кабель AC3001 и HygroSoft; до 5 м с пассивным удлинителем или до 100 м с усилителем AC3003.")
      ],
      operating: [
        r("Application range", "Рабочий диапазон", "−50 to +100 °C; 0–100 %RH.", "−50…+100 °C; 0–100 %RH."),
        r("Probe interchange", "Замена зонда",
          "Hot-swappable; AirChip3000 retains adjustment data on the probe.",
          "Горячая замена; AirChip3000 хранит данные настройки в зонде.")
      ],
      mechanical: [
        r("Ingress protection", "Степень защиты", "IP65 except the sensor area.", "IP65, кроме зоны датчика."),
        r("Probe dimensions", "Размеры зондов",
          "HC2A-S, HC2A-S3, HC2A-SH, HC2A-S3H: Ø15 × 108 mm; HC2A-SM: Ø15 × 109 mm.",
          "HC2A-S, HC2A-S3, HC2A-SH, HC2A-S3H: Ø15 × 108 мм; HC2A-SM: Ø15 × 109 мм."),
        r("Probe housing variants", "Исполнения корпуса зонда",
          "HC2A-S3 and HC2A-S3H: white meteorological housing to limit solar heating; HC2A-SM: steel.",
          "HC2A-S3 и HC2A-S3H: белый метеорологический корпус для уменьшения нагрева солнцем; HC2A-SM: сталь."),
        r("Standard filter and options", "Штатный фильтр и варианты",
          "HC2A-S: SPA-PCB-PE, white polyethylene, 40–50 µm. PTFE, wire mesh and sintered steel options are listed on p. 2; SPA-WM-SM and SPA-SS-WM-SM are HC2A-SM only.",
          "HC2A-S: SPA-PCB-PE, белый полиэтилен, 40–50 мкм. Варианты из ПТФЭ, сетки и спечённой стали указаны на стр. 2; SPA-WM-SM и SPA-SS-WM-SM только для HC2A-SM.")
      ]
    },
    note: {
      en: "This revision specifies HC2A-S, HC2A-S3, HC2A-SM, HC2A-SH and HC2A-S3H. On p. 4, the HC2A-IC curves are for comparison, not ratings for these five models.",
      ru: "Эта редакция описывает HC2A-S, HC2A-S3, HC2A-SM, HC2A-SH и HC2A-S3H. Графики HC2A-IC на стр. 4 приведены для сравнения и не задают пределы для этих пяти моделей."
    }
  },
  "hp31-hp32": {
    source: { revision: "59073E/2024-11", pages: "1–3" },
    references: [{ label: "HC2-HK25", revision: "", pages: "", url: "https://www.dwyeromega.com/en-us/handheld-humidity-and-temperature-probes-for-handheld-devices/Series-HC2/p/HC2-HK25" }],
    groups: {
      measurement: [
        r("Measured parameters", "Измеряемые параметры", "Relative humidity and temperature.", "Относительная влажность и температура."),
        r("Accuracy at 23 °C", "Погрешность при 23 °C",
          "HP31: ±2 %RH and ±0.3 °C. HP32: depends on the connected probe.",
          "HP31: ±2 %RH и ±0,3 °C. HP32: зависит от подключённого зонда."),
        r("Probe range and compatibility", "Диапазон и совместимость зондов",
          "HP31: fixed probe, −10 to +60 °C and 0–100 %RH, non-condensing. HP32: range depends on the interchangeable HC2 or HC2A probe; HC2-LDP is excluded.",
          "HP31: несъёмный зонд, −10…+60 °C и 0–100 %RH, без конденсации. HP32: диапазон зависит от сменного зонда HC2 или HC2A; HC2-LDP не поддерживается."),
        r("HP32 standard and high-precision probe examples", "Стандартный и высокоточный зонды для HP32",
          "HC2A-S and HC2A-SH: −50 to +100 °C, 0–100 %RH. At 10–30 °C: HC2A-S ±0.8 %RH and ±0.1 K; HC2A-SH ±0.5 %RH at 10–90 %RH and ±0.1 K. Stability <1 %RH/year.",
          "HC2A-S и HC2A-SH: −50…+100 °C, 0–100 %RH. При 10–30 °C: HC2A-S ±0,8 %RH и ±0,1 K; HC2A-SH ±0,5 %RH при 10–90 %RH и ±0,1 K. Стабильность <1 %RH/год."),
        r("HP32 high-temperature probe example", "Высокотемпературный зонд для HP32",
          "HC2-HK25: 0–100 %RH; ±0.8 %RH and ±0.2 K at 10–30 °C per the handheld datasheet; stability <1 %RH/year; 2 m cable. DwyerOmega rates this order code for −100 to +170 °C.",
          "HC2-HK25: 0–100 %RH; ±0,8 %RH и ±0,2 K при 10–30 °C по паспорту прибора; стабильность <1 %RH/год; кабель 2 м. По данным DwyerOmega, рабочий диапазон этого кода заказа −100…+170 °C."),
        r("HP32 insertion probes", "Зонды HP32 для сыпучих материалов",
          "The datasheet lists HC2-P05, HC2-P28 and HC2-P50: −40 to +85 °C, 0–100 %RH; stability <1 %RH/year; 2 m cable. Confirm the P28/P50 order codes before selecting a probe.",
          "В паспорте перечислены HC2-P05, HC2-P28 и HC2-P50: −40…+85 °C, 0–100 %RH; стабильность <1 %RH/год; кабель 2 м. Перед выбором зонда уточните коды заказа P28/P50."),
        r("Psychrometric calculations", "Психрометрические расчёты",
          "WMO method: dew/frost point, wet-bulb temperature, enthalpy, vapor concentration, specific humidity, mixing ratio by mass, vapor pressure, saturation vapor pressure and saturation vapor density.",
          "Методика ВМО: точка росы/инея, температура мокрого термометра, энтальпия, концентрация пара, удельная влажность, массовое отношение смеси, давление пара, давление и плотность насыщенного пара.")
      ],
      electrical: [
        r("Logging and statistics", "Регистрация и статистика",
          "Spot readings and interval logging from 1 s to 24 h; 8 × 8,000 readings; MIN/MAX/AVG.",
          "Разовые измерения и запись с интервалом от 1 с до 24 ч; 8 × 8 000 записей; минимум, максимум и среднее."),
        r("Display and alarms", "Дисплей и сигнализация",
          "Typical refresh 1 s; stored data can be graphed; visual and audible alarms.",
          "Типичное обновление раз в 1 с; график сохранённых данных; визуальная и звуковая сигнализация."),
        r("Battery and runtime", "Аккумулятор и автономность",
          "3.7 V, 1,000 mAh Li-polymer; 48 h logging every 30 s with screen off; 10 h with screen continuously on.",
          "Литий-полимерный, 3,7 В, 1 000 мА·ч; 48 ч при записи каждые 30 с с выключенным экраном; 10 ч с постоянно включённым экраном."),
        r("PC connection and charging", "Подключение к ПК и зарядка",
          "USB-C to USB-A cable in this revision; HygroSoft for configuration and data retrieval.",
          "В этой редакции указан кабель USB-C — USB-A; настройка и выгрузка данных в HygroSoft.")
      ],
      operating: [
        r("Handheld operating range", "Рабочий диапазон прибора",
          "−10 to +60 °C; 0–100 %RH, non-condensing.", "−10…+60 °C; 0–100 %RH, без конденсации."),
        r("Storage range", "Условия хранения", "−10 to +45 °C; 10–90 %RH.", "−10…+45 °C; 10–90 %RH.")
      ],
      mechanical: [
        r("Housing and ingress protection", "Корпус и степень защиты", "ABS and TPR; IP65.", "ABS и TPR; IP65."),
        r("Dimensions and weight", "Размеры и масса",
          "p. 1 table: 160 × 63 × 30 mm, 185 g. p. 2 drawings: 150 mm body, 65.2 mm wide, 30.9 mm deep before the clip; HP31 fixed probe projects another 100 mm.",
          "Таблица на стр. 1: 160 × 63 × 30 мм, 185 г. Чертежи на стр. 2: корпус 150 мм, ширина 65,2 мм, глубина 30,9 мм без клипсы; несъёмный зонд HP31 выступает ещё на 100 мм."),
        r("Standard delivery", "Стандартный комплект",
          "Handheld, soft case and USB cable. HP31 has a fixed probe; HP32 is supplied without a probe unless ordered as a set.",
          "Прибор, мягкий чехол и USB-кабель. У HP31 зонд несъёмный; HP32 поставляется без зонда, если не заказан набор."),
        r("HP32 sets", "Наборы HP32",
          "HP32-S-SET: HP32 + HC2A-S. HP32-SET: also E2-02A (2 m), ER-15 and EA35-SCS. HP32-A-REF-SET: HP32, HC2A-S with SCS-1T-3H, and E2-02A (2 m).",
          "HP32-S-SET: HP32 + HC2A-S. HP32-SET: также E2-02A (2 м), ER-15 и EA35-SCS. HP32-A-REF-SET: HP32, HC2A-S с SCS-1T-3H и E2-02A (2 м).")
      ]
    },
    note: {
      en: "Probe ranges do not extend the HP32 handheld's operating range. The p. 2 listing for HC2-HK25 says +200 °C, but the model-specific DwyerOmega specification lists +170 °C as the operating maximum. The linked PDF does not map insertion-probe accuracy to individual order codes.",
      ru: "Диапазоны зондов не расширяют рабочий диапазон самого HP32. На стр. 2 для HC2-HK25 указано +200 °C, но в спецификации DwyerOmega для этой модели рабочий предел составляет +170 °C. В паспорте погрешность зондов для сыпучих материалов не привязана к конкретным кодам заказа."
    }
  },
  "hygroflex1": {
    source: { revision: "59034E/2025-02", pages: "1–2" },
    references: [{ label: "Rotronic HF1", revision: "", pages: "", url: "https://service.rotronic.com/products-manual/technical-specification9_4.html" }],
    groups: {
      measurement: [
        r("Measured parameters and sensors", "Измеряемые параметры и датчики",
          "Humidity and/or temperature; integral HYGROMER IN-1 humidity sensor and thermistor.",
          "Влажность и/или температура; встроенные датчик влажности HYGROMER IN-1 и термистор."),
        r("Humidity accuracy at 23 °C ±5 K", "Погрешность влажности при 23 °C ±5 K",
          "Types W and D: error under 2 %RH; type S: under 3 %RH; both at 10–90 %RH. The table gives no type F value.",
          "Типы W и D: погрешность менее 2 %RH; тип S: менее 3 %RH; оба предела при 10–90 %RH. Для типа F значения в таблице нет."),
        r("Temperature accuracy at 23 °C ±5 K", "Погрешность температуры при 23 °C ±5 K",
          "±0.3 °C; type S: ±1 °C.", "±0,3 °C; тип S: ±1 °C."),
        r("Long-term humidity stability", "Долговременная стабильность влажности",
          "<1.5 %RH/year.", "<1,5 %RH/год."),
        r("Response times", "Время отклика",
          "Humidity: 30 s (t63 for a 35–80 %RH rise), without filter. Temperature: 4 s.",
          "Влажность: 30 с (t63 при скачке от 35 до 80 %RH), без фильтра. Температура: 4 с."),
        r("Humidity adjustment", "Настройка влажности",
          "35 and 80 %RH; HygroSoft for calibration and scaling.",
          "35 и 80 %RH; калибровка и настройка шкал в HygroSoft.")
      ],
      electrical: [
        r("Circuit variants", "Схемы подключения",
          "HF120: 2-wire; HF13x: 3/4-wire.", "HF120: 2-проводная; HF13x: 3-/4-проводная."),
        r("Supply by circuit", "Питание по типу подключения",
          "HF13x: 12–28 V AC or 15–40 V DC. HF120: 10–28 V DC loop supply per Rotronic's HF1 manual; minimum voltage depends on loop load.",
          "HF13x: 12–28 В перем. тока или 15–40 В пост. тока. HF120: питание по токовой петле 10–28 В пост. тока по руководству Rotronic HF1; минимальное напряжение зависит от нагрузки петли."),
        r("Current consumption", "Потребляемый ток",
          "HF120: max. 40 mA; HF13x: <15 mA with voltage output or <55 mA with current output.",
          "HF120: не более 40 мА; HF13x: <15 мА с выходом по напряжению или <55 мА с токовым выходом."),
        r("Analog outputs", "Аналоговые выходы",
          "Two scalable analog outputs. HF120: 4–20 mA; HF13x: 4–20 mA or 0–1, 0–5 or 0–10 V DC, depending on variant.",
          "Два масштабируемых аналоговых выхода. HF120: 4–20 мА; HF13x: 4–20 мА либо 0–1, 0–5 или 0–10 В пост. тока, в зависимости от исполнения."),
        r("Standard temperature output scale", "Стандартная шкала выхода температуры",
          "0–50 °C or 0–100 °F; listed standard order codes use 0–50 °C.",
          "0–50 °C или 0–100 °F; для указанных типовых кодов заказа применяется шкала 0–50 °C.")
      ],
      operating: [
        r("Operating and measuring humidity", "Рабочий диапазон и диапазон измерения влажности",
          "0–100 %RH, non-condensing.", "0–100 %RH, без конденсации."),
        r("Operating and measuring temperature", "Рабочий диапазон и диапазон измерения температуры",
          "Type S: −20 to +50 °C; types W, D and F: −20 to +60 °C.",
          "Тип S: −20…+50 °C; типы W, D и F: −20…+60 °C.")
      ],
      mechanical: [
        r("Housing and ingress protection", "Корпус и степень защиты",
          "ABS, UL 94 HB; IP65 for W/D/F, IP30 for room-mount S.",
          "ABS, UL 94 HB; IP65 для W/D/F, IP30 для комнатного S."),
        r("Mounting and weight", "Монтаж и масса",
          "W wall: 140 g; D duct, 100 mm probe: 140 g; F duct, 300 mm probe: 200 g; S room: 90 g.",
          "W настенный: 140 г; D канальный, зонд 100 мм: 140 г; F канальный, зонд 300 мм: 200 г; S комнатный: 90 г."),
        r("Wall and room model dimensions", "Размеры настенного и комнатного исполнений",
          "W: 105 × 172 × 32 mm overall; S: 86 × 86 × 24 mm.",
          "W: габариты 105 × 172 × 32 мм; S: 86 × 86 × 24 мм."),
        r("Standard wall order codes (W)", "Стандартные коды настенного исполнения (W)",
          "HF120-WB1XX1XX: 4–20 mA, no display. HF132-WB1XD1XX: 4–20 mA, with display.",
          "HF120-WB1XX1XX: 4–20 мА, без дисплея. HF132-WB1XD1XX: 4–20 мА, с дисплеем."),
        r("Standard duct order codes (D/F)", "Стандартные коды канальных исполнений (D/F)",
          "D: HF132-DB1XX1XX (4–20 mA), HF135-DB1XX1XX (0–10 V DC). F: HF120-FB1XX1XX (4–20 mA). All without display.",
          "D: HF132-DB1XX1XX (4–20 мА), HF135-DB1XX1XX (0–10 В пост. тока). F: HF120-FB1XX1XX (4–20 мА). Все без дисплея."),
        r("Standard room order codes (S)", "Стандартные коды комнатного исполнения (S)",
          "HF120-SB1XDXXX and HF132-SB1XDXXX: both 4–20 mA, with display.",
          "HF120-SB1XDXXX и HF132-SB1XDXXX: оба 4–20 мА, с дисплеем.")
      ]
    },
    note: {
      en: "The linked datasheet gives one unsplit supply entry. The HF120 loop-supply limit and circuit-specific output options are distinguished in Rotronic's HF1 manual.",
      ru: "В паспорте приведена общая строка питания без разбивки. Ограничение питания HF120 по токовой петле и доступные выходы по схемам подключения уточнены в руководстве Rotronic HF1."
    }
  }
};
