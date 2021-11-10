import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, PrismaService],
  exports: [PublicationService],
})
export class PublicationModule {}
