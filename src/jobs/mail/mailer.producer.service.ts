import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUserDto } from 'src/resources/user/dto';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('sendmail.queue') private mailQueue: Queue) {}

  async sendMail(data: CreateUserDto) {
    await this.mailQueue.add('sendmail.job', data);
  }
}
