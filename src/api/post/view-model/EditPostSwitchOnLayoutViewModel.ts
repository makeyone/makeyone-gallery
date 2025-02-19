import { EditPostSwitchOnLayoutRes } from '@/api/post/response/EditPostSwitchOnLayoutRes';

export class EditPostSwitchOnLayoutViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostSwitchOnLayoutRes: EditPostSwitchOnLayoutRes): EditPostSwitchOnLayoutViewModel {
    return new EditPostSwitchOnLayoutViewModel(editPostSwitchOnLayoutRes.editedPostId);
  }
}
