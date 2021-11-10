import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class OAuth2Client {
  private oAuth2Client: any;

  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.MAILER_CLIENT_ID,
      process.env.MAILER_CLIENT_SECRET,
      process.env.MAILER_REDIRECT_URI,
    );

    this.oAuth2Client.setCredentials({
      refresh_token: process.env.MAILER_REFRESH_TOKEN,
    });
  }

  async getAccessToken() {
    return await new Promise((resolve, reject) => {
      this.oAuth2Client.getAccessToken((err: any, token: any) => {
        if (err) {
          console.error(err);
          reject();
        }
        resolve(token);
      });
    });
  }
}
