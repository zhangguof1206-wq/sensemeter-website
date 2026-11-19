import { r, type SpecificationSheet } from "./types";

const measurement = [
  r("Gas dew-point range", "Диапазон точки росы газа", "−110 to +20 °Cdp or −100 to +20 °Cdp, depending on order code.", "От −110 до +20 °Cdp или от −100 до +20 °Cdp, по коду заказа."),
  r("Dew-point accuracy", "Точность измерения точки росы", "±1 °C from −60 to +20 °Cdp; ±2 °C from −110 to −60 °Cdp. Applies within the compensated temperature range.", "±1 °C от −60 до +20 °Cdp; ±2 °C от −110 до −60 °Cdp. Действует в диапазоне температурной компенсации."),
  r("Repeatability", "Повторяемость", "0.5 °Cdp"),
  r("Response", "Время отклика", "5 min to T95 (dry to wet).", "5 мин до T95 при переходе от сухой среды к влажной."),
  r("Calibration", "Калибровка", "Traceable 13-point calibration, with certificate.", "Прослеживаемая калибровка по 13 точкам с сертификатом."),
  r("Gas moisture output scaling", "Шкала содержания влаги в газе", "0–3000 ppmv; configuration and pressure compensation must match the gas stream.", "0–3000 ppmv; настройка и компенсация давления должны соответствовать параметрам газового потока.")
];

const output = r("Analog output", "Аналоговый выход", "Two-wire 4–20 mA, configurable for dew point or moisture content.", "Двухпроводный выход 4–20 mA, настраиваемый для точки росы или содержания влаги.");
const current = r("Maximum current", "Максимальный ток", "23 mA");
const diagnostics = r("Diagnostic output", "Диагностический сигнал", "23 mA for sensor fault; 4 mA below the configured range; 20 mA above it.", "23 mA при неисправности датчика; 4 mA ниже настроенного диапазона, 20 mA выше него.");
const temperature = [
  r("Operating temperature", "Рабочая температура", "−40 to +60 °C", "От −40 до +60 °C"),
  r("Temperature compensation", "Температурная компенсация", "−20 to +50 °C", "От −20 до +50 °C"),
  r("Storage temperature", "Температура хранения", "−40 to +60 °C", "От −40 до +60 °C")
];
const flow = r("Gas flow at the sensor", "Расход газа у датчика", "1–5 Nl/min in the standard sampling block; 0–10 m/s in direct insertion.", "1–5 норм. л/мин в стандартном блоке отбора проб; 0–10 м/с при прямой установке.");
const enclosure = r("Enclosure rating", "Степень защиты корпуса", "IP66 / NEMA 4");
const guard = r("Sensor guard", "Защитный фильтр датчика", "Sintered stainless steel (>80 µm particles); optional HDPE (>10 µm particles).", "Спечённая нержавеющая сталь (частицы >80 мкм); опция HDPE (частицы >10 мкм).");

export const easidewProSpecifications: Record<string, SpecificationSheet> = {
  "easidew-pro-is": {
    source: { revision: "97208 V10.7 (2024-04)", pages: "2–3" },
    references: [{ label: "Easidew PRO I.S.", revision: "97130 V16.5 (2022-11)", pages: "15–16", url: "https://www.processsensing.com/docs/manual/Michell_Instruments_Easidew_PRO_I.S._Manual_v16-5.pdf" }],
    groups: {
      measurement,
      electrical: [
        output,
        r("Supply voltage", "Напряжение питания", "12–28 V DC"),
        r("Maximum load", "Максимальное сопротивление нагрузки", "250 Ω at 12 V; 500 Ω at 24 V.", "250 Ом при 12 В; 500 Ом при 24 В."),
        current,
        r("Wiring entry", "Кабельный ввод", "Screw terminals; M20 × 1.5 cable entry.", "Винтовые клеммы; кабельный ввод M20 × 1,5."),
        diagnostics
      ],
      operating: [
        ...temperature,
        r("Maximum working pressure", "Максимальное рабочее давление", "525 barg (52.5 MPa) per datasheet V10.7; older manual v16.5 lists 450 barg. Confirm the applicable limit for the exact equipment and installation.", "525 barg (52,5 МПа) по спецификации V10.7; в раннем руководстве v16.5 указано 450 barg. Допустимый предел уточняют для конкретного прибора и монтажа."),
        r("Canadian CRN installations", "Установки с требованиями CRN в Канаде", "138 barg maximum per datasheet V10.7.", "Не более 138 barg по спецификации V10.7."),
        flow
      ],
      mechanical: [
        enclosure,
        r("Housing", "Материал корпуса", "316 stainless steel", "Нержавеющая сталь 316"),
        r("Process connection", "Подключение к процессу", "5/8–18 UNF with bonded seal; G1/2 and 3/4 UNF adapters are optional.", "5/8–18 UNF с комбинированным уплотнением; переходники G1/2 и 3/4 UNF опциональны."),
        guard,
        r("Weight", "Масса", "1.27 kg"),
        r("Hazardous-area approvals", "Сертификаты для опасных зон", "ATEX, UKCA, IECEx, TR CU Ex and cQPSus are listed in V10.7; use the certificate and markings for the supplied unit.", "В V10.7 перечислены ATEX, UKCA, IECEx, TR CU Ex и cQPSus; применимость определяют по маркировке и сертификату конкретного прибора.")
      ]
    },
    note: {
      en: "These specifications are for the gas version. For moisture in liquids, specify the separate PRO LQ I.S. configuration; its ranges and sampling conditions differ.",
      ru: "Приведены параметры газового исполнения. Для измерения влаги в жидкостях указывайте отдельное исполнение PRO LQ I.S.: у него другие диапазоны и условия пробоотбора."
    }
  },
  "easidew-pro-xp": {
    source: { revision: "97459 V6.8 (2025-03)", pages: "2–3" },
    groups: {
      measurement,
      electrical: [
        output,
        r("Supply voltage", "Напряжение питания", "14–28 V DC"),
        r("Maximum load", "Максимальное сопротивление нагрузки", "250 Ω at 14 V; 500 Ω at 24 V.", "250 Ом при 14 В; 500 Ом при 24 В."),
        current,
        r("Wiring entry", "Кабельный ввод", "Two 3/4 NPT entries.", "Два ввода 3/4 NPT."),
        diagnostics
      ],
      operating: [
        ...temperature,
        r("Maximum working pressure", "Максимальное рабочее давление", "450 barg (45 MPa) when correctly installed.", "450 barg (45 МПа) при правильном монтаже."),
        r("Canadian CRN installations", "Установки с требованиями CRN в Канаде", "132 barg maximum.", "Не более 132 barg."),
        flow
      ],
      mechanical: [
        enclosure,
        r("Housing", "Материал корпуса", "Copper-free aluminium as standard; 316 stainless steel optional.", "Штатно: алюминий без меди; опционально: нержавеющая сталь 316."),
        r("Process connection", "Подключение к процессу", "316 stainless steel, 3/4–16 UNF with recessed Viton O-ring.", "Нержавеющая сталь 316, 3/4–16 UNF с утопленным кольцом Viton."),
        guard,
        r("Weight by housing", "Масса по материалу корпуса", "Aluminium: 1.6 kg; 316 stainless steel: 2.4 kg.", "Алюминий: 1.6 kg; нержавеющая сталь 316: 2.4 kg."),
        r("Hazardous-area approvals", "Сертификаты для опасных зон", "Approval and marking depend on housing and destination. Check the ATEX/UKEX, IECEx or cQPSus documentation for the selected version.", "Сертификат и маркировка зависят от корпуса и региона. Проверьте документы ATEX/UKEX, IECEx или cQPSus для выбранного исполнения."),
        r("Local display", "Местная индикация", "Available as an option.", "Предлагается опционально.")
      ]
    },
    note: {
      en: "These specifications are for the gas version. PRO XP LQ for liquid moisture uses different measurement and sampling parameters.",
      ru: "Приведены параметры газового исполнения. У PRO XP LQ для измерения влаги в жидкостях отличаются параметры измерения и пробоотбора."
    }
  }
};
