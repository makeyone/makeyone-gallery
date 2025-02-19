import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';

export class EditPostKeyboardDefinitionReq {
  readonly postId!: number;
  readonly keyboardDefinition!: VIADefinitionV2 | VIADefinitionV3;
  readonly layoutOptionKeys?: number[];
}
