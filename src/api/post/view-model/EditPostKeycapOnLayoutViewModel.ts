import { EditPostKeycapOnLayoutRes } from '@/api/post/response/EditPostKeycapOnLayoutRes';

export class EditPostKeycapOnLayoutViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostKeycapOnLayoutRes: EditPostKeycapOnLayoutRes): EditPostKeycapOnLayoutViewModel {
    return new EditPostKeycapOnLayoutViewModel(editPostKeycapOnLayoutRes.editedPostId);
  }
}
