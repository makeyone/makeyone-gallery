import { Enum, EnumConstNames, EnumType } from 'ts-jenum';

type EnumCode =
  | 'TopMount'
  | 'SandwichMount'
  | 'GasketMount'
  | 'ORingMount'
  | 'TrayMount'
  | 'BottomMount'
  | 'PlatelessMount'
  | 'TadpoleMount'
  | 'IntegratedPlate'
  | 'LeafSpringMount'
  | 'Etc';
type EnumName =
  | '탑 마운트'
  | '샌드위치 마운트'
  | '가스캣 마운트'
  | '오링 마운트 (거미 오링)'
  | '트레이 마운트'
  | '바텀 마운트'
  | '플레이트리스 마운트 (무보강)'
  | '테드폴 마운트'
  | '상판 일체형'
  | '리프 스프링 마운트'
  | '위 항목에 없는 마운트';
type EnumTypeGeneric = KeyboardHousingMount<EnumCode, EnumName>;

@Enum<EnumTypeGeneric>('code')
export class KeyboardHousingMount<CodeType extends EnumCode, NameType extends EnumName> extends EnumType<EnumTypeGeneric>() {
  static readonly TopMount = new KeyboardHousingMount('TopMount', '탑 마운트');
  static readonly SandwichMount = new KeyboardHousingMount('SandwichMount', '샌드위치 마운트');
  static readonly GasketMount = new KeyboardHousingMount('GasketMount', '가스캣 마운트');
  static readonly ORingMount = new KeyboardHousingMount('ORingMount', '오링 마운트 (거미 오링)');
  static readonly TrayMount = new KeyboardHousingMount('TrayMount', '트레이 마운트');
  static readonly BottomMount = new KeyboardHousingMount('BottomMount', '바텀 마운트');
  static readonly PlatelessMount = new KeyboardHousingMount('PlatelessMount', '플레이트리스 마운트 (무보강)');
  static readonly TadpoleMount = new KeyboardHousingMount('TadpoleMount', '테드폴 마운트');
  static readonly IntegratedPlate = new KeyboardHousingMount('IntegratedPlate', '상판 일체형');
  static readonly LeafSpringMount = new KeyboardHousingMount('LeafSpringMount', '리프 스프링 마운트');
  static readonly Etc = new KeyboardHousingMount('Etc', '위 항목에 없는 마운트');

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

export type KeyboardHousingMountUnion = EnumConstNames<typeof KeyboardHousingMount>;
export const keyboardHousingMountKeys = KeyboardHousingMount.keys();
export const keyboardHousingMountValues = KeyboardHousingMount.values();
