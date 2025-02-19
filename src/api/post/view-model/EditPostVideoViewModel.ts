import { EditPostVideoRes } from '@/api/post/response/EditPostVideoRes';

export class EditPostVideoViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostVideoRes: EditPostVideoRes): EditPostVideoViewModel {
    return new EditPostVideoViewModel(editPostVideoRes.editedPostId);
  }
}
