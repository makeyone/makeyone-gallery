import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardFoamBottom<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardFoamBottom<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardFoamBottom('Y', 'Yes');
  static readonly N = new KeyboardFoamBottom('N', 'No');

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

export type KeyboardFoamBottomUnion = EnumConstNames<typeof KeyboardFoamBottom>;
export const keyboardFoamBottomKeys = KeyboardFoamBottom.keys();
export const keyboardFoamBottomValues = KeyboardFoamBottom.values();
