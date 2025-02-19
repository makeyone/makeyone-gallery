import { KeyboardDefinition } from '@/utils/keyboards/types/types';

export class EditPostKeyboardDefinitionRes {
  readonly editedPostId!: number;
  readonly editedKeyboardDefinition!: {
    readonly id: number;
    readonly definitionName: string;
    readonly keyboardDefinition: KeyboardDefinition;
    readonly layoutOptionKeys: number[];
    readonly partsOnDefinition: object | null;
  };
}
