import { EditPostKeycapRes } from '@/api/post/response/EditPostKeycapRes';

export class EditPostKeycapViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostKeycapRes: EditPostKeycapRes): EditPostKeycapViewModel {
    return new EditPostKeycapViewModel(editPostKeycapRes.editedPostId);
  }
}
