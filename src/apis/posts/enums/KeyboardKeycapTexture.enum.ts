import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'ABS' | 'PBT' | 'Ceramic' | 'Aluminum' | 'Brass' | 'Artisan' | 'Etc';
type EnumName = 'ABS' | 'PBT' | '세라믹' | '알루미늄' | '황동' | '아티산키캡' | '위 항목에 없는 재질';
type EnumTypeGeneric = KeyboardKeycapTexture<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardKeycapTexture<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly ABS = new KeyboardKeycapTexture('ABS', 'ABS');
  static readonly PBT = new KeyboardKeycapTexture('PBT', 'PBT');
  static readonly Ceramic = new KeyboardKeycapTexture('Ceramic', '세라믹');
  static readonly Aluminum = new KeyboardKeycapTexture('Aluminum', '알루미늄');
  static readonly Brass = new KeyboardKeycapTexture('Brass', '황동');
  static readonly Artisan = new KeyboardKeycapTexture('Artisan', '아티산키캡');
  static readonly Etc = new KeyboardKeycapTexture('Etc', '위 항목에 없는 재질');

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

export type KeyboardKeycapTextureUnion = EnumConstNames<typeof KeyboardKeycapTexture>;
export const keyboardKeycapTextureKeys = KeyboardKeycapTexture.keys();
export const keyboardKeycapTextureValues = KeyboardKeycapTexture.values();
