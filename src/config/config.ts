import dotenv from 'dotenv';

dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV,
  serviceId: process.env.TWILIO_SERVICE_ID,
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  dbUrl: process.env.DB_URL,
  key: process.env.KEY,
  logLevel: process.env.LOG_LEVEL,
  port: process.env.PORT,
  target: process.env.TARGET,
  jwtSecret: process.env.JWT_SECRET,
  tokenLife: process.env.TOKEN_LIFE,
  service: process.env.SERVICE,
  host: process.env.HOST,
  timezone: process.env.TIMEZONE,
  dataBaseDateTimeFormat: process.env.DATA_BASE_DATE_TIME_FORMAT,
  defaultFrom: process.env.DEFAULT_FROM,
  defaultReplyTo: process.env.DEFAULT_REPLY_TO,
  smtpPort: process.env.SMTP_PORT,
  smtpUserName: process.env.SMTP_USER_NAME,
  smtpPassword: process.env.SMTP_PASSWORD,
  exceptionMail: process.env.EXCEPTION_MAIL,
  adminUrl: process.env.ADMIN_URL
};

export default config;
