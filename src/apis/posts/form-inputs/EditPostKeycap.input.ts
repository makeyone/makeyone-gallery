import 'reflect-metadata';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { KeyboardKeycapProfileUnion, keyboardKeycapProfileKeys } from '@/apis/posts/enums/KeyboardKeycapProfile.enum';
import { KeyboardKeycapTextureUnion, keyboardKeycapTextureKeys } from '@/apis/posts/enums/KeyboardKeycapTexture.enum';

// react-hook-form의 useFieldArray append메서드의 초기화 문제 때문에 모든 필드에 optional chaining을 걸어둠. (실제 type check는 class validator 참고)
class EditPostKeycap {
  @IsOptional()
  @IsNumber()
  keycapId?: number;

  @IsNotEmpty({ message: '키캡 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(200, { message: '키캡 이름은 200자 이하로 입력이 가능합니다.' })
  keycapName?: string;

  @IsEnum(keyboardKeycapProfileKeys)
  keycapProfile?: KeyboardKeycapProfileUnion;

  @IsEnum(keyboardKeycapTextureKeys)
  keycapTexture?: KeyboardKeycapTextureUnion;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: '키캡 제조사는 100자 이하로 입력이 가능합니다.' })
  manufacturer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특의사항은 300자 이하로 입력이 가능합니다.' })
  remark?: string;
}

export class EditPostKeycapFormInput {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostKeycap)
  keycaps!: EditPostKeycap[];
}
