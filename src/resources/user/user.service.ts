import { Prisma, User } from '.prisma/client';
import { HttpException, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const { name, email, password, image } = dto;

    const userNotUnique = await this.findByEmail({ email });

    if (userNotUnique) {
      throw new HttpException('User already exists', 409);
    }

    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new HttpException({ message: JSON.stringify(errors) }, 400);
    }

    const hashedPassword = await argon2.hash(password);

    const data = {
      name,
      email,
      password: hashedPassword,
    };

    return await this.prisma.user.create({
      data: {
        ...data,
        image: {
          create: {
            path: image,
          },
        },
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findById(params: { id: string }): Promise<User> {
    const { id } = params;
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(params: { email: string }): Promise<User> {
    const { email } = params;
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async update(params: {
    data: Prisma.UserUpdateInput;
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    const { data, where } = params;
    return await this.prisma.user.update({ data, where });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.delete({ where });
  }

  generateToken(user: User): string {
    const expiresIn = '1h';
    const secret = process.env.JWT_SECRET;
    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return jwt.sign(data, secret, { expiresIn });
  }
}
