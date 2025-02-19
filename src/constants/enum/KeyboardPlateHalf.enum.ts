import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardPlateHalf<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardPlateHalf<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardPlateHalf('Y', 'Yes');
  static readonly N = new KeyboardPlateHalf('N', 'No');

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

export type KeyboardPlateHalfUnion = EnumConstNames<typeof KeyboardPlateHalf>;
export const keyboardPlateHalfKeys = KeyboardPlateHalf.keys();
export const keyboardPlateHalfValues = KeyboardPlateHalf.values();
