import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { UserService } from 'src/resources/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, _: any, next: () => void) {
    const authHeaders = req.headers.authorization;

    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

      const user = await this.userService.findById(decoded.id);

      if (!user) {
        throw new HttpException('Unauthorized', 401);
      }

      req.user = user;
      next();
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
