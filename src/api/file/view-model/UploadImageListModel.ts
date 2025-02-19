import { UploadImageListRes } from '@/api/file/response/UploadImageListRes';

export class UploadImageListViewModel {
  constructor(readonly url: string, readonly originalFileName: string, readonly convertFileName: string) {}

  static of(uploadImageListRes: UploadImageListRes): UploadImageListViewModel[] {
    return uploadImageListRes.map(
      (uploadImage) => new UploadImageListViewModel(uploadImage.url, uploadImage.originalFileName, uploadImage.convertFileName),
    );
  }
}
