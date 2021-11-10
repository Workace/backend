import { Injectable } from '@nestjs/common';
import { OAuth2Client } from './oauth/oauth.client';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  constructor(private readonly oauth: OAuth2Client) {}

  async sendMail(mail: Mail.Options) {
    try {
      const accessToken = await this.oauth.getAccessToken();
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAILER_USER,
          accessToken: accessToken,
          clientId: process.env.MAILER_CLIENT_ID,
          clientSecret: process.env.MAILER_CLIENT_SECRET,
          refreshToken: process.env.MAILER_REFRESH_TOKEN,
        },
      } as SMTPTransport.Options);

      await transporter.sendMail(mail);
    } catch (e) {
      console.error(e);
    }
  }
}
