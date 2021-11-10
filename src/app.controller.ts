import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImageService } from './resources/image/image.service';

@Controller()
export class AppController {
  constructor(private readonly imageService: ImageService) {}

  @Get('res/:imgpath')
  async seeUploadedFile(@Param('imgpath') id, @Res() res) {
    const image = await this.imageService.findById(id);
    return res.sendFile(image.path, { root: './uploads' });
  }
}
