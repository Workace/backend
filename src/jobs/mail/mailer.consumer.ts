import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from 'src/resources/mail/mail.service';
import { CreateUserDto } from 'src/resources/user/dto';

@Processor('sendmail.queue')
export class SendMailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process('sendmail.job')
  async process(job: Job<CreateUserDto>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: 'Equipe WorkAce <>',
      subject: 'Welcome to our app',
      html: '<h1>Welcome to our app</h1>',
    });
  }
}
