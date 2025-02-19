import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardFoamPlateBetweenPCB<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardFoamPlateBetweenPCB<
  CodeType extends EnumCode,
  NameType extends EnumName,
> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardFoamPlateBetweenPCB('Y', 'Yes');
  static readonly N = new KeyboardFoamPlateBetweenPCB('N', 'No');

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

export type KeyboardFoamPlateBetweenPCBUnion = EnumConstNames<typeof KeyboardFoamPlateBetweenPCB>;
export const keyboardFoamPlateBetweenPCBKeys = KeyboardFoamPlateBetweenPCB.keys();
export const keyboardFoamPlateBetweenPCBValues = KeyboardFoamPlateBetweenPCB.values();
