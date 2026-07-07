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

        EMAIL_PROVIDER: "smtp",
        RFQ_TO_EMAIL: "sales@sensemeter.ru",
        RFQ_FROM_EMAIL: "sales@sensemeter.ru",
        RFQ_SENDER_NAME: "SenseMeter Website",
        RFQ_SMTP_HOST: "mail.hosting.reg.ru",
        RFQ_SMTP_PORT: "465",
        RFQ_SMTP_USER: "sales@sensemeter.ru",
        RFQ_SMTP_PASS: "paste-your-mail-app-password-here",

        // Optional: set EMAIL_PROVIDER to "brevo" and add BREVO_API_KEY if switching to Brevo later.
        BREVO_API_KEY: ""
      }
    }
  ]
};
