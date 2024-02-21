import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'PCBMount' | 'PlateMount';
type EnumName = '기판체결' | '보강판체결';
type EnumTypeGeneric = KeyboardStabilizerMount<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardStabilizerMount<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly PCBMount = new KeyboardStabilizerMount('PCBMount', '기판체결');
  static readonly PlateMount = new KeyboardStabilizerMount('PlateMount', '보강판체결');

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

export type KeyboardStabilizerMountUnion = EnumConstNames<typeof KeyboardStabilizerMount>;
export const keyboardStabilizerMountKeys = KeyboardStabilizerMount.keys();
export const keyboardStabilizerMountValues = KeyboardStabilizerMount.values();
