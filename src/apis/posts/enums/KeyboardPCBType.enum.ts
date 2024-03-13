import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Solder' | 'HotSwap' | 'MillMax';
type EnumName = '솔더링' | '핫스왑' | '밀맥스';
type EnumTypeGeneric = KeyboardPCBType<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardPCBType<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Solder = new KeyboardPCBType('Solder', '솔더링');
  static readonly HotSwap = new KeyboardPCBType('HotSwap', '핫스왑');
  static readonly MillMax = new KeyboardPCBType('MillMax', '밀맥스');

  private constructor(readonly _code: CodeType, readonly _name: NameType) {
    super();
  }

  get code(): CodeType {
    return this._code;
  }

  get name(): NameType {
    return this._name;
  }

  static findName(code: string): string | undefined {
    return this.values().find((value) => value.equals(code))?.name;
  }

  equals(code: string): boolean {
    return this.code === code;
  }
}

export type KeyboardPCBTypeUnion = EnumConstNames<typeof KeyboardPCBType>;
export const keyboardPCBTypeKeys = KeyboardPCBType.keys();
export const keyboardPCBTypeValues = KeyboardPCBType.values();
