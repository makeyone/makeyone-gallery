import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrEditPostInput {
  @IsNotEmpty()
  @IsString()
  @Length(1, 200, { message: '게시글 제목을 입력해주세요.' })
  postTitle!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 200, { message: '하우징 이름을 입력해주세요.' })
  housingName!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 200, { message: '하우징 레이아웃을 입력해주세요.' })
  housingLayout!: string;
}
