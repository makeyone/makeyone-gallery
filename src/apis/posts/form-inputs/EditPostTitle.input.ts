import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EditPostTitleFormInput {
  @IsNotEmpty({ message: '게시글의 제목을 입력해주세요.' })
  @IsString()
  @MaxLength(200, { message: '게시글 제목은 200자 이하로 입력이 가능합니다.' })
  postTitle!: string;
}
