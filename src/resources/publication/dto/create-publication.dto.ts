import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreatePublicationDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly rating: number;

  @IsNotEmpty()
  readonly ratingCount: number;

  @IsNotEmpty()
  readonly userId: string;

  @IsEmpty()
  readonly image: string;

  @IsNotEmpty()
  readonly categoryId: string;
}
