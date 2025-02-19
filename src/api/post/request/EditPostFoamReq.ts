export class EditPostFoamReq {
  readonly postId!: number;
  readonly plateBetweenPCBFoam!: boolean;
  readonly bottomSwitchPEFoam!: boolean;
  readonly bottomFoam!: boolean;
  readonly tapeMod!: boolean;
  readonly remark?: string;
}
