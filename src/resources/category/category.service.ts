import { HttpException, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryNotUnique = await this.prisma.category.findFirst({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (categoryNotUnique) {
      throw new HttpException('Category already exists', 409);
    }

    const errors = await validate(createCategoryDto);

    if (errors.length > 0) {
      throw new HttpException(
        `Validation failed: ${JSON.stringify(errors)}`,
        400,
      );
    }

    return await this.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findById(params: { id: string }) {
    const { id } = params;
    return await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(params: { id: string }) {
    const { id } = params;
    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
