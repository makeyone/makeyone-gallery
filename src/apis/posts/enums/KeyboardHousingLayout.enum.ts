import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode =
  | 'ArrayFull'
  | 'ArrayTKL'
  | 'Array1800'
  | 'Array100'
  | 'Array98'
  | 'Array75'
  | 'Array70'
  | 'Array65'
  | 'Array60'
  | 'Array40'
  | 'ArrayErgoTKL'
  | 'ArrayErgoAlice'
  | 'ArrayErgoArisu'
  | 'ArrayHHKB'
  | 'ArrayCP'
  | 'ArrayOrthoLinear';
type EnumName =
  | '풀배열'
  | '텐키리스'
  | '1800배열'
  | '100배열'
  | '98배열'
  | '75배열'
  | '70배열'
  | '65배열'
  | '60배열'
  | '40배열'
  | '어고 텐키리스'
  | '어고 앨리스'
  | '어고 아리수'
  | '해피해킹'
  | 'CP배열'
  | '오쏘 리니어';
type EnumTypeGeneric = KeyboardHousingLayout<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardHousingLayout<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly ArrayFull = new KeyboardHousingLayout('ArrayFull', '풀배열');
  static readonly ArrayTKL = new KeyboardHousingLayout('ArrayTKL', '텐키리스');
  static readonly Array1800 = new KeyboardHousingLayout('Array1800', '1800배열');
  static readonly Array100 = new KeyboardHousingLayout('Array100', '100배열');
  static readonly Array98 = new KeyboardHousingLayout('Array98', '98배열');
  static readonly Array75 = new KeyboardHousingLayout('Array75', '75배열');
  static readonly Array70 = new KeyboardHousingLayout('Array70', '70배열');
  static readonly Array65 = new KeyboardHousingLayout('Array65', '65배열');
  static readonly Array60 = new KeyboardHousingLayout('Array60', '60배열');
  static readonly Array40 = new KeyboardHousingLayout('Array40', '40배열');
  static readonly ArrayErgoTKL = new KeyboardHousingLayout('ArrayErgoTKL', '어고 텐키리스');
  static readonly ArrayErgoAlice = new KeyboardHousingLayout('ArrayErgoAlice', '어고 앨리스');
  static readonly ArrayErgoArisu = new KeyboardHousingLayout('ArrayErgoArisu', '어고 아리수');
  static readonly ArrayHHKB = new KeyboardHousingLayout('ArrayHHKB', '해피해킹');
  static readonly ArrayCP = new KeyboardHousingLayout('ArrayCP', 'CP배열');
  static readonly ArrayOrthoLinear = new KeyboardHousingLayout('ArrayOrthoLinear', '오쏘 리니어');

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

export type KeyboardHousingLayoutUnion = EnumConstNames<typeof KeyboardHousingLayout>;
export const keyboardHousingLayoutKeys = KeyboardHousingLayout.keys();
export const keyboardHousingLayoutValues = KeyboardHousingLayout.values();
