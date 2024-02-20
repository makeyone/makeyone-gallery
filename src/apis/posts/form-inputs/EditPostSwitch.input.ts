/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-globals */
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
  Validate,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { KeyboardSwitchLubeUnion, keyboardSwitchLubeKeys } from '@/apis/posts/enums/KeyboardSwitchLube.enum';
import { KeyboardSwitchSlientUnion, keyboardSwitchSlientKeys } from '@/apis/posts/enums/KeyboardSwitchSlient.enum';
import { KeyboardSwitchTypeUnion, keyboardSwitchTypeKeys } from '@/apis/posts/enums/KeyboardSwitchType.enum';

@ValidatorConstraint({ name: 'maxNumber', async: false })
class MaxNumberValidator implements ValidatorConstraintInterface {
  validate(value: number) {
    return isNaN(value) === true || value <= 100;
  }

  defaultMessage() {
    return '100 이하로 입력해주세요.';
  }
}

// react-hook-form의 useFieldArray append메서드의 초기화 문제 때문에 모든 필드에 optional chaining을 걸어둠. (실제 type check는 class validator 참고)
class EditPostSwitch {
  @IsOptional()
  @IsNumber()
  switchId?: number;

  @IsNotEmpty({ message: '스위치 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(100, { message: '스위치 이름은 100자 이하로 입력이 가능합니다.' })
  switchName?: string;

  @IsEnum(keyboardSwitchTypeKeys)
  switchType?: KeyboardSwitchTypeUnion;

  @IsEnum(keyboardSwitchSlientKeys)
  isSlientSwitch?: KeyboardSwitchSlientUnion;

  @IsEnum(keyboardSwitchLubeKeys)
  switchLube?: KeyboardSwitchLubeUnion;

  @IsOptional()
  @IsNumber({ allowNaN: true }, { message: '숫자 또는 소수점만 입력이 가능합니다.' })
  @Validate(MaxNumberValidator)
  bottomOutForce?: number;

  @IsOptional()
  @IsNumber({ allowNaN: true }, { message: '숫자 또는 소수점만 입력이 가능합니다.' })
  @Validate(MaxNumberValidator)
  springLength?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: '스위치 필름은 50자 이하로 입력이 가능합니다.' })
  switchFilm?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특의사항은 300자 이하로 입력이 가능합니다.' })
  remark?: string;
}

export class EditPostSwitchFormInput {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostSwitch)
  switches!: EditPostSwitch[];
}
