import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardPCBFlexCut<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardPCBFlexCut<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardPCBFlexCut('Y', 'Yes');
  static readonly N = new KeyboardPCBFlexCut('N', 'No');

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

export type KeyboardPCBFlexCutUnion = EnumConstNames<typeof KeyboardPCBFlexCut>;
export const keyboardPCBFlexCutKeys = KeyboardPCBFlexCut.keys();
export const keyboardPCBFlexCutValues = KeyboardPCBFlexCut.values();
