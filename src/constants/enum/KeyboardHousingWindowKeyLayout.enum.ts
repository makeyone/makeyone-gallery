import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'WK' | 'WKL' | 'CWKL' | 'HHKB' | 'None';
type EnumName = '윈키' | '윈키리스' | 'C윈키리스' | 'HHKB' | '없음';
type EnumTypeGeneric = KeyboardHousingWindowKeyLayout<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardHousingWindowKeyLayout<
  CodeType extends EnumCode,
  NameType extends EnumName,
> extends EnumType<EnumTypeGeneric>() {
  static readonly None = new KeyboardHousingWindowKeyLayout('None', '없음');
  static readonly WK = new KeyboardHousingWindowKeyLayout('WK', '윈키');
  static readonly CWKL = new KeyboardHousingWindowKeyLayout('CWKL', 'C윈키리스');
  static readonly WKL = new KeyboardHousingWindowKeyLayout('WKL', '윈키리스');
  static readonly HHKB = new KeyboardHousingWindowKeyLayout('HHKB', 'HHKB');

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

export type KeyboardHousingWindowKeyLayoutUnion = EnumConstNames<typeof KeyboardHousingWindowKeyLayout>;
export const keyboardHousingWindowKeyLayoutKeys = KeyboardHousingWindowKeyLayout.keys();
export const keyboardHousingWindowKeyLayoutValues = KeyboardHousingWindowKeyLayout.values();
