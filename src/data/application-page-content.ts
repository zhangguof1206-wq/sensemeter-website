export type ApplicationPageContent = {
  slug: string;
  path: string;
  image: string;
  heroImage: string;
  inlineImage: string;
  ctaImage: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  title: string;
  lead: string;
  primaryButton: string;
  secondaryButton: string;
  overviewEyebrow: string;
  overviewTitle: string;
  overviewText: string;
  rfqTitle: string;
  rfqPoints: string[];
  highlights: Array<{ icon: "sensor" | "duct" | "signal"; title: string; text: string }>;
  processTitle: string;
  processCards: Array<{ title: string; text: string }>;
  solutionsTitle: string;
  solutionTypes: string[];
  faqs: Array<{ question: string; answer: string }>;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  ctaImageAlt: string;
  recommendedSlugs: string[];
};

export const applicationPageContent: ApplicationPageContent[] = [
  {
    slug: "industrial-humidity-monitoring",
    path: "/applications/industrial-humidity-monitoring",
    image: "/assets/application-industrial-humidity-monitoring-v2.png",
    heroImage: "/assets/application-industrial-humidity-monitoring-v2.png",
    inlineImage: "assets/application-industrial-humidity-monitoring-v2.png",
    ctaImage: "assets/application-humidity-lab-user.png",
    metaTitle: "Industrial humidity and temperature monitoring",
    metaDescription: "Industrial humidity and temperature sensors for production areas, ducts, chambers, BMS and technical systems. Select stable instruments for process monitoring.",
    heroEyebrow: "Industrial humidity monitoring",
    title: "Industrial humidity and temperature monitoring",
    lead: "Humidity and temperature sensors, probes and transmitters for production processes, ducts, clean rooms, climate rooms and technical monitoring systems.",
    primaryButton: "Request a selection",
    secondaryButton: "View instruments",
    overviewEyebrow: "Application overview",
    overviewTitle: "Where humidity and temperature sensors are used",
    overviewText: "Sensor selection depends on the medium, measurement range, mounting method and output signal. For industrial tasks, stability, calibration, service access and compatibility with the control system are just as important as accuracy.",
    rfqTitle: "What to specify in your request",
    rfqPoints: ["Measured medium", "Temperature range", "Humidity range", "Required accuracy", "Mounting conditions", "Output signal", "Quantity", "Certificate or documentation needs"],
    highlights: [
      { icon: "sensor", title: "Sensor + transmitter", text: "Humidity and temperature measurement with a signal sent to a control or monitoring system." },
      { icon: "duct", title: "Chambers and ducts", text: "Probe selection for climate chambers, ventilation systems and technical rooms." },
      { icon: "signal", title: "Industrial output", text: "Analog or digital outputs for PLC, SCADA and local monitoring." }
    ],
    processTitle: "How to choose an industrial sensor",
    processCards: [
      { title: "Measurement point", text: "Air, process gas, chamber, warehouse or ventilation duct." },
      { title: "Installation", text: "Wall mount, probe, duct mount, cable, power supply and service access." },
      { title: "Signal and accuracy", text: "Humidity range, temperature range, required accuracy and output format." },
      { title: "Documentation", text: "Calibration, certificates, manuals and delivery requirements." }
    ],
    solutionsTitle: "Suitable solutions",
    solutionTypes: ["Humidity and temperature sensors for standard monitoring", "Industrial probes for ducts, chambers and technical installations", "Transmitters with control-system outputs", "Portable instruments for inspection and service checks"],
    faqs: [
      { question: "What is the difference between a humidity sensor and a humidity transmitter?", answer: "A sensor measures humidity. A transmitter conditions the measured signal and sends it to a control or monitoring system through an analog or digital output." },
      { question: "Which sensor is suitable for an air duct?", answer: "Duct applications usually need a probe with suitable insertion length, temperature range, stability and a mounting method that allows maintenance." },
      { question: "Can one instrument measure temperature and humidity?", answer: "Yes. Many industrial sensors measure both temperature and relative humidity, and the data can also be used for calculated humidity parameters." },
      { question: "What data is needed for model selection?", answer: "Specify the medium, temperature and humidity range, required accuracy, mounting method, output signal and operating conditions." }
    ],
    ctaTitle: "Need help choosing a model?",
    ctaText: "Send your operating conditions and required parameters. We will help match the right instrument to your task.",
    ctaButton: "Send parameters",
    ctaImageAlt: "Laboratory humidity instrument selection",
    recommendedSlugs: ["hc2a-series", "hc2a-industrial", "hygroflex1", "hmt310", "hmt370ex"]
  },
  {
    slug: "compressed-air-dew-point",
    path: "/applications/compressed-air-dew-point",
    image: "/assets/application-gas-processing.png",
    heroImage: "/assets/application-gas-processing.png",
    inlineImage: "assets/application-gas-processing.png",
    ctaImage: "assets/application-compressed-air-user.png",
    metaTitle: "Compressed air dew point monitoring",
    metaDescription: "Dew point meters and transmitters for compressed air dryers, process air and dry gas systems. Select instruments for continuous monitoring or portable checks.",
    heroEyebrow: "Compressed air dew point",
    title: "Compressed air dew point monitoring",
    lead: "Dew point meters, transmitters and hygrometers for compressed air systems, dryers, OEM skids and dry process gases.",
    primaryButton: "Request a selection",
    secondaryButton: "View instruments",
    overviewEyebrow: "Application overview",
    overviewTitle: "Why dew point matters in compressed air",
    overviewText: "Dew point indicates the moisture level in compressed air. Reliable monitoring helps protect pneumatic equipment, dryers, instruments, production processes and quality-critical applications.",
    rfqTitle: "What to specify in your request",
    rfqPoints: ["Gas type", "Pressure", "Expected dew point range", "Installation point", "Continuous or portable use", "Output signal", "Display or alarms", "Documentation needs"],
    highlights: [
      { icon: "sensor", title: "Dryer monitoring", text: "Continuous dew point control after refrigerant or adsorption dryers." },
      { icon: "duct", title: "Pipeline installation", text: "Direct installation, sampling line or bypass according to process conditions." },
      { icon: "signal", title: "Alarm and output", text: "Local display, relay alarm and analog output for control systems." }
    ],
    processTitle: "How to choose a dew point instrument",
    processCards: [
      { title: "Dew point range", text: "Define the expected dry range and alarm threshold." },
      { title: "Pressure", text: "Confirm line pressure and whether pressure dew point is required." },
      { title: "Installation", text: "Choose direct mount, sample cell, bypass or portable kit." },
      { title: "Output", text: "Specify display, alarm relay, analog output or digital communication." }
    ],
    solutionsTitle: "Suitable solutions",
    solutionTypes: ["Compact dew point transmitters for dryer outlet monitoring", "Online hygrometers with local display and alarm functions", "Portable dew point analyzers for service checks", "OEM transmitters for compressed-air dryer integration"],
    faqs: [
      { question: "Why measure dew point in compressed air?", answer: "Dew point shows the amount of moisture in compressed air. Monitoring helps prevent corrosion, icing, product contamination and dryer failure." },
      { question: "Where should the sensor be installed?", answer: "Common locations include the dryer outlet, critical branch lines, process air supply points and quality-control test points." },
      { question: "Do I need an online or portable instrument?", answer: "Online instruments are best for permanent monitoring and alarms. Portable analyzers are useful for checking multiple points, maintenance and periodic audits." },
      { question: "What data is needed for model selection?", answer: "Specify gas, pressure, expected dew point range, installation method, output requirements, display or alarm needs and operating conditions." }
    ],
    ctaTitle: "Need help choosing an instrument?",
    ctaText: "Send gas, pressure, dew point range and installation details. We will match the parameters with suitable models.",
    ctaButton: "Send parameters",
    ctaImageAlt: "Dew point instrument selection for compressed air systems",
    recommendedSlugs: ["easidew-34-m12", "easidew-online", "sf82-online", "dmt143-dmt143l", "mdm300"]
  },
  {
    slug: "glove-box-oxygen-analysis",
    path: "/applications/glove-box-oxygen-analysis",
    image: "/assets/application-gas-manufacturing.png",
    heroImage: "/assets/application-gas-manufacturing.png",
    inlineImage: "assets/application-gas-manufacturing.png",
    ctaImage: "assets/application-glove-box-user.png",
    metaTitle: "Glove box oxygen analysis",
    metaDescription: "Oxygen analyzers for glove boxes, nitrogen generators, gas purity monitoring and low-ppm oxygen control in industrial and laboratory applications.",
    heroEyebrow: "Oxygen analysis",
    title: "Glove box and gas oxygen analysis",
    lead: "Oxygen analyzers for glove boxes, nitrogen generators, gas purity checks, inert gas systems and low-ppm industrial monitoring.",
    primaryButton: "Request analyzer selection",
    secondaryButton: "View analyzers",
    overviewEyebrow: "Application overview",
    overviewTitle: "Where oxygen analyzers are used",
    overviewText: "Low oxygen levels are critical in glove boxes, inerting systems, gas generators and purity-sensitive processes. The right analyzer depends on range, sample condition, response time and integration needs.",
    rfqTitle: "What to specify in your request",
    rfqPoints: ["Gas background", "O2 range", "Pressure", "Sample flow", "Sampling point", "Display or alarm", "Output signal", "Documentation needs"],
    highlights: [
      { icon: "sensor", title: "Low-ppm oxygen", text: "Trace oxygen measurement for glove boxes and inert gas environments." },
      { icon: "duct", title: "Sample handling", text: "Sampling line, flow control and filtration for stable measurements." },
      { icon: "signal", title: "System integration", text: "Display, alarm and analog output for process or laboratory monitoring." }
    ],
    processTitle: "How to choose an oxygen analyzer",
    processCards: [
      { title: "O2 range", text: "Define ppm or percent oxygen range and required sensitivity." },
      { title: "Gas background", text: "Specify nitrogen, argon, process gas or mixed gas background." },
      { title: "Sampling", text: "Confirm pressure, flow, filtration and sampling point." },
      { title: "Interface", text: "Choose local display, alarms, analog output or digital integration." }
    ],
    solutionsTitle: "Suitable solutions",
    solutionTypes: ["Trace oxygen analyzers for glove box monitoring", "Oxygen analyzers for nitrogen generators and gas purity checks", "Panel or portable systems for low-ppm oxygen measurement", "Industrial oxygen monitoring with alarms and signal outputs"],
    faqs: [
      { question: "Why control oxygen in a glove box?", answer: "Even small oxygen levels can affect sensitive materials, reactions, welding, battery research or inert-atmosphere processes." },
      { question: "What oxygen range should I choose?", answer: "For glove boxes and inert gas, low-ppm ranges are common. For process or generator checks, the required range depends on purity requirements." },
      { question: "Is sample conditioning required?", answer: "Many systems use a sampling line with flow control and filtration. This helps protect the sensor and improve measurement stability." },
      { question: "What data is needed for model selection?", answer: "Specify gas background, O2 range, pressure, sample flow, installation point, alarm needs and documentation requirements." }
    ],
    ctaTitle: "Select an analyzer by parameters",
    ctaText: "Share your gas background, O2 range, pressure and sampling conditions. We will help select the right analyzer.",
    ctaButton: "Send parameters",
    ctaImageAlt: "Oxygen analyzer selection for glove box applications",
    recommendedSlugs: ["gpr-1500", "gpr-1900-2900", "gpr-1500gb-2500gb", "gpr-1600-2600-3100", "gpr-1000-1100-2000-3500"]
  },
  {
    slug: "natural-gas-moisture-monitoring",
    path: "/applications/natural-gas-moisture-monitoring",
    image: "/assets/application-gas-processing.png",
    heroImage: "/assets/application-gas-processing.png",
    inlineImage: "assets/application-natural-gas-inline.png",
    ctaImage: "assets/application-natural-gas-cta.png",
    metaTitle: "Natural gas moisture monitoring",
    metaDescription: "Moisture and hydrocarbon dew point instruments for natural gas, process gas, pipelines, gas treatment and hazardous-area monitoring applications.",
    heroEyebrow: "Natural gas moisture",
    title: "Natural gas moisture and dew point monitoring",
    lead: "Moisture analyzers, dew point transmitters and sampling solutions for natural gas, process gas, pipelines and gas treatment systems.",
    primaryButton: "Request a selection",
    secondaryButton: "View instruments",
    overviewEyebrow: "Application overview",
    overviewTitle: "Why moisture control matters in gas systems",
    overviewText: "Moisture and dew point control helps reduce hydrate formation, corrosion, pipeline risk and process instability. Instrument selection depends on pressure, gas composition, hazardous-area requirements and sampling method.",
    rfqTitle: "What to specify in your request",
    rfqPoints: ["Gas composition", "Pressure", "Temperature", "Dew point range", "Installation method", "Hazardous-area requirements", "Output signal", "Certificates and documentation"],
    highlights: [
      { icon: "sensor", title: "Gas dew point", text: "Moisture measurement for natural gas and process gas lines." },
      { icon: "duct", title: "Sampling system", text: "Direct mount, bypass or sample conditioning according to gas conditions." },
      { icon: "signal", title: "Certified monitoring", text: "Outputs and approvals for industrial and hazardous-area systems." }
    ],
    processTitle: "How to choose a gas instrument",
    processCards: [
      { title: "Gas and pressure", text: "Specify gas composition, line pressure and operating temperature." },
      { title: "Measurement range", text: "Define water dew point, hydrocarbon dew point or moisture range." },
      { title: "Installation", text: "Choose direct mount, bypass, sample line or gas conditioning system." },
      { title: "Safety", text: "Confirm ATEX, IECEx, pressure, material and documentation requirements." }
    ],
    solutionsTitle: "Suitable solutions",
    solutionTypes: ["Intrinsically safe dew point transmitters for natural and process gas", "Moisture analyzers for pipelines, gas treatment and compressor stations", "Online dew point monitoring with display, alarms and industrial outputs", "Portable instruments for service checks at multiple measurement points"],
    faqs: [
      { question: "Why measure dew point in natural gas?", answer: "Dew point control helps reduce hydrate formation, condensation, corrosion and operational risk in pipelines and gas treatment systems." },
      { question: "Can the instrument be installed directly in the pipeline?", answer: "Some applications use direct installation, but sampling or conditioning systems are often preferred for stability, filtration and service access." },
      { question: "Which instruments are suitable for hazardous areas?", answer: "Hazardous-area applications require instruments with suitable approvals and construction. The zone classification, pressure, gas and installation conditions should be specified in advance." },
      { question: "What data is needed for model selection?", answer: "Specify gas type, pressure, temperature, dew point range, installation method, output signal, certificate needs and documentation requirements." }
    ],
    ctaTitle: "Select an instrument by parameters",
    ctaText: "Send gas type, pressure, dew point range, installation point and safety requirements. We will help select a suitable model.",
    ctaButton: "Send parameters",
    ctaImageAlt: "Natural gas moisture analyzer selection",
    recommendedSlugs: ["easidew-pro-is", "easidew-pro-xp", "optidew-hz", "easidew-online", "mdm300"]
  },
  {
    slug: "climate-chamber-humidity",
    path: "/applications/climate-chamber-humidity",
    image: "/assets/application-climate-chamber-lab.png",
    heroImage: "/assets/application-climate-chamber-lab.png",
    inlineImage: "assets/application-climate-chamber-inline.png",
    ctaImage: "assets/application-climate-chamber-lab.png",
    metaTitle: "Climate chamber humidity measurement",
    metaDescription: "Humidity and temperature sensors for laboratories, climate chambers, calibration rooms and environmental test systems. Select probes and transmitters for stable monitoring.",
    heroEyebrow: "Laboratories and climate chambers",
    title: "Climate chamber humidity and temperature measurement",
    lead: "Humidity and temperature instruments for laboratories, climate chambers, calibration rooms, environmental testing and clean technical areas.",
    primaryButton: "Request a selection",
    secondaryButton: "View instruments",
    overviewEyebrow: "Application overview",
    overviewTitle: "Humidity measurement in labs and chambers",
    overviewText: "Laboratory and climate chamber applications need stable readings, repeatability and suitable probe placement. The selection depends on chamber size, temperature range, humidity range and data requirements.",
    rfqTitle: "What to specify in your request",
    rfqPoints: ["Chamber or room type", "Temperature range", "Humidity range", "Required accuracy", "Probe location", "Data logging needs", "Calibration requirements", "Quantity"],
    highlights: [
      { icon: "sensor", title: "Stable probes", text: "Humidity and temperature probes for repeatable chamber measurements." },
      { icon: "duct", title: "Lab and chamber use", text: "Selection for test chambers, calibration spaces and controlled rooms." },
      { icon: "signal", title: "Data and calibration", text: "Outputs, logging and calibration support for quality systems." }
    ],
    processTitle: "How to choose a chamber sensor",
    processCards: [
      { title: "Test range", text: "Define temperature and humidity limits for the chamber." },
      { title: "Probe location", text: "Choose placement for representative and stable measurement." },
      { title: "Accuracy", text: "Specify accuracy, stability and calibration interval expectations." },
      { title: "Data", text: "Confirm output, display, logging or system integration needs." }
    ],
    solutionsTitle: "Suitable solutions",
    solutionTypes: ["Humidity and temperature probes for climate chambers", "Transmitters for controlled rooms and laboratory monitoring", "Handheld meters for spot checks and validation", "Calibration-ready sensors for quality and environmental testing"],
    faqs: [
      { question: "Where should a chamber humidity probe be placed?", answer: "The probe should be positioned where it represents the test volume without being affected by direct airflow, walls, heaters or wet surfaces." },
      { question: "Do I need calibration documentation?", answer: "For laboratory, pharmaceutical and quality applications, calibration certificates or traceable documentation are often required." },
      { question: "Can one probe measure temperature and humidity?", answer: "Yes. Many chamber probes measure both relative humidity and temperature, and may also support calculated humidity values." },
      { question: "What data is needed for model selection?", answer: "Specify chamber type, temperature range, humidity range, required accuracy, probe location, output or logging needs and calibration requirements." }
    ],
    ctaTitle: "Need help choosing a chamber sensor?",
    ctaText: "Send chamber type, temperature and humidity range, accuracy target and calibration requirements. We will suggest suitable instruments.",
    ctaButton: "Send parameters",
    ctaImageAlt: "Laboratory climate chamber humidity instrument selection",
    recommendedSlugs: ["hmp3-hmpx", "hc2a-series", "hygroflex1", "hmt310", "hp31-hp32"]
  }
];

export function getApplicationPageContent(slug: string) {
  return applicationPageContent.find((page) => page.slug === slug);
}

