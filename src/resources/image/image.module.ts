import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ImageService } from './image.service';

@Module({
  controllers: [],
  providers: [ImageService, PrismaService],
  exports: [ImageService],
})
export class ImageModule {}
