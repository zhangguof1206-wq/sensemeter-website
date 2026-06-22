module.exports = {
  apps: [
    {
      name: "sensemeter-website",
      script: "npm",
      args: "start -- -p 3000",
      cwd: "/var/www/sensemeter-website",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_SITE_URL: "https://sensemeter.ru",

        EMAIL_PROVIDER: "brevo",
        BREVO_API_KEY: "paste-your-brevo-api-key-here",
        RFQ_TO_EMAIL: "sales@sensemeter.ru",
        RFQ_FROM_EMAIL: "sales@sensemeter.ru",
        RFQ_SENDER_NAME: "SenseMeter Website",

        // Keep these for switching back to SMTP later.
        RFQ_SMTP_HOST: "smtp-smtp.mail.ru",
        RFQ_SMTP_PORT: "465",
        RFQ_SMTP_USER: "sales@sensemeter.ru",
        RFQ_SMTP_PASS: "paste-your-mail-app-password-here"
      }
    }
  ]
};
