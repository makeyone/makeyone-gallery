'use client';

import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';
import { AxiosError } from 'axios';

import customDefinitions from '@/public/customDefinitions';

import { editPostKeyboardLayout } from '@/apis/posts/actions/EditPostKeyboardLayout';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { EditPostKeyboardLayoutInput, EditPostKeyboardLayoutOutput } from '@/apis/posts/dtos/EditPostKeyboardLayout.dto';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import KeyGroup from '@/components/KeyboardLayout/KeyGroup';
import SelectList from '@/components/SelectList';
import { SelectOptionType } from '@/components/SelectList/SelectList';
import SliderToggle from '@/components/SliderToggle';

import useImportKeyboardDefinition from '@/hooks/useImportKeyboardDefinition';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostKeyboardLayout.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostKeyboardLayout({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data, refetch } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
  });
  const post = data?.post;

  const { loadedDefinition, importKeyboardDefinition, selectKeyboardDefinition, resetKeyboardDefinition, uploadedFileName } =
    useImportKeyboardDefinition(post?.postKeyboardLayout?.keyboardLayout);
  const [selectedOptionKeys, setSelectedOptionKeys] = useState<number[]>(post?.postKeyboardLayout?.layoutOptions || []);

  // 키보드 데피니션이 변경되었을 때 처리
  const [isShowUploadDefinitionInput, setIsShowUploadDefinitionInput] = useState<boolean>(false);
  const handleChangeSelectKeyboardDefinition = (selectedValue: string) => {
    if (selectedValue === '아래의 레이아웃중 해당하는 항목이 없음') {
      resetKeyboardDefinition();
      return setIsShowUploadDefinitionInput(true);
    }

    const findDefinition = customDefinitions.find((customDefinition) => customDefinition.name === selectedValue) as
      | VIADefinitionV2
      | VIADefinitionV3
      | undefined;
    if (findDefinition !== undefined && selectedValue !== loadedDefinition?.name) {
      setSelectedOptionKeys([]);
      selectKeyboardDefinition(findDefinition);
      setIsShowUploadDefinitionInput(false);
    }
  };

  // 셀렉트 리스트 형태의 키보드 배열 옵션이 수정되었을 경우 처리
  const handleChangeSelectListOption = (layoutKey: number, options: string[], selectedValue: string) => {
    const optionIndex = options.indexOf(selectedValue);
    const optionKeys: number[] = Array.from(selectedOptionKeys).map((i) => i || 0);
    optionKeys[layoutKey] = optionIndex;
    setSelectedOptionKeys(optionKeys as number[]);
  };

  // 토글 형태의 키보드 배열 옵션이 수정되었을 경우 처리
  const handleChangeToggleOption = (layoutKey: number, isChecked: boolean) => {
    const optionKeys = Array.from(selectedOptionKeys).map((i) => i || 0);
    optionKeys[layoutKey] = Number(isChecked);
    setSelectedOptionKeys(optionKeys);
  };

  const { push } = useRouter();
  const { isPending, mutate } = useMutation<
    EditPostKeyboardLayoutOutput,
    AxiosError<EditPostKeyboardLayoutOutput>,
    EditPostKeyboardLayoutInput
  >({
    mutationFn: editPostKeyboardLayout,
    onSuccess: async () => {
      refetch();
      push(`/posts/${postId}/edit/keycap-on-layout`);
    },
  });
  const handleNextStep = () => {
    if (loadedDefinition) {
      mutate({
        postId,
        keyboardLayout: loadedDefinition,
        ...(selectedOptionKeys.length > 0 && { layoutOptions: selectedOptionKeys }),
      });
    }
  };

  return (
    <div className={cx('root')}>
      <StepCard
        cardTitle="키보드 레이아웃 설정"
        cardDescription="내 키보드에 맞는 레이아웃을 선택 또는 VIA에 사용하는 JSON 파일을 업로드 해주세요!"
      >
        <div>
          <SelectList
            inputId="select-file-list"
            label="레이아웃 선택"
            allowSearch
            options={Array.from(customDefinitions).map((customDefinition) => ({
              key: customDefinition.name,
              label: customDefinition.name,
              value: customDefinition.name,
              searchKeywords: [customDefinition.name, customDefinition.name.toLowerCase(), customDefinition.name.toUpperCase()],
            }))}
            afterChangedValueFn={(selectedValue: string) => {
              handleChangeSelectKeyboardDefinition(selectedValue);
            }}
          />
          {isShowUploadDefinitionInput === true && (
            <div className={cx('fileInputBlock')}>
              <label htmlFor="definition">
                {uploadedFileName === '' ? '이 곳을 클릭해 JSON 파일을 업로드해주세요.' : `업로드된 파일 : ${uploadedFileName}`}
                <input id="definition" type="file" accept=".json" onChange={importKeyboardDefinition} multiple={false} hidden />
              </label>
            </div>
          )}
          {loadedDefinition?.name && (
            <span className={cx('currentDefinitionName')}>
              현재 로드된 레이아웃 <b>{loadedDefinition?.name}</b>
            </span>
          )}
          {loadedDefinition && (
            <div className={cx('layoutBlock')}>
              <KeyGroup
                definition={loadedDefinition}
                selectedOptionKeys={selectedOptionKeys}
                parentElWidth="1020px"
                innerPadding={30}
              />
              {loadedDefinition.layouts.labels && (
                <div className={cx('optionList')}>
                  {loadedDefinition.layouts.labels.map((optionsWithLabel, layoutKey) => {
                    if (Array.isArray(optionsWithLabel)) {
                      const options = optionsWithLabel.slice(1);
                      const optionLabel = optionsWithLabel[0];
                      const selectElementOptions = options.map((option) => ({
                        key: `${option}`,
                        label: option,
                        value: option,
                      }));

                      const existingValue = selectedOptionKeys?.[layoutKey];

                      return (
                        <div key={optionLabel} className={cx('optionItem', 'selectList')}>
                          <SelectList
                            inputId={optionLabel}
                            label={optionLabel}
                            allowSearch={false}
                            defaultLabel={existingValue === undefined ? options[0] : options[existingValue]}
                            defaultValue={existingValue === undefined ? undefined : existingValue}
                            options={selectElementOptions as unknown as SelectOptionType[]}
                            afterChangedValueFn={(selectedValue: string) => {
                              handleChangeSelectListOption(layoutKey, options, selectedValue);
                            }}
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={optionsWithLabel} className={cx('optionItem', 'toggle')}>
                        <span className={cx('toggleOptionItemTitle')}>{optionsWithLabel}</span>
                        <SliderToggle
                          isChecked={Boolean(selectedOptionKeys[layoutKey])}
                          onChange={(isChecked: boolean) => handleChangeToggleOption(layoutKey, isChecked)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </StepCard>
      <PrevOrNextStep
        isFormValid={loadedDefinition !== undefined}
        onNextStep={() => handleNextStep()}
        isNextStepLoading={isPending}
      />
    </div>
  );
}
