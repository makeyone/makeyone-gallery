import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';

export class PostKeyboardLayoutModel {
  id!: number;

  layoutName!: string;

  keyboardLayout!: VIADefinitionV2 | VIADefinitionV3;

  layoutOptions!: number[];

  partsOnLayout!: object | null;
}
