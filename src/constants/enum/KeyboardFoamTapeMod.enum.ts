import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardFoamTapeMod<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardFoamTapeMod<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardFoamTapeMod('Y', 'Yes');
  static readonly N = new KeyboardFoamTapeMod('N', 'No');

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

export type KeyboardFoamTapeModUnion = EnumConstNames<typeof KeyboardFoamTapeMod>;
export const keyboardFoamTapeModKeys = KeyboardFoamTapeMod.keys();
export const keyboardFoamTapeModValues = KeyboardFoamTapeMod.values();
