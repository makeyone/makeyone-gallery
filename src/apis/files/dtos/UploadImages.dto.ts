import FormData from 'form-data';

import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class UploadImagesInput extends FormData {}

type UploadImageRes = {
  url: string;
  originalFileName: string;
  convertFileName: string;
};
export class UploadImagesOutput extends CoreOutput<UploadImageRes[]> {}
