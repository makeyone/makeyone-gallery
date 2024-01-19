import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'NAVER' | 'DISCORD' | 'GOOGLE' | 'KAKAO';
type EnumName = '네이버' | '디스코드' | '구글' | '카카오';
type EnumTypeGeneric = UserSocialProvider<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class UserSocialProvider<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly NAVER = new UserSocialProvider('NAVER', '네이버');
  static readonly DISCORD = new UserSocialProvider('DISCORD', '디스코드');
  static readonly GOOGLE = new UserSocialProvider('GOOGLE', '구글');
  static readonly KAKAO = new UserSocialProvider('KAKAO', '카카오');

  private constructor(readonly _code: CodeType, readonly _name: NameType) {
    super();
  }

  get code(): CodeType {
    return this._code;
  }

  get name(): NameType {
    return this._name;
  }

  equals(code: string): boolean {
    return this.code === code;
  }
}

export type UserSocialProviderUnion = EnumConstNames<typeof UserSocialProvider>;
export const userSocialProviderKeys = UserSocialProvider.keys();
