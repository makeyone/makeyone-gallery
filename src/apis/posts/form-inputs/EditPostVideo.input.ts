import { IsOptional, IsString, MaxLength, Validate } from 'class-validator';

import { YoutubeVideoUrlValidator } from '@/apis/common/validators/youtube-video-url.validator';

export class EditPostVideoFormInput {
  @IsOptional()
  @IsString()
  @MaxLength(3000, { message: '유튜브 영상의 URL은 3000자 이하로 입력이 가능합니다.' })
  @Validate(YoutubeVideoUrlValidator)
  youtubeVideoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특이사항은 300자 이하로 입력이 가능합니다.' })
  remark?: string;
}
