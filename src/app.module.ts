import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './resources/user/user.controller';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { UserService } from './resources/user/user.service';
import { PrismaService } from './prisma.service';
import { SendMailConsumer } from './jobs/mail/mailer.consumer';
import { SendMailProducerService } from './jobs/mail/mailer.producer.service';
import { PublicationModule } from './resources/publication/publication.module';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { Queue } from 'bull';
import { AppController } from './app.controller';
import { CategoryModule } from './resources/category/category.module';
import { AdminMiddleware } from './middleware/admin.middleware';
import { MailModule } from './resources/mail/mail.module';
import { ImageModule } from './resources/image/image.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    BullModule.registerQueue({
      name: 'sendmail.queue',
    }),

    PublicationModule,
    CategoryModule,
    MailModule,
    ImageModule,
  ],
  controllers: [UserController, AppController],
  providers: [
    PrismaService,
    SendMailProducerService,
    SendMailConsumer,
    UserService,
  ],
})
export class AppModule {
  constructor(@InjectQueue('sendmail.queue') private mailQueue: Queue) {}

  public configure(consumer: MiddlewareConsumer) {
    /*consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'user',
        method: RequestMethod.GET,
      },
      {
        path: 'user',
        method: RequestMethod.PUT,
      },
      '/publication',
    );*/

    consumer.apply(AdminMiddleware).forRoutes('/admin');

    const { router } = createBullBoard([new BullAdapter(this.mailQueue)]);
    consumer.apply(router).forRoutes('/admin/queues');
  }
}
