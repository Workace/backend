import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { OAuth2Client } from './oauth/oauth.client';

@Module({
  controllers: [],
  providers: [OAuth2Client, MailService],
  exports: [MailService],
})
export class MailModule {}
