import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardPCBRgb<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardPCBRgb<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardPCBRgb('Y', 'Yes');
  static readonly N = new KeyboardPCBRgb('N', 'No');

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

export type KeyboardPCBRgbUnion = EnumConstNames<typeof KeyboardPCBRgb>;
export const keyboardPCBRgbKeys = KeyboardPCBRgb.keys();
export const keyboardPCBRgbValues = KeyboardPCBRgb.values();
