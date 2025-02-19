import { FindPostRes } from '@/api/post/response/FindPostRes';

import { KeyboardHousingFunctionKeyLayoutUnion } from '@/constants/enum/KeyboardHousingFunctionKeyLayout.enum';
import { KeyboardHousingLayoutUnion } from '@/constants/enum/KeyboardHousingLayout.enum';
import { KeyboardHousingMountUnion } from '@/constants/enum/KeyboardHousingMount.enum';
import { KeyboardHousingWindowKeyLayoutUnion } from '@/constants/enum/KeyboardHousingWindowKeyLayout.enum';
import { KeyboardKeycapProfileUnion } from '@/constants/enum/KeyboardKeycapProfile.enum';
import { KeyboardKeycapTextureUnion } from '@/constants/enum/KeyboardKeycapTexture.enum';
import { KeyboardPCBTypeUnion } from '@/constants/enum/KeyboardPCBType.enum';
import { KeyboardPlateTextureUnion } from '@/constants/enum/KeyboardPlateTexture.enum';
import { KeyboardStabilizerMountUnion } from '@/constants/enum/KeyboardStabilizerMount.enum';
import { KeyboardStabilizerTypeUnion } from '@/constants/enum/KeyboardStabilizerType.enum';
import { KeyboardSwitchLubeUnion } from '@/constants/enum/KeyboardSwitchLube.enum';
import { KeyboardSwitchTypeUnion } from '@/constants/enum/KeyboardSwitchType.enum';

import { KeyboardDefinition } from '@/utils/keyboards/types/types';

export class FindPostViewModel {
  constructor(
    readonly id: number,
    readonly createdAt: string,
    readonly postTitle: string,
    readonly postContent: string,
    readonly isPublished: boolean,
    readonly postedUser: {
      readonly id: number;
      readonly nickname: string;
      readonly profileImg: string | null;
    },
    readonly postImages: {
      readonly id: number;
      readonly imageUrl: string;
    }[],
    readonly postHousing: {
      readonly id: number;
      readonly housingName: string;
      readonly housingColor: string;
      readonly housingMount: KeyboardHousingMountUnion;
      readonly housingLayout: KeyboardHousingLayoutUnion;
      readonly housingWindowKeyLayout: KeyboardHousingWindowKeyLayoutUnion;
      readonly housingFunctionKeyLayout: KeyboardHousingFunctionKeyLayoutUnion;
      readonly isHousingReAnodized: boolean;
    } | null,
    readonly postSwitches: {
      readonly id: number;
      readonly switchName: string;
      readonly switchType: KeyboardSwitchTypeUnion;
      readonly isSlientSwitch: boolean;
      readonly switchLube: KeyboardSwitchLubeUnion;
      readonly bottomOutForce: number | null;
      readonly springLength: number | null;
      readonly switchFilm: string | null;
      readonly remark: string | null;
    }[],
    readonly postKeycaps: {
      readonly id: number;
      readonly keycapName: string;
      readonly keycapProfile: KeyboardKeycapProfileUnion;
      readonly keycapTexture: KeyboardKeycapTextureUnion;
      readonly manufacturer: string | null;
      readonly remark: string | null;
    }[],
    readonly postStabilizers: {
      readonly id: number;
      readonly stabilizerName: string;
      readonly stabilizerType: KeyboardStabilizerTypeUnion;
      readonly stabilizerMount: KeyboardStabilizerMountUnion;
      readonly remark: string | null;
    }[],
    readonly postKeyboardDefinition: {
      readonly id: number;
      readonly definitionName: string;
      readonly keyboardDefinition: KeyboardDefinition;
      readonly layoutOptionKeys: number[];
      readonly partsOnDefinition: object | null;
    } | null,
    readonly postPrintedCircuitBoard: {
      readonly id: number;
      readonly pcbName: string;
      readonly pcbThickness: number | null;
      readonly pcbType: KeyboardPCBTypeUnion;
      readonly isRgbPcb: boolean;
      readonly isFlexCutPcb: boolean;
      readonly remark: string | null;
    } | null,
    readonly postPlate: {
      readonly id: number;
      readonly plateName: string;
      readonly plateTexture: KeyboardPlateTextureUnion;
      readonly isFlexCutPlate: boolean;
      readonly isHalfPlate: boolean;
      readonly remark: string | null;
    } | null,
    readonly postFoam: {
      readonly id: number;
      readonly plateBetweenPCBFoam: boolean;
      readonly bottomSwitchPEFoam: boolean;
      readonly bottomFoam: boolean;
      readonly tapeMod: boolean;
      readonly remark: string | null;
    } | null,
    readonly postVideo: {
      readonly id: number;
      readonly youtubeVideoUrl: string;
      readonly youtubeVideoId: string;
      readonly remark: string | null;
    } | null,
  ) {}

  static of(findPostRes: FindPostRes): FindPostViewModel {
    return new FindPostViewModel(
      findPostRes.id,
      findPostRes.createdAt,
      findPostRes.postTitle,
      findPostRes.postContent,
      findPostRes.isPublished,
      findPostRes.postedUser,
      findPostRes.postImages,
      findPostRes.postHousing,
      findPostRes.postSwitches,
      findPostRes.postKeycaps,
      findPostRes.postStabilizers,
      findPostRes.postKeyboardDefinition,
      findPostRes.postPrintedCircuitBoard,
      findPostRes.postPlate,
      findPostRes.postFoam,
      findPostRes.postVideo,
    );
  }
}
