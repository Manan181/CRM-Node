import nodemailer from 'nodemailer';
import path from 'path';
import Log from './logger';
import config from '../config/config';
import * as fs from 'fs';
import { keys } from 'lodash';
import { Json } from '../types/json';

class SendEmail {
  public static sendEmail = async (template: string = null, replaceData: Json = null, emails: string[], subject: string, text: string = null, isPersonalEmail: boolean = false) => {
    try {
      let html = '';
      if (template) {
        // send email for verification
        const templatesDir = path.resolve(`${__dirname}/../`, 'templates');
        const content = `${templatesDir}/${template}.html`;
        html = SendEmail.getHtmlContent(content, replaceData);
      }

      const mailOptions = {
        from: `${config.defaultFrom}`,
        html,
        replyTo: `${config.defaultReplyTo}`,
        subject,
        to: !isPersonalEmail ? emails : [],
        bcc: isPersonalEmail ? emails : [],
        text: text
      };

      const transportObj = {
        host: config.host,
        service: config.service,
        port: Number(config.port),
        secure: true,
        auth: {
          user: config.smtpUserName,
          pass: config.smtpPassword
        }
      };
      const transporter = nodemailer.createTransport(transportObj);

      transporter.sendMail(mailOptions, (mailSendErr: any, info: any) => {
        if (!mailSendErr) {
          SendEmail.logger.info(`Message sent: ${info.response}`);
        } else {
          SendEmail.logger.error(`Error in sending email: ${mailSendErr} and info ${info}`);
        }
      });
    } catch (error) {
      SendEmail.logger.error(error, 'Email not sent');
    }
  };

  private static logger: any = Log.getLogger();

  // Just reading html file and then returns in string
  private static getHtmlContent = (filePath: string, replaceData: any) => {
    const data = fs.readFileSync(filePath);
    let html = data.toString();
    keys(replaceData).forEach((key) => {
      html = html.replace(key, replaceData[key]);
    });
    return html;
  };
}

export default SendEmail;
