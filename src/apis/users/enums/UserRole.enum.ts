import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode = 'ADMIN' | 'CLIENT';
type EnumName = '관리자' | '일반유저';
type EnumTypeGeneric = UserRole<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class UserRole<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly ADMIN = new UserRole('ADMIN', '관리자');
  static readonly CLIENT = new UserRole('CLIENT', '일반유저');

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

export type UserRoleUnion = EnumConstNames<typeof UserRole>;
export const userRoleKeys = UserRole.keys();
