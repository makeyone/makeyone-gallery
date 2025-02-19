import { EditPostContentRes } from '@/api/post/response/EditPostContentRes';

export class EditPostContentViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostContentRes: EditPostContentRes): EditPostContentViewModel {
    return new EditPostContentViewModel(editPostContentRes.editedPostId);
  }
}
