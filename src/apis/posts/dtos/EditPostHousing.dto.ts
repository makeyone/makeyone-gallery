import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { KeyboardHousingFunctionKeyLayoutUnion } from '@/apis/posts/enums/KeyboardHousingFunctionKeyLayout.enum';
import { KeyboardHousingLayoutUnion } from '@/apis/posts/enums/KeyboardHousingLayout.enum';
import { KeyboardHousingMountUnion } from '@/apis/posts/enums/KeyboardHousingMount.enum';
import { KeyboardHousingWindowKeyLayoutUnion } from '@/apis/posts/enums/KeyboardHousingWindowKeyLayout.enum';

export class EditPostHousingInput {
  postId!: number;

  housingName!: string;

  housingColor!: string;

  housingMount!: KeyboardHousingMountUnion;

  housingLayout!: KeyboardHousingLayoutUnion;

  housingWindowKeyLayout!: KeyboardHousingWindowKeyLayoutUnion;

  housingFunctionKeyLayout!: KeyboardHousingFunctionKeyLayoutUnion;

  isHousingReAnodized!: boolean;
}

export const EditPostHousingError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
} as const;

export class EditPostHousingOutput extends CoreOutput<typeof EditPostHousingError> {
  editedPostId?: number;
}
