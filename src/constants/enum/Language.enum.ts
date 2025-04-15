import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'en-US' | 'ko' | 'zh-CN' | 'zh-HK' | 'zh-TW' | 'de' | 'es';
type EnumName = 'English' | '한국어' | '简体中文' | '香港繁體' | '台灣繁體' | 'Deutsch' | 'Español';
type EnumTypeGeneric = Language<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class Language<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly 'en-US' = new Language('en-US', 'English');
  static readonly ko = new Language('ko', '한국어');
  static readonly 'zh-CN' = new Language('zh-CN', '简体中文');
  static readonly 'zh-HK' = new Language('zh-HK', '香港繁體');
  static readonly 'zh-TW' = new Language('zh-TW', '台灣繁體');
  static readonly de = new Language('de', 'Deutsch');
  static readonly es = new Language('es', 'Español');

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

export const languageCodes = Language.keys();
export type LanguageCodeUnion = EnumConstNames<typeof Language>;

export const languageNames: EnumName[] = [];
Language.values().forEach((language) => {
  languageNames.push(language.name);
});
export type LanguageNameUnion = EnumName;
