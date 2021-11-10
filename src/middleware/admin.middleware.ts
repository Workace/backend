import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  async use(req: any, _: any, next: () => void) {
    const authHeaders = req.headers.authorization;

    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];

      if (token !== process.env.ADMIN_TOKEN) {
        throw new HttpException('Forbidden', 403);
      }

      next();
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
