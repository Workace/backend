import { extname } from 'path';

const editFileName = (originalname: string, cb: any) => {
  const name = originalname.split('.')[0];
  const fileExtName = extname(originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  return cb(null, `${name}-${randomName}${fileExtName}`);
};

export { editFileName };
