import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Cherry' | 'SA' | 'OEM' | 'XDA' | 'DSA' | 'MT3' | 'KAT' | 'Artisan' | 'ETC';
type EnumName = 'Cherry (GMK)' | 'SA' | 'OEM' | 'XDA' | 'DSA' | 'MT3' | 'KAT' | '아티산키캡' | '특정할 수 없는 프로파일';
type EnumTypeGeneric = KeyboardKeycapProfile<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardKeycapProfile<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Cherry = new KeyboardKeycapProfile('Cherry', 'Cherry (GMK)');
  static readonly SA = new KeyboardKeycapProfile('SA', 'SA');
  static readonly OEM = new KeyboardKeycapProfile('OEM', 'OEM');
  static readonly XDA = new KeyboardKeycapProfile('XDA', 'XDA');
  static readonly DSA = new KeyboardKeycapProfile('DSA', 'DSA');
  static readonly MT3 = new KeyboardKeycapProfile('MT3', 'MT3');
  static readonly KAT = new KeyboardKeycapProfile('KAT', 'KAT');
  static readonly Artisan = new KeyboardKeycapProfile('Artisan', '아티산키캡');
  static readonly ETC = new KeyboardKeycapProfile('ETC', '특정할 수 없는 프로파일');

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

export type KeyboardKeycapProfileUnion = EnumConstNames<typeof KeyboardKeycapProfile>;
export const keyboardKeycapProfileKeys = KeyboardKeycapProfile.keys();
export const keyboardKeycapProfileValues = KeyboardKeycapProfile.values();
