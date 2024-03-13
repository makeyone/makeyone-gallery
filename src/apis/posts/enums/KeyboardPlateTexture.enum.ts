import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode =
  | 'Aluminum'
  | 'FR4'
  | 'POM'
  | 'PC'
  | 'PP'
  | 'CarbonFiber'
  | 'Steel'
  | 'StainlessSteel'
  | 'Brass'
  | 'Ceramic'
  | 'Titanium'
  | 'Etc';
type EnumName =
  | '알루미늄'
  | 'FR4'
  | 'POM'
  | 'PC'
  | 'PP'
  | '카본 파이버'
  | '스틸'
  | '스테인리스 스틸'
  | '황동'
  | '세라믹'
  | '티타늄'
  | '위 항목에 없는 재질';

type EnumTypeGeneric = KeyboardPlateTexture<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardPlateTexture<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Aluminum = new KeyboardPlateTexture('Aluminum', '알루미늄');
  static readonly FR4 = new KeyboardPlateTexture('FR4', 'FR4');
  static readonly POM = new KeyboardPlateTexture('POM', 'POM');
  static readonly PC = new KeyboardPlateTexture('PC', 'PC');
  static readonly PP = new KeyboardPlateTexture('PP', 'PP');
  static readonly CarbonFiber = new KeyboardPlateTexture('CarbonFiber', '카본 파이버');
  static readonly Steel = new KeyboardPlateTexture('Steel', '스틸');
  static readonly StainlessSteel = new KeyboardPlateTexture('StainlessSteel', '스테인리스 스틸');
  static readonly Brass = new KeyboardPlateTexture('Brass', '황동');
  static readonly Ceramic = new KeyboardPlateTexture('Ceramic', '세라믹');
  static readonly Titanium = new KeyboardPlateTexture('Titanium', '티타늄');
  static readonly Etc = new KeyboardPlateTexture('Etc', '위 항목에 없는 재질');

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

export type KeyboardPlateTextureUnion = EnumConstNames<typeof KeyboardPlateTexture>;
export const keyboardPlateTextureKeys = KeyboardPlateTexture.keys();
export const keyboardPlateTextureValues = KeyboardPlateTexture.values();
