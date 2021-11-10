import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.image.findUnique({
      where: {
        id,
      },
    });
  }
}
