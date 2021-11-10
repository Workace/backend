import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SendMailProducerService } from 'src/jobs/mail/mailer.producer.service';
import { editFileName } from 'src/shared/utils';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: SendMailProducerService,
  ) {}

  @Get()
  async getUsers() {
    return this.userService.findAll({});
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => editFileName(file.originalname, cb),
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  async create(
    @Body() data: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const { name, email, password } = data;

    const userDto = {
      name,
      email,
      password,
      image: image.filename,
    } as CreateUserDto;

    const user = await this.userService.create(userDto);

    this.mailService.sendMail(userDto);

    return user;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findById({ id });
  }

  @Put(':id')
  async updateUser(
    @Body()
    userData: {
      name?: string;
      email?: string;
      password?: string;
    },
    @Param('id') id: string,
  ) {
    return this.userService.update({
      where: {
        id: id,
      },
      data: userData,
    });
  }
}
