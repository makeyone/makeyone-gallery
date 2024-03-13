import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class EditPostVideoInput {
  postId!: number;

  youtubeVideoUrl!: string;
}

export const EditPostVideoError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
  INVALID_YOUTUBE_VIDEO_URL: '유효하지 않는 유튜브 비디오 입니다.',
} as const;

export class EditPostVideoOutput extends CoreOutput<typeof EditPostVideoError> {
  editedPostId?: number;
}
