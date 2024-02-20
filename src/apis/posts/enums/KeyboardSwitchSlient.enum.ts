import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardSwitchSlient<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardSwitchSlient<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardSwitchSlient('Y', 'Yes');
  static readonly N = new KeyboardSwitchSlient('N', 'No');

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

export type KeyboardSwitchSlientUnion = EnumConstNames<typeof KeyboardSwitchSlient>;
export const keyboardSwitchSlientKeys = KeyboardSwitchSlient.keys();
export const keyboardSwitchSlientValues = KeyboardSwitchSlient.values();
