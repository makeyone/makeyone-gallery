import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Normal' | 'LongPole';
type EnumName = '일반' | '롱폴';
type EnumTypeGeneric = KeyboardStabilizerType<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardStabilizerType<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Normal = new KeyboardStabilizerType('Normal', '일반');
  static readonly LongPole = new KeyboardStabilizerType('LongPole', '롱폴');

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

export type KeyboardStabilizerTypeUnion = EnumConstNames<typeof KeyboardStabilizerType>;
export const keyboardStabilizerTypeKeys = KeyboardStabilizerType.keys();
export const keyboardStabilizerTypeValues = KeyboardStabilizerType.values();
