import { r, type SpecificationSheet } from "./types";

export const aiiSpecifications: Record<string, SpecificationSheet> = {
  "gpr-1000-1100-2000-3500": {
    source: {
      revision: "Order Codes V5",
      pages: "1, 3–4",
      url: "https://www.processsensing.com/docs/ordercodes/GPR-1100%2C-GPR-2000-%26-GPR-3500-v5.pdf",
      label: "AII GPR-1100 / 2000 / 3500"
    },
    references: [
      { label: "AII GPR-1000", revision: "99963 V3.1", pages: "3–4", url: "https://www.processsensing.com/docs/datasheet/Portable-Oxygen-Analyzers-99963-UK-datasheet-v3-1.pdf" },
      { label: "AII GPR-1100", revision: "PST-DS-3202-00", pages: "2", url: "https://www.processsensing.com/docs/datasheet/GPR-1100-Datasheet.pdf" },
      { label: "AII GPR-2000", revision: "PST-DS-3203-00", pages: "2", url: "https://www.processsensing.com/docs/datasheet/GPR-2000-Datasheet.pdf" },
      { label: "AII GPR-3500 MOVR", revision: "99964 V3.1", pages: "4", url: "https://www.processsensing.com/docs/datasheet/Premium-Portable-Oxygen-Analyzers-99964-UK-datasheet-v3-1.pdf" }
    ],
    note: {
      en: "GPR-1000 is not listed in the linked order-code pages; its data are from AII 99963 V3.1 (pp. 3–4). GPR-1100 and GPR-2000 use PST-DS-3202-00 and PST-DS-3203-00 (p. 2 of each), matching the order-code sensor lists. GPR-3500 here is the MOVR version (AII 99964 V3.1, p. 4), not the MO shown in 99963. GPR-1200 and GPR-7100 in the order sheet are outside this listing.",
      ru: "GPR-1000 не описан в таблице кодов заказа; его данные взяты из AII 99963 V3.1 (с. 3–4). Для GPR-1100 и GPR-2000 использованы PST-DS-3202-00 и PST-DS-3203-00 (с. 2 каждого документа), соответствующие перечням датчиков в таблице заказа. Для GPR-3500 указано исполнение MOVR (AII 99964 V3.1, с. 4), а не MO из 99963. Модели GPR-1200 и GPR-7100 из таблицы заказа здесь не рассматриваются."
    },
    groups: {
      measurement: [
        r("O₂ measurement ranges", "Диапазоны измерения O₂", "GPR-1000: 0–1000 ppm, 0–1%; GPR-1100: 0–10, 0–100, 0–1000 ppmᵥ, 0–1%; GPR-2000: 0–1, 0–5, 0–10, 0–25%; GPR-3500 MOVR: 0–100%. The 0–25% scale on GPR-1000 and GPR-1100 is for air calibration only.", "GPR-1000: 0–1000 ppm, 0–1%; GPR-1100: 0–10, 0–100, 0–1000 ppmᵥ, 0–1%; GPR-2000: 0–1, 0–5, 0–10, 0–25%; GPR-3500 MOVR: 0–100%. Шкала 0–25% у GPR-1000 и GPR-1100 предназначена только для калибровки по воздуху."),
        r("Accuracy", "Погрешность", "GPR-1000 / GPR-1100 / GPR-2000: <2% of selected range at constant conditions; GPR-3500 MOVR: <2% at constant conditions.", "GPR-1000 / GPR-1100 / GPR-2000: <2% выбранного диапазона при постоянных условиях; GPR-3500 MOVR: <2% при постоянных условиях."),
        r("Lower detection limit (LDL)", "Нижний предел обнаружения (LDL)", "GPR-1000: 5 ppm; GPR-1100: 0.05 ppmᵥ; GPR-2000: 0.01%; GPR-3500 MOVR: 0.1%."),
        r("Resolution", "Разрешение", "GPR-1000: 1 ppm; GPR-1100: 0.01 ppmᵥ; GPR-2000: 0.001%; GPR-3500 MOVR: 0.1%."),
        r("Response time (T90)", "Время отклика (T90)", "GPR-1000: <10 s; GPR-1100: <2 min; GPR-2000: <30 s; GPR-3500 MOVR: <13 s.", "GPR-1000: <10 с; GPR-1100: <2 мин; GPR-2000: <30 с; GPR-3500 MOVR: <13 с."),
        r("Recovery after air exposure", "Восстановление после контакта с воздухом", "GPR-1000: after 60 s in air, <100 ppm in <15 min with N₂ purge.", "GPR-1000: после 60 с на воздухе — до <100 ppm менее чем за 15 мин при продувке N₂."),
        r("Electrochemical sensors", "Электрохимические датчики", "GPR-1000: GPR-12-100-M or XLT-12-100-M (>0.5% CO₂); GPR-1100: GPR-12-333, GPR-12-333-H (H₂/He) or XLT-12-333 (CO₂/acidic gas); GPR-2000: GPR-11-60-4 or XLT-11-24-4 (CO₂/acidic gas); GPR-3500 MOVR: GPR-11-120-OP.", "GPR-1000: GPR-12-100-M или XLT-12-100-M (>0.5% CO₂); GPR-1100: GPR-12-333, GPR-12-333-H (H₂/He) или XLT-12-333 (CO₂/кислые газы); GPR-2000: GPR-11-60-4 или XLT-11-24-4 (CO₂/кислые газы); GPR-3500 MOVR: GPR-11-120-OP."),
        r("Sensor life", "Срок службы датчика", "GPR-1100: 24 months at 1000 ppmᵥ for GPR-12-333 / GPR-12-333-H; up to 24 months for XLT-12-333. GPR-2000 in air: 60 months with GPR-11-60-4; up to 24 months with XLT-11-24-4. GPR-3500 MOVR: 24 months at 25 °C and 1 atm in 100% O₂. No sensor-specific life stated for GPR-1000.", "GPR-1100: 24 мес. при 1000 ppmᵥ для GPR-12-333 / GPR-12-333-H; до 24 мес. для XLT-12-333. GPR-2000 на воздухе: 60 мес. с GPR-11-60-4; до 24 мес. с XLT-11-24-4. GPR-3500 MOVR: 24 мес. при 25 °C и 1 атм в 100% O₂. Для датчиков GPR-1000 отдельный срок не указан."),
        r("Calibration interval", "Интервал калибровки", "GPR-1000 and GPR-3500 MOVR: 30 days; GPR-1100 and GPR-2000: monthly recommended, application-dependent.", "GPR-1000 и GPR-3500 MOVR: 30 дней; GPR-1100 и GPR-2000: рекомендуется ежемесячно, зависит от применения.")
      ],
      electrical: [
        r("Output and logging", "Выход и регистрация данных", "0–1 V DC; built-in data logging documented for GPR-1100, GPR-2000 and GPR-3500 MOVR.", "0–1 В пост. тока; встроенная регистрация данных указана для GPR-1100, GPR-2000 и GPR-3500 MOVR."),
        r("Power and charging", "Питание и зарядка", "Rechargeable battery. GPR-1100 / GPR-2000: 100–240 V AC charger, 9 V DC / 2 A output; GPR-3500 MOVR: 9 V charger. Charge only in a non-hazardous area.", "Аккумулятор. GPR-1100 / GPR-2000: зарядное устройство с входом 100–240 В перем. тока и выходом 9 В пост. тока / 2 А; GPR-3500 MOVR: зарядное устройство 9 В. Зарядка только вне взрывоопасной зоны."),
        r("Battery life", "Время работы от аккумулятора", "Up to 30 days per charge. For pump-equipped variants, AII 99963 cites 40 h with the pump running.", "До 30 дней от одного заряда. Для исполнений с насосом AII 99963 указывает 40 ч при его работе."),
        r("Display", "Дисплей", "LCD; GPR-1000 and GPR-3500 MOVR: 7 × 3.5 cm graphical LCD.", "ЖК-дисплей; у GPR-1000 и GPR-3500 MOVR графический, 7 × 3.5 см.")
      ],
      operating: [
        r("Inlet pressure", "Давление на входе", "GPR-1000: 0.34–2 barg (5–30 psig), vent to atmosphere; GPR-1100 / GPR-2000: 5–30 psi (0.3–2 bar); GPR-3500 MOVR: 248.2 barg (3600 psig) at regulator inlet, vent to atmosphere.", "GPR-1000: 0.34–2 бар изб. (5–30 psig), сброс в атмосферу; GPR-1100 / GPR-2000: 5–30 psi (0.3–2 бар); GPR-3500 MOVR: 248.2 бар изб. (3600 psig) на входе регулятора, сброс в атмосферу."),
        r("Sample flow", "Расход пробы", "1–2 SCFH; AII reports 0.5–1 L/min for GPR-1100 / GPR-2000 and 0.5–1 Nl/min for GPR-1000 / GPR-3500 MOVR.", "1–2 SCFH; AII указывает 0.5–1 л/мин для GPR-1100 / GPR-2000 и 0.5–1 норм. л/мин для GPR-1000 / GPR-3500 MOVR."),
        r("Operating temperature", "Рабочая температура", "GPR sensors: +5 to +45 °C; XLT sensors on GPR-1000 / GPR-1100 / GPR-2000: −10 to +45 °C.", "Датчики GPR: от +5 до +45 °C; датчики XLT у GPR-1000 / GPR-1100 / GPR-2000: от −10 до +45 °C."),
        r("Pump and sampling", "Насос и отбор пробы", "GPR-1100: no pump option in V5. GPR-2000: optional pump for either B1 or B2. GPR-3500 MOVR: integral regulator, needle and bypass valves, flow indicator.", "GPR-1100: в V5 насос не предусмотрен. GPR-2000: опциональный насос для B1 или B2. GPR-3500 MOVR: встроенный регулятор, игольчатый и байпасный клапаны, индикатор расхода.")
      ],
      mechanical: [
        r("Gas fittings", "Газовые соединения", "GPR-1000: 1/8″ quick-connect, or 1/8″ compression on WP option; GPR-1100: 1/8″ quick-connect; GPR-2000: 1/8″ tube fittings; GPR-3500 MOVR: 1/8″ inlet, 1/4″ vent.", "GPR-1000: быстросъёмные 1/8″ или обжимные 1/8″ в исполнении WP; GPR-1100: быстросъёмные 1/8″; GPR-2000: трубные фитинги 1/8″; GPR-3500 MOVR: вход 1/8″, сброс 1/4″."),
        r("Wetted components", "Детали, контактирующие с пробой", "GPR-1000: brass fittings, stainless steel optional; GPR-1100 / GPR-3500 MOVR: stainless steel; GPR-2000: Delrin sensor housing and stainless-steel piping per order sheet.", "GPR-1000: латунные фитинги, опционально из нержавеющей стали; GPR-1100 / GPR-3500 MOVR: нержавеющая сталь; GPR-2000: держатель датчика из Delrin и трубки из нержавеющей стали по таблице заказа."),
        r("Enclosure", "Корпус", "Painted aluminum. GPR-1000: NEMA 4X, 10.1 × 22.9 × 7.6 cm, 3.64 kg. GPR-3500 MOVR: NEMA 4X, 21.8 × 22.9 × 7.6 cm, 5.4 kg.", "Окрашенный алюминий. GPR-1000: NEMA 4X, 10.1 × 22.9 × 7.6 см, 3.64 кг. GPR-3500 MOVR: NEMA 4X, 21.8 × 22.9 × 7.6 см, 5.4 кг."),
        r("Area classification", "Исполнение по зоне применения", "GPR-1000: ATEX version documented in AII 99963. GPR-1100 / GPR-2000: B1 general purpose or B2 cMETus, ATEX, IECEx, UKEX. GPR-3500 MOVR: general purpose only.", "GPR-1000: исполнение ATEX описано в AII 99963. GPR-1100 / GPR-2000: B1 общепромышленное или B2 с cMETus, ATEX, IECEx, UKEX. GPR-3500 MOVR: только общепромышленное.")
      ]
    }
  },
  "gpr-1500": {
    source: {
      revision: "GPR-1500/A_V4",
      pages: "1–2",
      url: "https://www.processsensing.com/docs/ordercodes/GPR-1500-Series-Order-Codes-v4.pdf",
      label: "AII GPR-1500 / 1500A"
    },
    references: [
      { label: "AII GPR-x500", revision: "PST-DS-3002-00", pages: "2", url: "https://www.processsensing.com/docs/datasheet/GPR-x500-Oxygen-Analyzers.pdf" },
      { label: "AII GPR-x500 A", revision: "PST-UM-3019-EN-01", pages: "44", url: "https://www.processsensing.com/docs/manual/GPR-x500-A-Oxygen-Analyzers.pdf" }
    ],
    note: {
      en: "The order sheet distinguishes the two-wire GPR-1500 transmitter from the separately powered GPR-1500A analyzer. Additional data: PST-DS-3002-00 (p. 2) and PST-UM-3019-EN-01 (Appendix A, PDF p. 44) for the A variant. The newer documents list NEMA 3R where the order sheet lists NEMA 4X; verify protection and supply rating against the exact unit. The table does not apply to separately identified DK or LD assemblies.",
      ru: "В таблице заказа двухпроводный преобразователь GPR-1500 отделён от анализатора GPR-1500A с отдельным питанием. Дополнительные данные: PST-DS-3002-00 (с. 2) и PST-UM-3019-EN-01 (приложение A, с. 44 PDF) для версии A. В более новых документах указан NEMA 3R, а в таблице заказа — NEMA 4X; класс защиты и питание нужно сверять с маркировкой прибора. Таблица не относится к отдельным сборкам DK и LD."
    },
    groups: {
      measurement: [
        r("O₂ measurement ranges", "Диапазоны измерения O₂", "0–10, 0–100, 0–1000 ppmᵥ and 0–1%; 0–25% for air calibration only.", "0–10, 0–100, 0–1000 ppmᵥ и 0–1%; 0–25% только для калибровки по воздуху."),
        r("Range selection", "Выбор диапазона", "Manual or automatic.", "Ручной или автоматический."),
        r("Output resolution", "Разрешение выходного сигнала", "0.01 ppmᵥ"),
        r("Lower detection limit (LDL)", "Нижний предел обнаружения (LDL)", "0.05 ppmᵥ"),
        r("Response time (T90)", "Время отклика (T90)", "<2 min per the x500 datasheet and x500 A manual.", "<2 мин по данным паспорта x500 и руководства x500 A."),
        r("Sensor options", "Варианты датчика", "GPR-12-333; XLT-12-333 for CO₂/acidic gas; GPR-12-333-H for H₂/He.", "GPR-12-333; XLT-12-333 для CO₂/кислых газов; GPR-12-333-H для H₂/He."),
        r("Sensor life and calibration", "Срок службы датчика и калибровка", "24 months in <1000 ppmᵥ (GPR-1500) or at 1000 ppmᵥ (GPR-1500A manual); 30-day calibration interval. Application-dependent.", "24 мес. при <1000 ppmᵥ (GPR-1500) или при 1000 ppmᵥ (по руководству GPR-1500A); интервал калибровки 30 дней. Зависит от применения.")
      ],
      electrical: [
        r("Supply voltage", "Напряжение питания", "GPR-1500: 18–24 V DC, two-wire loop. GPR-1500A: separate DC supply; 12–28 V in V4 order codes, 12–24 V in PST-UM-3019-EN-01.", "GPR-1500: 18–24 В пост. тока, двухпроводная петля. GPR-1500A: отдельное питание пост. тока; 12–28 В по таблице заказа V4, 12–24 В по PST-UM-3019-EN-01."),
        r("Maximum power", "Максимальная потребляемая мощность", "GPR-1500: 1.8 W; GPR-1500A: 28 W per PST-UM-3019-EN-01.", "GPR-1500: 1.8 Вт; GPR-1500A: 28 Вт по PST-UM-3019-EN-01."),
        r("Analog signal", "Аналоговый сигнал", "GPR-1500: 4–20 mA loop. GPR-1500A: 4–20 mA; V4 also lists 1–5 V DC as an alternative output.", "GPR-1500: токовая петля 4–20 мА. GPR-1500A: 4–20 мА; в V4 также указан альтернативный выход 1–5 В пост. тока."),
        r("Communications and alarms", "Интерфейс и сигнализация", "GPR-1500A only: Modbus RS485 and two configurable alarm contacts.", "Только GPR-1500A: Modbus RS485 и два настраиваемых контакта сигнализации."),
        r("Display", "Дисплей", "LCD", "ЖК-дисплей")
      ],
      operating: [
        r("Sample pressure and flow", "Давление и расход пробы", "5–30 psi (0.4–2.1 bar); 1–2 SCFH (0.5–1 L/min), application-dependent.", "5–30 psi (0.4–2.1 бар); 1–2 SCFH (0.5–1 л/мин), в зависимости от применения."),
        r("Operating temperature", "Рабочая температура", "GPR sensor: +5 to +45 °C; XLT sensor: −10 to +45 °C.", "Датчик GPR: от +5 до +45 °C; датчик XLT: от −10 до +45 °C."),
        r("Humidity", "Относительная влажность", "GPR-1500: 0–80% RH, non-condensing (PST-DS-3002-00).", "GPR-1500: 0–80% отн. влажн., без конденсации (PST-DS-3002-00)."),
        r("Temperature compensation", "Температурная компенсация", "Documented for the GPR-1500 transmitter.", "Указана для преобразователя GPR-1500.")
      ],
      mechanical: [
        r("Wall mount and enclosure", "Настенный монтаж и корпус", "V4: fiberglass wall-mount NEMA 4X enclosure. PST x500 datasheet and x500 A manual: fiberglass and painted aluminum, NEMA 3R.", "V4: настенный корпус из стеклопластика, NEMA 4X. Паспорт PST x500 и руководство x500 A: стеклопластик и окрашенный алюминий, NEMA 3R."),
        r("Gas path and sample options", "Газовый тракт и опции пробоотбора", "Stainless-steel tubing and sensor housing; 1/8″ tube fittings. Optional A-4442 inlet coalescing filter or separate sample panel.", "Трубки и корпус датчика из нержавеющей стали; фитинги 1/8″. Опции: входной коалесцентный фильтр A-4442 или отдельная панель пробоотбора."),
        r("Area classification", "Исполнение по зоне применения", "GPR-1500: B1 general purpose; B2 cMETus, ATEX, IECEx, UKEX, with separately supplied I.S. barrier. GPR-1500A: general purpose only under V4.", "GPR-1500: B1 общепромышленное; B2 с cMETus, ATEX, IECEx, UKEX и отдельно поставляемым барьером искрозащиты. GPR-1500A: только общепромышленное по V4.")
      ]
    }
  },
  "gpr-1500gb-2500gb": {
    source: { revision: "V2.1_UK_0123", pages: "2–4" },
    note: {
      en: "These data describe the general-purpose GB variants in AII V2.1. For GPR-1500 GB, 0–25% is marked calibration-only on p. 3; it is not an additional measuring range.",
      ru: "Данные относятся к общепромышленным исполнениям GB по AII V2.1. Для GPR-1500 GB шкала 0–25% на с. 3 предназначена только для калибровки и не является дополнительным диапазоном измерения."
    },
    groups: {
      measurement: [
        r("O₂ measurement ranges", "Диапазоны измерения O₂", "GPR-1500 GB: 0–10, 0–100, 0–1000 ppm, 0–1%; 0–25% for calibration only. GPR-2500 GB: 0–1, 0–5, 0–10, 0–25%.", "GPR-1500 GB: 0–10, 0–100, 0–1000 ppm, 0–1%; 0–25% только для калибровки. GPR-2500 GB: 0–1, 0–5, 0–10, 0–25%."),
        r("Accuracy", "Погрешность", "<2% of selected range at constant conditions.", "<2% выбранного диапазона при постоянных условиях."),
        r("Lower detection limit (LDL)", "Нижний предел обнаружения (LDL)", "GPR-1500 GB: 0.05 ppm; GPR-2500 GB: 0.005%."),
        r("Linearity", "Линейность", "<1% of scale.", "<1% шкалы."),
        r("Response and recovery", "Отклик и восстановление", "T90 <10 s for both. GPR-1500 GB: after 60 s in air, <10 ppm in <1 h with N₂ purge; recovery specification not applicable to GPR-2500 GB.", "T90 <10 с у обеих моделей. GPR-1500 GB: после 60 с на воздухе — до <10 ppm менее чем за 1 ч при продувке N₂; для GPR-2500 GB показатель восстановления не применяется."),
        r("Sensor options", "Варианты датчика", "GPR-1500 GB: GPR-12-333 or XLT-12-333; GPR-2500 GB: GPR-11-32-4 or XLT-11-24-4. Use XLT for >0.5% CO₂.", "GPR-1500 GB: GPR-12-333 или XLT-12-333; GPR-2500 GB: GPR-11-32-4 или XLT-11-24-4. XLT для газов с >0.5% CO₂."),
        r("Sensor life at 25 °C and 1 atm", "Срок службы датчика при 25 °C и 1 атм", "GPR-1500 GB: 24 months in <1000 ppm O₂, 6 months in air. GPR-2500 GB in air: 32 months with GPR-11-32-4, 24 months with XLT-11-24-4.", "GPR-1500 GB: 24 мес. при <1000 ppm O₂, 6 мес. на воздухе. GPR-2500 GB на воздухе: 32 мес. с GPR-11-32-4, 24 мес. с XLT-11-24-4."),
        r("Calibration interval", "Интервал калибровки", "30 days", "30 дней")
      ],
      electrical: [
        r("Power and output", "Питание и выход", "18–24 V DC two-wire loop; 4–20 mA loop signal.", "Двухпроводная петля 18–24 В пост. тока; выходной ток 4–20 мА."),
        r("Display", "Дисплей", "Graphical LCD, 7 × 3.5 cm; display resolution 0.001.", "Графический ЖК-дисплей, 7 × 3.5 см; разрешение индикации 0.001."),
        r("Alarms", "Сигнализация", "None", "Нет")
      ],
      operating: [
        r("Inlet pressure", "Давление на входе", "Nominally atmospheric; flow-through housing: 0.34–2 barg (5–30 psig) with atmospheric vent.", "Номинально атмосферное; в проточном корпусе — 0.34–2 бар изб. (5–30 psig) со сбросом в атмосферу."),
        r("Sample flow", "Расход пробы", "Ambient monitoring or 0.5–1 Nl/min (1–2 SCFH) in a flow-through system.", "Измерение в окружающей среде или 0.5–1 норм. л/мин (1–2 SCFH) в проточной системе."),
        r("Temperature and compensation", "Температура и компенсация", "Temperature compensated. GPR sensor: +5 to +45 °C; XLT sensor: −10 to +45 °C.", "Температурная компенсация. Датчик GPR: от +5 до +45 °C; XLT: от −10 до +45 °C.")
      ],
      mechanical: [
        r("Mounting and gas connection", "Монтаж и газовое соединение", "KF-40 flange on analyzer or remote sensor; 1/8″ compression fittings with flow-through housing.", "Фланец KF-40 на приборе или выносном датчике; обжимные фитинги 1/8″ с проточным корпусом."),
        r("Optional sample/calibration module", "Опциональный модуль отбора пробы и калибровки", "GPR-1500 GB: SS-3170; GPR-2500 GB: B-3170."),
        r("Wetted components", "Детали, контактирующие с пробой", "GPR-1500 GB: stainless steel; GPR-2500 GB: Delrin.", "GPR-1500 GB: нержавеющая сталь; GPR-2500 GB: Delrin."),
        r("Enclosure and weight", "Корпус и масса", "Painted aluminum; 7.6 × 10.1 × 5.1 cm; 900 g.", "Окрашенный алюминий; 7.6 × 10.1 × 5.1 см; 900 г."),
        r("Area classification", "Исполнение по зоне применения", "General purpose.", "Общепромышленное.")
      ]
    }
  },
  "gpr-1600-2600-3100": {
    source: { revision: "V2_UK_1018", pages: "1–4" },
    references: [{ label: "AII GPR-3100", revision: "21001", pages: "1, 9", url: "https://www.processsensing.com/docs/manual/MANUAL_3100_21001.pdf" }],
    note: {
      en: "For GPR-3100, the series sheet and the earlier 21001 manual give different inlet pressure figures. Do not use the higher value as the inlet rating without verifying the exact sample assembly. The ±0.02 ppm highlight on p. 1 concerns the lowest trace range, not the entire family.",
      ru: "Для GPR-3100 паспорт серии и более раннее руководство 21001 указывают разные входные давления. Не применяйте большее значение без проверки конкретного узла пробоотбора. Указанные на с. 1 ±0.02 ppm относятся к самому низкому диапазону следовых концентраций, а не ко всей серии."
    },
    groups: {
      measurement: [
        r("O₂ measurement ranges", "Диапазоны измерения O₂", "GPR-1600: 0–10, 0–100, 0–1000 ppm, 0–1% (0–25% for calibration only). GPR-2600: 0–1, 0–5, 0–10, 0–25%. GPR-3100: 0–100% plus suppressed-zero ranges of 50–100, 80–100 or 90–100%.", "GPR-1600: 0–10, 0–100, 0–1000 ppm, 0–1% (0–25% только для калибровки). GPR-2600: 0–1, 0–5, 0–10, 0–25%. GPR-3100: 0–100% и диапазоны со смещённым нулём 50–100, 80–100 или 90–100%."),
        r("Range selection", "Выбор диапазона", "Manual or automatic.", "Ручной или автоматический."),
        r("Accuracy", "Погрешность", "General specification: error magnitude <2% of selected range. GPR-3100: ±0.1% at constant conditions after calibration with 95–100% O₂.", "Общая характеристика: модуль погрешности <2% выбранного диапазона. GPR-3100: ±0.1% при постоянных условиях после калибровки газом с 95–100% O₂."),
        r("Lower detection limit (LDL)", "Нижний предел обнаружения (LDL)", "GPR-1600: 50 ppb; GPR-2600: 50 ppm; GPR-3100: 0.1% O₂."),
        r("Linearity", "Линейность", "<0.5% of scale.", "<0.5% шкалы."),
        r("Response time (T90)", "Время отклика (T90)", "GPR-1600 / GPR-2600: <10 s; GPR-3100: <13 s.", "GPR-1600 / GPR-2600: <10 с; GPR-3100: <13 с."),
        r("Recovery after air exposure", "Восстановление после контакта с воздухом", "GPR-1600 only: after 60 s in air, <10 ppm in <1 h with N₂ purge.", "Только GPR-1600: после 60 с на воздухе — до <10 ppm менее чем за 1 ч при продувке N₂."),
        r("Sensor models", "Модели датчиков", "GPR-1600: GPR-12-333 or XLT-12-333; GPR-2600: GPR-11-32-4 or XLT-11-24-4; GPR-3100: GPR-11-120-OP. XLT options for mixtures with >0.5% CO₂.", "GPR-1600: GPR-12-333 или XLT-12-333; GPR-2600: GPR-11-32-4 или XLT-11-24-4; GPR-3100: GPR-11-120-OP. XLT для смесей с >0.5% CO₂."),
        r("Sensor life at 25 °C and 1 atm", "Срок службы датчика при 25 °C и 1 атм", "GPR-1600: 24 months in <1000 ppm O₂; GPR-2600: 32 months with GPR-11-32-4, 24 months with XLT-11-24-4; GPR-3100: 24 months in 100% O₂.", "GPR-1600: 24 мес. при <1000 ppm O₂; GPR-2600: 32 мес. с GPR-11-32-4, 24 мес. с XLT-11-24-4; GPR-3100: 24 мес. в 100% O₂."),
        r("Calibration interval", "Интервал калибровки", "Typically 1–3 months; auto-zero and auto-calibration are optional.", "Обычно 1–3 мес.; автоматическая установка нуля и автокалибровка — опции.")
      ],
      electrical: [
        r("Mains supply", "Питание от сети", "100–240 V AC", "100–240 В перем. тока"),
        r("Analog outputs", "Аналоговые выходы", "Isolated 4–20 mA, plus 0–1 V and 0–5 V.", "Изолированный выход 4–20 мА, а также 0–1 В и 0–5 В."),
        r("Range identification", "Сигнал выбранного диапазона", "1–5 V or 4–20 mA; optional relay contacts.", "1–5 В или 4–20 мА; опционально релейные контакты."),
        r("Communications and alarms", "Интерфейсы и сигнализация", "Choice of RS485, RS232 or USB; two user-adjustable alarm relays.", "RS485, RS232 или USB на выбор; два настраиваемых реле сигнализации."),
        r("Display", "Дисплей", "Graphical LCD, 12.7 × 7 cm; display resolution 0.01.", "Графический ЖК-дисплей, 12.7 × 7 см; разрешение индикации 0.01.")
      ],
      operating: [
        r("Inlet pressure", "Давление на входе", "GPR-1600 / GPR-2600: 0.34–2 barg (5–30 psig) with atmospheric vent. GPR-3100: 248 barg (3600 psig) in V2_UK_1018; earlier AII manual 21001 (PDF pp. 1, 9): regulated inlet at 5–30 psig, atmospheric vent.", "GPR-1600 / GPR-2600: 0.34–2 бар изб. (5–30 psig) со сбросом в атмосферу. GPR-3100: 248 бар изб. (3600 psig) по V2_UK_1018; более раннее руководство AII 21001 (с. 1, 9 PDF): регулировка на входе до 5–30 psig, сброс в атмосферу."),
        r("Constant sample flow", "Постоянный расход пробы", "0.5–1.0 Nl/min (1–2 SCFH)", "0.5–1.0 норм. л/мин (1–2 SCFH)"),
        r("Operating temperature", "Рабочая температура", "GPR sensor: +5 to +45 °C; XLT sensor: −10 to +45 °C.", "Датчик GPR: от +5 до +45 °C; XLT: от −10 до +45 °C."),
        r("Compensation and sample handling", "Компенсация и тракт пробы", "Barometric pressure and temperature compensation. GPR-1600: integral four-way bypass; GPR-1600 / GPR-2600: optional heated sample system; GPR-3100: temperature-controlled sensor and sample system.", "Компенсация атмосферного давления и температуры. GPR-1600: встроенный четырёхходовой байпас; GPR-1600 / GPR-2600: опциональный обогрев тракта пробы; GPR-3100: термостатирование датчика и тракта пробы.")
      ],
      mechanical: [
        r("Gas path", "Газовый тракт", "Stainless-steel wetted parts; 1/4″ compression tube fittings.", "Детали, контактирующие с пробой, из нержавеющей стали; обжимные фитинги 1/4″."),
        r("Enclosure and mounting (H × W × D)", "Корпус и монтаж (В × Ш × Г)", "Painted aluminum. Bench: 35.3 × 25.1 × 34 cm; panel: 19 × 27.4 × 28.6 cm; 19″ rack: 19 × 48 × 72 cm; wall: 34.6 × 26.7 × 17.8 cm; wall W: 34.6 × 31.8 × 19.7 cm; wall W306: 46.4 × 40.7 × 17.2 cm.", "Окрашенный алюминий. Настольный: 35.3 × 25.1 × 34 см; щитовой: 19 × 27.4 × 28.6 см; стойка 19″: 19 × 48 × 72 см; настенный: 34.6 × 26.7 × 17.8 см; настенный W: 34.6 × 31.8 × 19.7 см; настенный W306: 46.4 × 40.7 × 17.2 см.")
      ]
    }
  },
  "gpr-1900-2900": {
    source: { revision: "© 2024 PST", pages: "1–2" },
    references: [{ label: "AII GPR-2900", revision: "70928 (10/2015)", pages: "", url: "https://www.processsensing.com/docs/manual/MANUAL_2900_70928.pdf" }],
    note: {
      en: "The linked 2024 sheet lists AC power. The 10/2015 model manuals also describe 12–28 V DC and a 1–5 V measurement output, but the 2024 sheet prints “1.5 V” for the alternate signal. Confirm the unit before specifying a DC supply or voltage measurement output; the range identification output is explicit.",
      ru: "В приложенном паспорте 2024 года указано сетевое питание. Руководства от 10/2015 также описывают питание 12–28 В пост. тока и измерительный выход 1–5 В, но в паспорте 2024 года альтернативный сигнал напечатан как «1.5 V». Питание пост. тока и выход по напряжению нужно сверять с конкретным прибором; выход индикации диапазона указан однозначно."
    },
    groups: {
      measurement: [
        r("O₂ measurement ranges", "Диапазоны измерения O₂", "GPR-1900: 0–10, 0–100, 0–1000 ppmᵥ and 0–1%, plus 0–25% for calibration only. GPR-2900: 0–1, 0–5, 0–10, 0–25%, with optional 0–100%.", "GPR-1900: 0–10, 0–100, 0–1000 ppmᵥ и 0–1%, дополнительно 0–25% только для калибровки. GPR-2900: 0–1, 0–5, 0–10, 0–25%; опционально 0–100%."),
        r("Accuracy", "Погрешность", "<2% of selected range at constant conditions.", "<2% выбранного диапазона при постоянных условиях."),
        r("Output resolution", "Разрешение выходного сигнала", "GPR-1900: 0.01 ppmᵥ; GPR-2900: 0.001%."),
        r("Lower detection limit (LDL)", "Нижний предел обнаружения (LDL)", "GPR-1900: 0.05 ppmᵥ; GPR-2900: 0.005%."),
        r("Response time (T90)", "Время отклика (T90)", "<2 min", "<2 мин"),
        r("Remote electrochemical sensor", "Выносной электрохимический датчик", "GPR-1900: GPR-12-333 or XLT-12-333. GPR-2900: GPR-11-60-4 or XLT-11-24-4. XLT for backgrounds with >0.5% CO₂.", "GPR-1900: GPR-12-333 или XLT-12-333. GPR-2900: GPR-11-60-4 или XLT-11-24-4. XLT для фонового газа с >0.5% CO₂."),
        r("Sensor life (application-dependent)", "Срок службы датчика (зависит от применения)", "GPR-1900: 24 months at 1000 ppmᵥ. GPR-2900 in air: 60 months with GPR-11-60-4, 24 months with XLT-11-24-4.", "GPR-1900: 24 мес. при 1000 ppmᵥ. GPR-2900 на воздухе: 60 мес. с GPR-11-60-4, 24 мес. с XLT-11-24-4."),
        r("Calibration interval", "Интервал калибровки", "30 days recommended; application-dependent.", "Рекомендуется 30 дней; зависит от применения.")
      ],
      electrical: [
        r("Supply and maximum consumption", "Питание и максимальная мощность", "100–240 V AC; 5 W (2024 datasheet).", "100–240 В перем. тока; 5 Вт (паспорт 2024 года)."),
        r("Measurement signal", "Измерительный сигнал", "4–20 mA; verify the alternative voltage output for the installed unit.", "4–20 мА; альтернативный выход по напряжению следует уточнить для конкретного прибора."),
        r("Range identification output", "Выход индикации диапазона", "4–20 mA or 1–5 V.", "4–20 мА или 1–5 В."),
        r("Relay options", "Релейные выходы", "Three relays: two configurable setpoint alarms and one power-failure alarm.", "Три реле: два настраиваемых пороговых и одно для сигнализации пропадания питания."),
        r("Display and control", "Дисплей и управление", "LCD with four-button control.", "ЖК-дисплей и управление четырьмя кнопками.")
      ],
      operating: [
        r("Sample pressure", "Давление пробы", "5–30 psi (0.3–2 bar) with atmospheric vent.", "5–30 psi (0.3–2 бар) со сбросом в атмосферу."),
        r("Sample flow", "Расход пробы", "1–2 SCFH (0.5–1 L/min), application-dependent.", "1–2 SCFH (0.5–1 л/мин), в зависимости от применения."),
        r("Temperature and compensation", "Температура и компенсация", "Temperature compensated. GPR sensors: +5 to +45 °C; XLT sensors: −10 to +45 °C.", "Температурная компенсация. Датчики GPR: от +5 до +45 °C; XLT: от −10 до +45 °C.")
      ],
      mechanical: [
        r("Mounting and enclosure", "Монтаж и корпус", "Panel mount; painted sheet metal.", "Щитовой монтаж; окрашенный листовой металл."),
        r("Front panel dimensions (W × H)", "Размеры лицевой панели (Ш × В)", "177.80 × 95.25 mm (7.00 × 3.75 in), per drawing.", "177.80 × 95.25 мм (7.00 × 3.75 дюйма) по чертежу.")
      ]
    }
  }
};
