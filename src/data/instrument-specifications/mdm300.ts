import { r, type SpecificationSheet } from "./types";

export const mdm300Specifications: Record<string, SpecificationSheet> = {
  mdm300: {
    source: { revision: "97156 V9.7 (2023-02)", pages: "1, 3" },
    groups: {
      measurement: [
        r("Sensor", "Датчик", "Ceramic metal oxide", "Керамический металлооксидный"),
        r("Calibrated spot-check range", "Калиброванный диапазон выборочных измерений", "−70 to +20 °Cdp", "От −70 до +20 °Cdp"),
        r("Calibrated online range", "Калиброванный диапазон непрерывного анализа", "−100 to −70 °Cdp", "От −100 до −70 °Cdp"),
        r("Uncalibrated indication", "Показания вне калиброванного диапазона", "+20 to +30 °Cdp", "От +20 до +30 °Cdp"),
        r("Dew-point accuracy", "Точность измерения точки росы", "±1 °C from −60 to +20 °Cdp; ±2 °C from −100 to −60 °Cdp.", "±1 °C от −60 до +20 °Cdp; ±2 °C от −100 до −60 °Cdp."),
        r("Temperature accuracy", "Точность измерения температуры", "±0.2 °C"),
        r("Measurement resolution", "Разрешение измерения", "Better than 0.1 °Cdp.", "Лучше 0,1 °Cdp."),
        r("Display resolution", "Разрешение индикации", "0.1 for dew-point-derived units; automatic range where applicable.", "0,1 для единиц, рассчитанных по точке росы; автоматический выбор диапазона, где применимо."),
        r("Calibration", "Калибровка", "Traceable 13-point calibration, with certificate.", "Прослеживаемая калибровка по 13 точкам с сертификатом."),
        r("Display units", "Единицы индикации", "°C, °F and K for dew point and gas temperature. Available humidity units vary by gas and version.", "°C, °F и K для точки росы и температуры газа. Доступные единицы влажности зависят от газа и исполнения.")
      ],
      electrical: [
        r("Battery", "Аккумулятор", "4.8 V NiMH"),
        r("Data storage", "Память регистратора", "8 MB; up to 10,000 readings per log file.", "8 MB; до 10 000 записей на файл."),
        r("Logging interval", "Интервал регистрации", "5–60 s", "5–60 с"),
        r("Wireless communication", "Беспроводная связь", "Bluetooth 2.0; up to 5 m.", "Bluetooth 2.0; до 5 м."),
        r("Display", "Дисплей", "Blue graphical LCD.", "Синий графический ЖК-дисплей."),
        r("Interface languages", "Языки интерфейса", "English, French, German, Italian, Portuguese and Spanish.", "Английский, французский, немецкий, итальянский, португальский и испанский.")
      ],
      operating: [
        r("Maximum instrument pressure", "Максимальное давление прибора", "350 barg; the actual system limit also depends on the sampling configuration.", "350 barg; фактический предел системы зависит также от схемы отбора проб."),
        r("Operating temperature", "Рабочая температура", "−20 to +50 °C", "От −20 до +50 °C"),
        r("Storage and transport", "Хранение и транспортировка", "−20 to +50 °C", "От −20 до +50 °C"),
        r("Operating humidity", "Влажность окружающей среды", "0–100 %RH, condensing.", "0–100 % относительной влажности, с конденсацией.")
      ],
      mechanical: [
        r("Enclosure rating", "Степень защиты корпуса", "IP66 / NEMA 4"),
        r("Gas connections", "Газовые соединения", "1/8 NPT female; alternative connections are available.", "Внутренняя резьба 1/8 NPT; доступны другие варианты."),
        r("Housing material", "Материал корпуса", "Impact-resistant polyamide 6 with steel fibre.", "Ударопрочный полиамид 6 со стальным волокном."),
        r("Dimensions (depth × width × height)", "Габариты (глубина × ширина × высота)", "218 × 170 × 90 mm", "218 × 170 × 90 мм")
      ]
    }
  }
};
