import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'FactoryLube' | 'HandMadeLube' | 'None';
type EnumName = '공장윤활' | '수제윤활' | '순정(윤활 X)';
type EnumTypeGeneric = KeyboardSwitchLube<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardSwitchLube<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly FactoryLube = new KeyboardSwitchLube('FactoryLube', '공장윤활');
  static readonly HandMadeLube = new KeyboardSwitchLube('HandMadeLube', '수제윤활');
  static readonly None = new KeyboardSwitchLube('None', '순정(윤활 X)');

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

export type KeyboardSwitchLubeUnion = EnumConstNames<typeof KeyboardSwitchLube>;
export const keyboardSwitchLubeKeys = KeyboardSwitchLube.keys();
export const keyboardSwitchLubeValues = KeyboardSwitchLube.values();
