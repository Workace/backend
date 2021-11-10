import { Prisma } from '.prisma/client';
import { HttpException, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { PrismaService } from 'src/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPublicationDto: CreatePublicationDto) {
    const publicationNotUnique = await this.prisma.publication.findFirst({
      where: {
        name: createPublicationDto.name,
      },
    });

    if (publicationNotUnique) {
      throw new HttpException('Publication already exists', 409);
    }

    const errors = await validate(createPublicationDto);

    if (errors.length > 0) {
      throw new HttpException(
        `Validation failed: ${JSON.stringify(errors)}`,
        400,
      );
    }

    const data = {
      name: createPublicationDto.name,
      description: createPublicationDto.description,
      price: Number(createPublicationDto.price),
      rating: Number(createPublicationDto.rating),
      ratingCount: Number(createPublicationDto.ratingCount),
    };

    return await this.prisma.publication.create({
      data: {
        ...data,
        user: {
          connect: {
            id: createPublicationDto.userId,
          },
        },
        image: {
          create: {
            path: createPublicationDto.image,
          },
        },
        category: {
          connect: {
            id: createPublicationDto.categoryId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.publication.findMany();
  }

  async findById(params: { id: string }) {
    const { id } = params;

    return await this.prisma.publication.findUnique({
      where: {
        id,
      },
    });
  }

  async update(params: {
    data: Prisma.PublicationUpdateInput;
    where: Prisma.PublicationWhereUniqueInput;
  }) {
    const { data, where } = params;

    return await this.prisma.publication.update({
      where: {
        id: where.id,
      },
      data: {
        ...data,
      },
    })
  }

  async remove(id: string) {
    return await this.prisma.publication.delete({
      where: {
        id,
      },
    });
  }
}
