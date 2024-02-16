import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

import {
  KeyboardHousingCustomAnodizedUnion,
  keyboardHousingCustomAnodizedKeys,
} from '@/apis/posts/enums/KeyboardHousingCustomAnodized.enum';
import {
  KeyboardHousingFunctionKeyUnion,
  keyboardHousingFunctionKeyKeys,
} from '@/apis/posts/enums/KeyboardHousingFunctionKey.enum';
import { KeyboardHousingLayoutUnion, keyboardHousingLayoutKeys } from '@/apis/posts/enums/KeyboardHousingLayout.enum';
import { KeyboardHousingMountUnion, keyboardHousingMountKeys } from '@/apis/posts/enums/KeyboardHousingMount.enum';
import { KeyboardHousingWindowKeyUnion, keyboardHousingWindowKeyKeys } from '@/apis/posts/enums/KeyboardHousingWindowKey.enum';

export class EditPostInput {
  @IsNotEmpty()
  @IsString()
  @Length(1, 200, { message: '게시글 제목을 입력해주세요.' })
  postTitle!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 200, { message: '하우징 이름을 입력해주세요.' })
  housingName!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: '하우징 색상을 입력해주세요.' })
  housingColor!: string;

  @IsNotEmpty()
  @IsEnum(keyboardHousingMountKeys)
  housingMount!: KeyboardHousingMountUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingLayoutKeys)
  housingLayout!: KeyboardHousingLayoutUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingWindowKeyKeys)
  housingWindowKey!: KeyboardHousingWindowKeyUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingFunctionKeyKeys)
  housingFunctionKey!: KeyboardHousingFunctionKeyUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingCustomAnodizedKeys)
  housingCustomAnodized!: KeyboardHousingCustomAnodizedUnion;
}
