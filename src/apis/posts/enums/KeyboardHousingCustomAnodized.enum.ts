import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardHousingCustomAnodized<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardHousingCustomAnodized<
  CodeType extends EnumCode,
  NameType extends EnumName,
> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardHousingCustomAnodized('Y', 'Yes');
  static readonly N = new KeyboardHousingCustomAnodized('N', 'No');

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

export type KeyboardHousingCustomAnodizedUnion = EnumConstNames<typeof KeyboardHousingCustomAnodized>;
export const keyboardHousingCustomAnodizedKeys = KeyboardHousingCustomAnodized.keys();
export const keyboardHousingCustomAnodizedValues = KeyboardHousingCustomAnodized.values();
