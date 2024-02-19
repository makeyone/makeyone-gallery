import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class EditPostTitleInput {
  postId!: number;

  postTitle!: string;
}

export const EditPostTitleError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
} as const;

export class EditPostTitleOutput extends CoreOutput<typeof EditPostTitleError> {
  editedPostId?: number;
}
