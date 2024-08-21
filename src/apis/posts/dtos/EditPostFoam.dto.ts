import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class EditPostFoamInput {
  postId!: number;

  plateBetweenPCBFoam!: boolean;

  bottomSwitchPEFoam!: boolean;

  bottomFoam!: boolean;

  tapeMod!: boolean;

  remark?: string;
}

type EditPostFoamRes = {
  editedPostId: number;
};
export class EditPostFoamOutput extends CoreOutput<EditPostFoamRes> {}
