import { EditPostSettingRes } from '@/api/post/response/EditPostSettingRes';

export class EditPostSettingViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostSettingRes: EditPostSettingRes): EditPostSettingViewModel {
    return new EditPostSettingViewModel(editPostSettingRes.editedPostId);
  }
}
