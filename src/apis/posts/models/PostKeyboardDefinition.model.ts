import { KeyboardDefinition } from '@/utils/keyboards/types/types';

export class PostKeyboardDefinitionModel {
  id!: number;

  definitionName!: string;

  keyboardDefinition!: KeyboardDefinition;

  layoutOptionKeys!: number[];

  partsOnDefinition!: object | null;
}
