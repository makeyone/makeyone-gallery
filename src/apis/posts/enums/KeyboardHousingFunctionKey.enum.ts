import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'F12' | 'F13' | 'None';
type EnumName = 'F12' | 'F13' | '없음';
type EnumTypeGeneric = KeyboardHousingFunctionKey<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardHousingFunctionKey<
  CodeType extends EnumCode,
  NameType extends EnumName,
> extends EnumType<EnumTypeGeneric>() {
  static readonly None = new KeyboardHousingFunctionKey('None', '없음');
  static readonly F12 = new KeyboardHousingFunctionKey('F12', 'F12');
  static readonly F13 = new KeyboardHousingFunctionKey('F13', 'F13');

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

export type KeyboardHousingFunctionKeyUnion = EnumConstNames<typeof KeyboardHousingFunctionKey>;
export const keyboardHousingFunctionKeyKeys = KeyboardHousingFunctionKey.keys();
export const keyboardHousingFunctionKeyValues = KeyboardHousingFunctionKey.values();
