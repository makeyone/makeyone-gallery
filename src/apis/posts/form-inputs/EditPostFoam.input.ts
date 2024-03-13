import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { KeyboardFoamBottomUnion, keyboardFoamBottomKeys } from '@/apis/posts/enums/KeyboardFoamBottom.enum';
import {
  KeyboardFoamBottomSwitchPEUnion,
  keyboardFoamBottomSwitchPEKeys,
} from '@/apis/posts/enums/KeyboardFoamBottomSwitchPE.enum';
import {
  KeyboardFoamPlateBetweenPCBUnion,
  keyboardFoamPlateBetweenPCBKeys,
} from '@/apis/posts/enums/KeyboardFoamPlateBetweenPCB.enum';
import { KeyboardFoamTapeModUnion, keyboardFoamTapeModKeys } from '@/apis/posts/enums/KeyboardFoamTapeMod.enum';

export class EditPostFoamFormInput {
  @IsNotEmpty()
  @IsEnum(keyboardFoamPlateBetweenPCBKeys)
  plateBetweenPCBFoam!: KeyboardFoamPlateBetweenPCBUnion;

  @IsNotEmpty()
  @IsEnum(keyboardFoamBottomSwitchPEKeys)
  bottomSwitchPEFoam!: KeyboardFoamBottomSwitchPEUnion;

  @IsNotEmpty()
  @IsEnum(keyboardFoamBottomKeys)
  bottomFoam!: KeyboardFoamBottomUnion;

  @IsNotEmpty()
  @IsEnum(keyboardFoamTapeModKeys)
  tapeMod!: KeyboardFoamTapeModUnion;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특이사항은 300자 이하로 입력이 가능합니다.' })
  remark?: string;
}
