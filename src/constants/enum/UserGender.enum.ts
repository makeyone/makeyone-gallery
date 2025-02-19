import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'Unknown' | 'Male' | 'Female';
type EnumName = '알수없음' | '남자' | '여자';
type EnumTypeGeneric = UserGender<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class UserGender<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly Unknown = new UserGender('Unknown', '알수없음');
  static readonly Male = new UserGender('Male', '남자');
  static readonly Female = new UserGender('Female', '여자');

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

export type UserGenderUnion = EnumConstNames<typeof UserGender>;
export const userGenderKeys = UserGender.keys();
