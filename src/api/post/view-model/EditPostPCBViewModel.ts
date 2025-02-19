import { EditPostPCBRes } from '@/api/post/response/EditPostPCBRes';

export class EditPostPCBViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostPCBRes: EditPostPCBRes): EditPostPCBViewModel {
    return new EditPostPCBViewModel(editPostPCBRes.editedPostId);
  }
}
