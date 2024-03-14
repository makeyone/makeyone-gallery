import { IsOptional, IsString } from 'class-validator';

export class EditPostContentFormInput {
  @IsOptional()
  @IsString()
  postContent?: string;
}
