import { EditPostFoamRes } from '@/api/post/response/EditPostFoamRes';

export class EditPostFoamViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostFoamRes: EditPostFoamRes): EditPostFoamViewModel {
    return new EditPostFoamViewModel(editPostFoamRes.editedPostId);
  }
}
