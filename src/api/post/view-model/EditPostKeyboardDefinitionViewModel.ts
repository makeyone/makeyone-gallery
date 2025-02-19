import { EditPostKeyboardDefinitionRes } from '@/api/post/response/EditPostKeyboardDefinitionRes';

import { KeyboardDefinition } from '@/utils/keyboards/types/types';

export class EditPostKeyboardDefinitionViewModel {
  constructor(
    readonly editedPostId: number,
    readonly editedKeyboardDefinition: {
      readonly id: number;
      readonly definitionName: string;
      readonly keyboardDefinition: KeyboardDefinition;
      readonly layoutOptionKeys: number[];
      readonly partsOnDefinition: object | null;
    },
  ) {}

  static of(editPostKeyboardDefinitionRes: EditPostKeyboardDefinitionRes): EditPostKeyboardDefinitionViewModel {
    return new EditPostKeyboardDefinitionViewModel(editPostKeyboardDefinitionRes.editedPostId, {
      id: editPostKeyboardDefinitionRes.editedKeyboardDefinition.id,
      definitionName: editPostKeyboardDefinitionRes.editedKeyboardDefinition.definitionName,
      keyboardDefinition: editPostKeyboardDefinitionRes.editedKeyboardDefinition.keyboardDefinition,
      layoutOptionKeys: editPostKeyboardDefinitionRes.editedKeyboardDefinition.layoutOptionKeys,
      partsOnDefinition: editPostKeyboardDefinitionRes.editedKeyboardDefinition.partsOnDefinition,
    });
  }
}
