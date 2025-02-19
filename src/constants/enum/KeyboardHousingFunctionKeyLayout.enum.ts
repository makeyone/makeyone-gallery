import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'F12' | 'F13' | 'None';
type EnumName = 'F12' | 'F13' | '해당없음';
type EnumTypeGeneric = KeyboardHousingFunctionKeyLayout<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardHousingFunctionKeyLayout<
  CodeType extends EnumCode,
  NameType extends EnumName,
> extends EnumType<EnumTypeGeneric>() {
  static readonly F12 = new KeyboardHousingFunctionKeyLayout('F12', 'F12');
  static readonly F13 = new KeyboardHousingFunctionKeyLayout('F13', 'F13');
  static readonly None = new KeyboardHousingFunctionKeyLayout('None', '해당없음');

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

export type KeyboardHousingFunctionKeyLayoutUnion = EnumConstNames<typeof KeyboardHousingFunctionKeyLayout>;
export const keyboardHousingFunctionKeyLayoutKeys = KeyboardHousingFunctionKeyLayout.keys();
export const keyboardHousingFunctionKeyLayoutValues = KeyboardHousingFunctionKeyLayout.values();
