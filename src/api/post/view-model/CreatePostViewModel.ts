import { CreatePostRes } from '@/api/post/response/CreatePostRes';

export class CreatePostViewModel {
  constructor(readonly createdPostId: number) {}

  static of(createPostRes: CreatePostRes): CreatePostViewModel {
    return new CreatePostViewModel(createPostRes.createdPostId);
  }
}
