import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardPlateUsed<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardPlateUsed<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardPlateUsed('Y', 'Yes');
  static readonly N = new KeyboardPlateUsed('N', 'No');

  private constructor(readonly _code: CodeType, readonly _name: NameType) {
    super();
  }

  get code(): CodeType {
    return this._code;
  }

  get name(): NameType {
    return this._name;
  }
}

export type KeyboardPlateUsedUnion = EnumConstNames<typeof KeyboardPlateUsed>;
export const keyboardPlateUsedKeys = KeyboardPlateUsed.keys();
export const keyboardPlateUsedValues = KeyboardPlateUsed.values();
