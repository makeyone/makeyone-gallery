import FormData from 'form-data';

import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class UploadImagesInput extends FormData {}

export const UploadImagesError = {
  FILE_NOT_FOUND: 'Err Code - 2000\n문제가 지속 될 경우 관리자에게 문의해주세요.',
  UNSUPPORTED_FILE_FORMAT: '지원하지 않는 파일 형식 입니다.\n파일의 형식이 JPG, JPEG, PNG, GIF 인지 확인해주세요.',
} as const;

export class UploadImagesOutput extends CoreOutput<typeof UploadImagesError> {
  uploadedImages?: Array<{
    url: string;
    originalFileName: string;
    convertFileName: string;
  }>;
}
