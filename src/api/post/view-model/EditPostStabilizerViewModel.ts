import { EditPostStabilizerRes } from '@/api/post/response/EditPostStabilizerRes';

export class EditPostStabilizerViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostStabilizerRes: EditPostStabilizerRes): EditPostStabilizerViewModel {
    return new EditPostStabilizerViewModel(editPostStabilizerRes.editedPostId);
  }
}
