import { EditPostHousingRes } from '@/api/post/response/EditPostHousingRes';

export class EditPostHousingViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostHousingRes: EditPostHousingRes): EditPostHousingViewModel {
    return new EditPostHousingViewModel(editPostHousingRes.editedPostId);
  }
}
