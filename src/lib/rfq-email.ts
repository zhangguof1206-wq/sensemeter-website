import nodemailer from "nodemailer";

type RfqFields = Record<string, string>;
type EmailProvider = "smtp" | "brevo";

export const rfqFieldOrder = [
  "Email",
  "Name",
  "Company",
  "Country / City",
  "Phone / WhatsApp / Telegram",
  "Product Model",
  "Quantity",
  "Application",
  "Message",
  "Personal Data Consent"
];

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function readRfqFields(body: string) {
  const params = new URLSearchParams(body);
  return Object.fromEntries(rfqFieldOrder.map((field) => [field, params.get(field)?.trim() || ""]));
}

function buildText(fields: Record<string, string>) {
  return rfqFieldOrder.map((field) => `${field}: ${fields[field] || "-"}`).join("\n");
}

function buildHtml(fields: Record<string, string>) {
  const rows = rfqFieldOrder
    .map(
      (field) =>
        `<tr><th align="left" style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(field)}</th><td style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(fields[field] || "-").replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#17202a">
      <h2>New SenseMeter RFQ</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:760px">
        ${rows}
      </table>
    </div>
  `;
}

function getSubjectDetail(fields: RfqFields) {
  const model = fields["Product Model"];
  const company = fields.Company;
  return model || company || fields.Email;
}

function getEmailProvider(): EmailProvider {
  return env("EMAIL_PROVIDER").toLowerCase() === "brevo" ? "brevo" : "smtp";
}

async function sendViaSmtp(fields: RfqFields) {
  const host = env("RFQ_SMTP_HOST");
  const port = Number(env("RFQ_SMTP_PORT") || "465");
  const user = env("RFQ_SMTP_USER");
  const pass = env("RFQ_SMTP_PASS");
  const to = env("RFQ_TO_EMAIL") || "sales@sensemeter.ru";
  const from = env("RFQ_FROM_EMAIL") || user;

  if (!host || !user || !pass || !from) {
    return { ok: false as const, status: 503, error: "email_not_configured" };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000
  });

  await transporter.sendMail({
    from: `"SenseMeter Website" <${from}>`,
    to,
    replyTo: fields.Email,
    subject: `SenseMeter RFQ - ${getSubjectDetail(fields)}`,
    text: buildText(fields),
    html: buildHtml(fields)
  });
}

async function sendViaBrevo(fields: RfqFields) {
  const apiKey = env("BREVO_API_KEY");
  const to = env("RFQ_TO_EMAIL") || "sales@sensemeter.ru";
  const from = env("RFQ_FROM_EMAIL") || "sales@sensemeter.ru";
  const senderName = env("RFQ_SENDER_NAME") || "SenseMeter Website";

  if (!apiKey || !to || !from) {
    return { ok: false as const, status: 503, error: "email_not_configured" };
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      sender: { name: senderName, email: from },
      to: [{ email: to }],
      replyTo: { email: fields.Email },
      subject: `SenseMeter RFQ - ${getSubjectDetail(fields)}`,
      textContent: buildText(fields),
      htmlContent: buildHtml(fields)
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Brevo email delivery failed: ${response.status} ${errorText}`);
  }

  return { ok: true as const };
}

export async function sendRfqEmail(body: string) {
  const fields = readRfqFields(body);
  const email = fields.Email;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, status: 400, error: "email_required" };
  }

  const provider = getEmailProvider();

  if (provider === "brevo") {
    return sendViaBrevo(fields);
  }

  await sendViaSmtp(fields);

  return { ok: true as const };
}
