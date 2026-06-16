import nodemailer from "nodemailer";

const fieldOrder = [
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

function readFields(body: string) {
  const params = new URLSearchParams(body);
  return Object.fromEntries(fieldOrder.map((field) => [field, params.get(field)?.trim() || ""]));
}

function buildText(fields: Record<string, string>) {
  return fieldOrder.map((field) => `${field}: ${fields[field] || "-"}`).join("\n");
}

function buildHtml(fields: Record<string, string>) {
  const rows = fieldOrder
    .map(
      (field) =>
        `<tr><th align="left" style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(field)}</th><td style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(fields[field] || "-").replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#17202a">
      <h2>New Sense RFQ</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:760px">
        ${rows}
      </table>
    </div>
  `;
}

export default async (request: Request) => {
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
  }

  const fields = readFields(await request.text());
  const email = fields.Email;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "email_required" }, { status: 400 });
  }

  const host = env("RFQ_SMTP_HOST");
  const port = Number(env("RFQ_SMTP_PORT") || "465");
  const user = env("RFQ_SMTP_USER");
  const pass = env("RFQ_SMTP_PASS");
  const to = env("RFQ_TO_EMAIL") || "zhangguof1206@gmail.com";
  const from = env("RFQ_FROM_EMAIL") || user;

  if (!host || !user || !pass || !from) {
    return Response.json({ ok: false, error: "email_not_configured" }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  const model = fields["Product Model"];
  const company = fields.Company;
  const subjectDetail = model || company || email;

  await transporter.sendMail({
    from: `"Sense Website" <${from}>`,
    to,
    replyTo: email,
    subject: `Sense RFQ - ${subjectDetail}`,
    text: buildText(fields),
    html: buildHtml(fields)
  });

  return Response.json({ ok: true });
};

export const config = {
  path: "/api/rfq-email",
  method: ["POST"]
};
