import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardPlateFlexCut<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardPlateFlexCut<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardPlateFlexCut('Y', 'Yes');
  static readonly N = new KeyboardPlateFlexCut('N', 'No');

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

export type KeyboardPlateFlexCutUnion = EnumConstNames<typeof KeyboardPlateFlexCut>;
export const keyboardPlateFlexCutKeys = KeyboardPlateFlexCut.keys();
export const keyboardPlateFlexCutValues = KeyboardPlateFlexCut.values();
