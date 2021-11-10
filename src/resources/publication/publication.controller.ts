import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UploadedFile,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/shared/utils';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

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
  create(
    @Body() createPublicationDto: CreatePublicationDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const dto = {
      ...createPublicationDto,
      image: image.filename,
    };

    return this.publicationService.create(dto);
  }

  @Get()
  async findAll() {
    return this.publicationService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.publicationService.findById({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    return this.publicationService.update({
      data: updatePublicationDto,
      where: {
        id: id,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(id);
  }
}
