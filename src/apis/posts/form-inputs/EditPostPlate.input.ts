import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { KeyboardPlateFlexCutUnion, keyboardPlateFlexCutKeys } from '@/apis/posts/enums/KeyboardPlateFlexCut.enum';
import { KeyboardPlateHalfUnion, keyboardPlateHalfKeys } from '@/apis/posts/enums/KeyboardPlateHalf.enum';
import { KeyboardPlateTextureUnion, keyboardPlateTextureKeys } from '@/apis/posts/enums/KeyboardPlateTexture.enum';
import { KeyboardPlateUsedUnion, keyboardPlateUsedKeys } from '@/apis/posts/enums/KeyboardPlateUsed.enum';

export class EditPostPlateFormInput {
  @IsNotEmpty()
  @IsEnum(keyboardPlateUsedKeys)
  isUsedPlate!: KeyboardPlateUsedUnion;

  @IsNotEmpty({ message: '보강판 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(200, { message: '보강판 이름은 200자 이하로 입력이 가능합니다.' })
  plateName!: string;

  @IsNotEmpty()
  @IsEnum(keyboardPlateTextureKeys)
  plateTexture!: KeyboardPlateTextureUnion;

  @IsNotEmpty()
  @IsEnum(keyboardPlateHalfKeys)
  isHalfPlate!: KeyboardPlateHalfUnion;

  @IsNotEmpty()
  @IsEnum(keyboardPlateFlexCutKeys)
  isFlexCutPlate!: KeyboardPlateFlexCutUnion;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특이사항은 300자 이하로 입력이 가능합니다.' })
  remark?: string;
}
