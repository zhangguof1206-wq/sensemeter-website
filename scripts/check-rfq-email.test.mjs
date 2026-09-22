import assert from "node:assert/strict";
import test from "node:test";

const emailEnvironmentKeys = [
  "EMAIL_PROVIDER",
  "RFQ_SMTP_HOST",
  "RFQ_SMTP_PORT",
  "RFQ_SMTP_USER",
  "RFQ_SMTP_PASS",
  "RFQ_FROM_EMAIL",
  "BREVO_API_KEY"
];

test("returns email_not_configured when SMTP credentials are missing", async () => {
  const originalEnvironment = Object.fromEntries(emailEnvironmentKeys.map((key) => [key, process.env[key]]));

  try {
    for (const key of emailEnvironmentKeys) {
      delete process.env[key];
    }

    const { sendRfqEmail } = await import("../src/lib/rfq-email.ts");
    const result = await sendRfqEmail("Email=test%40example.com");

    assert.deepEqual(result, {
      ok: false,
      status: 503,
      error: "email_not_configured"
    });
  } finally {
    for (const [key, value] of Object.entries(originalEnvironment)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
});

test("reads the selected contact method and contact details", async () => {
  const { readRfqFields } = await import("../src/lib/rfq-email.ts");
  const fields = readRfqFields(
    "Email=test%40example.com&Contact+Method=WhatsApp&Contact+Details=%2B7+999+000+00+00"
  );

  assert.equal(fields["Contact Method"], "WhatsApp");
  assert.equal(fields["Contact Details"], "+7 999 000 00 00");
});

test("maps the legacy combined contact field into contact details", async () => {
  const { readRfqFields } = await import("../src/lib/rfq-email.ts");
  const fields = readRfqFields(
    "Email=test%40example.com&Phone+%2F+WhatsApp+%2F+Telegram=%40legacy_contact"
  );

  assert.equal(fields["Contact Method"], "");
  assert.equal(fields["Contact Details"], "@legacy_contact");
});
