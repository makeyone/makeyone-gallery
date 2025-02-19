import { EditPostSwitchRes } from '@/api/post/response/EditPostSwitchRes';

export class EditPostSwitchViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostSwitchRes: EditPostSwitchRes): EditPostSwitchViewModel {
    return new EditPostSwitchViewModel(editPostSwitchRes.editedPostId);
  }
}
