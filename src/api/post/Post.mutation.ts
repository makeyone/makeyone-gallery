import apiClient from '@/api/ApiClient';
import { DeletePostPlateReq } from '@/api/post/request/DeletePostPlateReq';
import { DeletePostReq } from '@/api/post/request/DeletePostReq';
import { DeletePostVideoReq } from '@/api/post/request/DeletePostVideoReq';
import { EditPostContentReq } from '@/api/post/request/EditPostContentReq';
import { EditPostFoamReq } from '@/api/post/request/EditPostFoamReq';
import { EditPostHousingReq } from '@/api/post/request/EditPostHousingReq';
import { EditPostImagesReq } from '@/api/post/request/EditPostImagesReq';
import { EditPostKeyboardDefinitionReq } from '@/api/post/request/EditPostKeyboardDefinitionReq';
import { EditPostKeycapOnLayoutReq } from '@/api/post/request/EditPostKeycapOnLayoutReq';
import { EditPostKeycapReq } from '@/api/post/request/EditPostKeycapReq';
import { EditPostPCBReq } from '@/api/post/request/EditPostPCBReq';
import { EditPostPlateReq } from '@/api/post/request/EditPostPlateReq';
import { EditPostSettingReq } from '@/api/post/request/EditPostSettingReq';
import { EditPostStabilizerReq } from '@/api/post/request/EditPostStabilizerReq';
import { EditPostSwitchOnLayoutReq } from '@/api/post/request/EditPostSwitchOnLayoutReq';
import { EditPostSwitchReq } from '@/api/post/request/EditPostSwitchReq';
import { EditPostTitleReq } from '@/api/post/request/EditPostTitleReq';
import { EditPostVideoReq } from '@/api/post/request/EditPostVideoReq';
import { CreatePostRes } from '@/api/post/response/CreatePostRes';
import { DeletePostPlateRes } from '@/api/post/response/DeletePostPlateRes';
import { DeletePostRes } from '@/api/post/response/DeletePostRes';
import { DeletePostVideoRes } from '@/api/post/response/DeletePostVideoRes';
import { EditPostContentRes } from '@/api/post/response/EditPostContentRes';
import { EditPostFoamRes } from '@/api/post/response/EditPostFoamRes';
import { EditPostHousingRes } from '@/api/post/response/EditPostHousingRes';
import { EditPostImagesRes } from '@/api/post/response/EditPostImagesRes';
import { EditPostKeyboardDefinitionRes } from '@/api/post/response/EditPostKeyboardDefinitionRes';
import { EditPostKeycapOnLayoutRes } from '@/api/post/response/EditPostKeycapOnLayoutRes';
import { EditPostKeycapRes } from '@/api/post/response/EditPostKeycapRes';
import { EditPostPCBRes } from '@/api/post/response/EditPostPCBRes';
import { EditPostPlateRes } from '@/api/post/response/EditPostPlateRes';
import { EditPostSettingRes } from '@/api/post/response/EditPostSettingRes';
import { EditPostStabilizerRes } from '@/api/post/response/EditPostStabilizerRes';
import { EditPostSwitchOnLayoutRes } from '@/api/post/response/EditPostSwitchOnLayoutRes';
import { EditPostSwitchRes } from '@/api/post/response/EditPostSwitchRes';
import { EditPostTitleRes } from '@/api/post/response/EditPostTitleRes';
import { EditPostVideoRes } from '@/api/post/response/EditPostVideoRes';
import { CreatePostViewModel } from '@/api/post/view-model/CreatePostViewModel';
import { DeletePostPlateViewModel } from '@/api/post/view-model/DeletePostPlateViewModel';
import { DeletePostVideoViewModel } from '@/api/post/view-model/DeletePostVideoViewModel';
import { DeletePostViewModel } from '@/api/post/view-model/DeletePostViewModel';
import { EditPostContentViewModel } from '@/api/post/view-model/EditPostContentViewModel';
import { EditPostFoamViewModel } from '@/api/post/view-model/EditPostFoamViewModel';
import { EditPostHousingViewModel } from '@/api/post/view-model/EditPostHousingViewModel';
import { EditPostImagesViewModel } from '@/api/post/view-model/EditPostImagesViewModel';
import { EditPostKeyboardDefinitionViewModel } from '@/api/post/view-model/EditPostKeyboardDefinitionViewModel';
import { EditPostKeycapOnLayoutViewModel } from '@/api/post/view-model/EditPostKeycapOnLayoutViewModel';
import { EditPostKeycapViewModel } from '@/api/post/view-model/EditPostKeycapViewModel';
import { EditPostPCBViewModel } from '@/api/post/view-model/EditPostPCBViewModel';
import { EditPostPlateViewModel } from '@/api/post/view-model/EditPostPlateViewModel';
import { EditPostSettingViewModel } from '@/api/post/view-model/EditPostSettingViewModel';
import { EditPostStabilizerViewModel } from '@/api/post/view-model/EditPostStabilizerViewModel';
import { EditPostSwitchOnLayoutViewModel } from '@/api/post/view-model/EditPostSwitchOnLayoutViewModel';
import { EditPostSwitchViewModel } from '@/api/post/view-model/EditPostSwitchViewModel';
import { EditPostTitleViewModel } from '@/api/post/view-model/EditPostTitleViewModel';
import { EditPostVideoViewModel } from '@/api/post/view-model/EditPostVideoViewModel';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';

export class PostMutation {
  static async createPost(): Promise<ViewModelMapper<CreatePostViewModel>> {
    const apiResponse = await apiClient<CreatePostRes>({
      urlPath: `/v1/posts`,
      method: 'POST',
    });

    return ViewModelMapper.of(apiResponse, CreatePostViewModel);
  }

  static async deletePostPlate({ postId }: DeletePostPlateReq): Promise<ViewModelMapper<DeletePostPlateViewModel>> {
    const apiResponse = await apiClient<DeletePostPlateRes>({
      urlPath: `/v1/posts/${postId}/plate`,
      method: 'DELETE',
    });

    return ViewModelMapper.of(apiResponse, DeletePostPlateViewModel);
  }

  static async deletePostVideo({ postId }: DeletePostVideoReq): Promise<ViewModelMapper<DeletePostVideoViewModel>> {
    const apiResponse = await apiClient<DeletePostVideoRes>({
      urlPath: `/v1/posts/${postId}/video`,
      method: 'DELETE',
    });

    return ViewModelMapper.of(apiResponse, DeletePostVideoViewModel);
  }

  static async editPostContent(editPostContentReq: EditPostContentReq): Promise<ViewModelMapper<EditPostContentViewModel>> {
    const apiResponse = await apiClient<EditPostContentRes>({
      urlPath: `/v1/posts/${editPostContentReq.postId}/content`,
      method: 'PATCH',
      data: editPostContentReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostContentViewModel);
  }

  static async editPostFoam(editPostFoamReq: EditPostFoamReq): Promise<ViewModelMapper<EditPostFoamViewModel>> {
    const apiResponse = await apiClient<EditPostFoamRes>({
      urlPath: `/v1/posts/${editPostFoamReq.postId}/foam`,
      method: 'PATCH',
      data: editPostFoamReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostFoamViewModel);
  }

  static async editPostHousing(editPostHousingReq: EditPostHousingReq): Promise<ViewModelMapper<EditPostHousingViewModel>> {
    const apiResponse = await apiClient<EditPostHousingRes>({
      urlPath: `/v1/posts/${editPostHousingReq.postId}/housing`,
      method: 'PATCH',
      data: editPostHousingReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostHousingViewModel);
  }

  static async editPostImages(editPostImagesReq: EditPostImagesReq): Promise<ViewModelMapper<EditPostImagesViewModel>> {
    console.log(editPostImagesReq);
    const apiResponse = await apiClient<EditPostImagesRes>({
      urlPath: `/v1/posts/${editPostImagesReq.postId}/images`,
      method: 'PATCH',
      data: editPostImagesReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostImagesViewModel);
  }

  static async editPostKeyboardDefinition(
    editPostKeyboardDefinitionReq: EditPostKeyboardDefinitionReq,
  ): Promise<ViewModelMapper<EditPostKeyboardDefinitionViewModel>> {
    const apiResponse = await apiClient<EditPostKeyboardDefinitionRes>({
      urlPath: `/v1/posts/${editPostKeyboardDefinitionReq.postId}/keyboard-definition`,
      method: 'PATCH',
      data: editPostKeyboardDefinitionReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostKeyboardDefinitionViewModel);
  }

  static async editPostKeycap(editPostKeycapReq: EditPostKeycapReq): Promise<ViewModelMapper<EditPostKeycapViewModel>> {
    const apiResponse = await apiClient<EditPostKeycapRes>({
      urlPath: `/v1/posts/${editPostKeycapReq.postId}/keycaps`,
      method: 'PATCH',
      data: editPostKeycapReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostKeycapViewModel);
  }

  static async editPostKeycapOnLayout(
    postKeycapOnLayoutReq: EditPostKeycapOnLayoutReq,
  ): Promise<ViewModelMapper<EditPostKeycapOnLayoutViewModel>> {
    const apiResponse = await apiClient<EditPostKeycapOnLayoutRes>({
      urlPath: `/v1/posts/${postKeycapOnLayoutReq.postId}/keycap-on-layout`,
      method: 'PATCH',
      data: postKeycapOnLayoutReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostKeycapOnLayoutViewModel);
  }

  static async editPostPCB(postPCBReq: EditPostPCBReq): Promise<ViewModelMapper<EditPostPCBViewModel>> {
    const apiResponse = await apiClient<EditPostPCBRes>({
      urlPath: `/v1/posts/${postPCBReq.postId}/pcb`,
      method: 'PATCH',
      data: postPCBReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostPCBViewModel);
  }

  static async editPostPlate(postPlateReq: EditPostPlateReq): Promise<ViewModelMapper<EditPostPlateViewModel>> {
    const apiResponse = await apiClient<EditPostPlateRes>({
      urlPath: `/v1/posts/${postPlateReq.postId}/plate`,
      method: 'PATCH',
      data: postPlateReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostPlateViewModel);
  }

  static async editPostSetting(postSettingReq: EditPostSettingReq): Promise<ViewModelMapper<EditPostSettingViewModel>> {
    const apiResponse = await apiClient<EditPostSettingRes>({
      urlPath: `/v1/posts/${postSettingReq.postId}/setting`,
      method: 'PATCH',
      data: postSettingReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostSettingViewModel);
  }

  static async editPostStabilizer(
    postStabilizerReq: EditPostStabilizerReq,
  ): Promise<ViewModelMapper<EditPostStabilizerViewModel>> {
    const apiResponse = await apiClient<EditPostStabilizerRes>({
      urlPath: `/v1/posts/${postStabilizerReq.postId}/stabilizers`,
      method: 'PATCH',
      data: postStabilizerReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostStabilizerViewModel);
  }

  static async editPostSwitch(postSwitchReq: EditPostSwitchReq): Promise<ViewModelMapper<EditPostSwitchViewModel>> {
    const apiResponse = await apiClient<EditPostSwitchRes>({
      urlPath: `/v1/posts/${postSwitchReq.postId}/switches`,
      method: 'PATCH',
      data: postSwitchReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostSwitchViewModel);
  }

  static async editPostSwitchOnLayout(
    postSwitchOnLayoutReq: EditPostSwitchOnLayoutReq,
  ): Promise<ViewModelMapper<EditPostSwitchOnLayoutViewModel>> {
    const apiResponse = await apiClient<EditPostSwitchOnLayoutRes>({
      urlPath: `/v1/posts/${postSwitchOnLayoutReq.postId}/switch-on-layout`,
      method: 'PATCH',
      data: postSwitchOnLayoutReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostSwitchOnLayoutViewModel);
  }

  static async editPostTitle(postTitleReq: EditPostTitleReq): Promise<ViewModelMapper<EditPostTitleViewModel>> {
    const apiResponse = await apiClient<EditPostTitleRes>({
      urlPath: `/v1/posts/${postTitleReq.postId}/title`,
      method: 'PATCH',
      data: postTitleReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostTitleViewModel);
  }

  static async editPostVideo(postVideoReq: EditPostVideoReq): Promise<ViewModelMapper<EditPostVideoViewModel>> {
    const apiResponse = await apiClient<EditPostVideoRes>({
      urlPath: `/v1/posts/${postVideoReq.postId}/video`,
      method: 'PATCH',
      data: postVideoReq,
    });

    return ViewModelMapper.of(apiResponse, EditPostVideoViewModel);
  }

  static async deletePost(postVideoReq: DeletePostReq): Promise<ViewModelMapper<DeletePostViewModel>> {
    const apiResponse = await apiClient<DeletePostRes>({
      urlPath: `/v1/posts/${postVideoReq.postId}`,
      method: 'DELETE',
      data: postVideoReq,
    });

    return ViewModelMapper.of(apiResponse, DeletePostViewModel);
  }
}
