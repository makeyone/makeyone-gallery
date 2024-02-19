import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import {
  KeyboardHousingFunctionKeyLayoutUnion,
  keyboardHousingFunctionKeyLayoutKeys,
} from '@/apis/posts/enums/KeyboardHousingFunctionKeyLayout.enum';
import { KeyboardHousingLayoutUnion, keyboardHousingLayoutKeys } from '@/apis/posts/enums/KeyboardHousingLayout.enum';
import { KeyboardHousingMountUnion, keyboardHousingMountKeys } from '@/apis/posts/enums/KeyboardHousingMount.enum';
import { KeyboardHousingReAnodizedUnion, keyboardHousingReAnodizedKeys } from '@/apis/posts/enums/KeyboardHousingReAnodized.enum';
import {
  KeyboardHousingWindowKeyLayoutUnion,
  keyboardHousingWindowKeyLayoutKeys,
} from '@/apis/posts/enums/KeyboardHousingWindowKeyLayout.enum';

export class EditPostHousingFormInput {
  @IsNotEmpty({ message: '하우징 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(200, { message: '하우징 이름은 200자 이하로 입력이 가능합니다.' })
  housingName!: string;

  @IsNotEmpty({ message: '하우징 색상을 입력해주세요.' })
  @IsString()
  @MaxLength(50, { message: '하우징 색상은 50자 이하로 입력이 가능합니다.' })
  housingColor!: string;

  @IsNotEmpty()
  @IsEnum(keyboardHousingMountKeys)
  housingMount!: KeyboardHousingMountUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingLayoutKeys)
  housingLayout!: KeyboardHousingLayoutUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingWindowKeyLayoutKeys)
  housingWindowKeyLayout!: KeyboardHousingWindowKeyLayoutUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingFunctionKeyLayoutKeys)
  housingFunctionKeyLayout!: KeyboardHousingFunctionKeyLayoutUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingReAnodizedKeys)
  housingReAnodized!: KeyboardHousingReAnodizedUnion;
}
