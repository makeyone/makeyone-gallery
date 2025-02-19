import { EditPostTitleRes } from '@/api/post/response/EditPostTitleRes';

export class EditPostTitleViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostTitleRes: EditPostTitleRes): EditPostTitleViewModel {
    return new EditPostTitleViewModel(editPostTitleRes.editedPostId);
  }
}
