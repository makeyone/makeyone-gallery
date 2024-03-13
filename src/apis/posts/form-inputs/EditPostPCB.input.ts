import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Validate } from 'class-validator';

import { MaxNumber100Validator } from '@/apis/common/validators/max-number-100.validator';
import { KeyboardPCBFlexCutUnion, keyboardPCBFlexCutKeys } from '@/apis/posts/enums/KeyboardPCBFlexCut.enum';
import { KeyboardPCBRgbUnion, keyboardPCBRgbKeys } from '@/apis/posts/enums/KeyboardPCBRgb.enum';
import { KeyboardPCBTypeUnion, keyboardPCBTypeKeys } from '@/apis/posts/enums/KeyboardPCBType.enum';

export class EditPostPCBFormInput {
  @IsNotEmpty({ message: '기판 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(200, { message: '기판 이름은 200자 이하로 입력이 가능합니다.' })
  pcbName!: string;

  @IsNotEmpty()
  @IsEnum(keyboardPCBTypeKeys)
  pcbType!: KeyboardPCBTypeUnion;

  @IsNotEmpty()
  @IsEnum(keyboardPCBRgbKeys)
  isRgbPcb!: KeyboardPCBRgbUnion;

  @IsNotEmpty()
  @IsEnum(keyboardPCBFlexCutKeys)
  isFlexCutPcb!: KeyboardPCBFlexCutUnion;

  @IsOptional()
  @IsNumber({ allowNaN: true }, { message: '숫자 또는 소수점만 입력이 가능합니다.' })
  @Validate(MaxNumber100Validator)
  pcbThickness?: number;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특이사항은 300자 이하로 입력이 가능합니다.' })
  remark?: string;
}
