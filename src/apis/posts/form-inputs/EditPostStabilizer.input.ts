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

import { KeyboardStabilizerMountUnion, keyboardStabilizerMountKeys } from '@/apis/posts/enums/KeyboardStabilizerMount.enum';
import { KeyboardStabilizerTypeUnion, keyboardStabilizerTypeKeys } from '@/apis/posts/enums/KeyboardStabilizerType.enum';

// react-hook-form의 useFieldArray append메서드의 초기화 문제 때문에 모든 필드에 optional chaining을 걸어둠. (실제 type check는 class validator 참고)
class EditPostStabilizer {
  @IsOptional()
  @IsNumber()
  stabilizerId?: number;

  @IsNotEmpty({ message: '스테빌라이저 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(100, { message: '스테빌라이저 이름은 100자 이하로 입력이 가능합니다.' })
  stabilizerName?: string;

  @IsEnum(keyboardStabilizerTypeKeys)
  stabilizerType?: KeyboardStabilizerTypeUnion;

  @IsEnum(keyboardStabilizerMountKeys)
  stabilizerMount?: KeyboardStabilizerMountUnion;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특의사항은 300자 이하로 입력이 가능합니다.' })
  remark?: string;
}

export class EditPostStabilizerFormInput {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostStabilizer)
  stabilizers!: EditPostStabilizer[];
}
