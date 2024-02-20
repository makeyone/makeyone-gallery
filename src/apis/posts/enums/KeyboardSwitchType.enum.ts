import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Linear' | 'Tactile' | 'Clicky' | 'Capacitive';
type EnumName = '리니어' | '택타일' | '클리키' | '무접점';
type EnumTypeGeneric = KeyboardSwitchType<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardSwitchType<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Linear = new KeyboardSwitchType('Linear', '리니어');
  static readonly Tactile = new KeyboardSwitchType('Tactile', '택타일');
  static readonly Clicky = new KeyboardSwitchType('Clicky', '클리키');
  static readonly Capacitive = new KeyboardSwitchType('Capacitive', '무접점');

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

export type KeyboardSwitchTypeUnion = EnumConstNames<typeof KeyboardSwitchType>;
export const keyboardSwitchTypeKeys = KeyboardSwitchType.keys();
export const keyboardSwitchTypeValues = KeyboardSwitchType.values();
