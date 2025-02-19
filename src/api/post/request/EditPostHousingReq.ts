import { KeyboardHousingFunctionKeyLayoutUnion } from '@/constants/enum/KeyboardHousingFunctionKeyLayout.enum';
import { KeyboardHousingLayoutUnion } from '@/constants/enum/KeyboardHousingLayout.enum';
import { KeyboardHousingMountUnion } from '@/constants/enum/KeyboardHousingMount.enum';
import { KeyboardHousingWindowKeyLayoutUnion } from '@/constants/enum/KeyboardHousingWindowKeyLayout.enum';

export class EditPostHousingReq {
  readonly postId!: number;
  readonly housingName!: string;
  readonly housingColor!: string;
  readonly housingMount!: KeyboardHousingMountUnion;
  readonly housingLayout!: KeyboardHousingLayoutUnion;
  readonly housingWindowKeyLayout!: KeyboardHousingWindowKeyLayoutUnion;
  readonly housingFunctionKeyLayout!: KeyboardHousingFunctionKeyLayoutUnion;
  readonly isHousingReAnodized!: boolean;
}
