import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Y' | 'N';
type EnumName = 'Yes' | 'No';
type EnumTypeGeneric = KeyboardFoamBottomSwitchPE<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardFoamBottomSwitchPE<
  CodeType extends EnumCode,
  NameType extends EnumName,
> extends EnumType<EnumTypeGeneric>() {
  static readonly Y = new KeyboardFoamBottomSwitchPE('Y', 'Yes');
  static readonly N = new KeyboardFoamBottomSwitchPE('N', 'No');

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

export type KeyboardFoamBottomSwitchPEUnion = EnumConstNames<typeof KeyboardFoamBottomSwitchPE>;
export const keyboardFoamBottomSwitchPEKeys = KeyboardFoamBottomSwitchPE.keys();
export const keyboardFoamBottomSwitchPEValues = KeyboardFoamBottomSwitchPE.values();
