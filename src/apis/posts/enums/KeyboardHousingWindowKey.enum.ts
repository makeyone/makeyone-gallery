import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'WK' | 'WKL' | 'None';
type EnumName = '윈키' | '윈키리스' | '없음';
type EnumTypeGeneric = KeyboardHousingWindowKey<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardHousingWindowKey<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly None = new KeyboardHousingWindowKey('None', '없음');
  static readonly WK = new KeyboardHousingWindowKey('WK', '윈키');
  static readonly WKL = new KeyboardHousingWindowKey('WKL', '윈키리스');

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

export type KeyboardHousingWindowKeyUnion = EnumConstNames<typeof KeyboardHousingWindowKey>;
export const keyboardHousingWindowKeyKeys = KeyboardHousingWindowKey.keys();
export const keyboardHousingWindowKeyValues = KeyboardHousingWindowKey.values();
