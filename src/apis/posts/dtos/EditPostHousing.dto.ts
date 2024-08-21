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

type EditPostHousingRes = {
  editedPostId: number;
};
export class EditPostHousingOutput extends CoreOutput<EditPostHousingRes> {}
