import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardHousingReAnodized<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardHousingReAnodized<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardHousingReAnodized('Y', 'Yes');
  static readonly N = new KeyboardHousingReAnodized('N', 'No');

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

export type KeyboardHousingReAnodizedUnion = EnumConstNames<typeof KeyboardHousingReAnodized>;
export const keyboardHousingReAnodizedKeys = KeyboardHousingReAnodized.keys();
export const keyboardHousingReAnodizedValues = KeyboardHousingReAnodized.values();
