'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { editPostKeycapOnLayout } from '@/apis/posts/actions/EditPostKeycapOnLayout';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { EditPostKeycapOnLayoutInput, EditPostKeycapOnLayoutOutput } from '@/apis/posts/dtos/EditPostKeycapOnLayout.dto';
import { KeyboardKeycapProfile } from '@/apis/posts/enums/KeyboardKeycapProfile.enum';
import { KeyboardKeycapTexture } from '@/apis/posts/enums/KeyboardKeycapTexture.enum';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import KeyGroup from '@/components/KeyboardLayout/KeyGroup';
import PageLoading from '@/components/Loading/PageLoading';

import { bindClassNames } from '@/libs/bind-class-name';
import { sweetConfirm } from '@/libs/sweet-alert2';

import { KeyRowCol } from '@/utils/keyboards/types/keyboard-rendering';
import { KeyboardLayoutKey } from '@/utils/keyboards/types/types';

import styles from './PostKeycapOnLayout.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostKeycapOnLayout({}: Props) {
  const { replace } = useRouter();
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data, refetch } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
  });
  const post = data?.post;

  const keyboardKeycaps = post?.postKeycaps;
  const keyboardLayout = post?.postKeyboardDefinition?.keyboardDefinition;
  const keyboardlayoutOptionKeys = post?.postKeyboardDefinition?.layoutOptionKeys;

  useEffect(() => {
    if (keyboardLayout === undefined) {
      replace(`/posts/${postId}/edit/keyboard-layout`);
    } else if (keyboardKeycaps?.length === 0) {
      replace(`/posts/${postId}/edit/keycap`);
    }
  }, [keyboardLayout]);

  const [isShowKeyClickIcon, setIsShowKeyClickIcon] = useState<boolean>(false);
  useEffect(() => {
    const hasRegisteredKeycap = data?.post?.postKeyboardDefinition?.keyboardDefinition.layouts.keys.some(
      (key: KeyboardLayoutKey) => key?.registeredKeycap !== undefined,
    );
    if (hasRegisteredKeycap === false) {
      setIsShowKeyClickIcon(true);
    }

    if (hasRegisteredKeycap === true) {
      setIsShowKeyClickIcon(false);
    }
  }, [data]);

  const [clickedKeys, setClickedKeys] = useState<KeyRowCol[]>([]);
  const handleClickKey = (keyRowCol: KeyRowCol) => {
    setIsShowKeyClickIcon(false);
    const { row: clickedKeyRow, col: clickedKeyCol } = keyRowCol;
    const findExistingKey = clickedKeys.find((key) => key.col === clickedKeyCol && key.row === clickedKeyRow);
    if (findExistingKey) {
      return setClickedKeys(clickedKeys.filter((key) => key.col !== clickedKeyCol || key.row !== clickedKeyRow));
    }

    return setClickedKeys([...clickedKeys, keyRowCol]);
  };

  const [selectedKeycapId, setSelectedKeycapId] = useState<number | null>(null);
  const handleClickKeycap = (keycapId: number) => {
    setSelectedKeycapId(keycapId);
  };

  const [isKeyboardRedraw, setIsKeyboardRedraw] = useState<boolean>(true);
  useEffect(() => {
    if (isKeyboardRedraw === true) {
      setIsKeyboardRedraw(false);
    }
  }, [isKeyboardRedraw]);

  const { isPending, mutate } = useMutation<
    EditPostKeycapOnLayoutOutput,
    AxiosError<EditPostKeycapOnLayoutOutput>,
    EditPostKeycapOnLayoutInput
  >({
    mutationFn: editPostKeycapOnLayout,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        setClickedKeys([]);
        setSelectedKeycapId(null);
        toast.success('키캡 등록이 완료되었습니다.');
        setIsKeyboardRedraw(true);
      }
    },
  });

  const handleClickKeycapSaveBtn = async () => {
    if (selectedKeycapId === null) {
      return toast.error('등록할 키캡을 선택해주세요.');
    }

    const confirm = await sweetConfirm.fire({ titleText: '키캡을 등록하시겠습니까?', icon: 'warning' });
    if (confirm.isConfirmed === true) {
      mutate({
        postId,
        keycapId: selectedKeycapId,
        keys: clickedKeys,
      });
    }
  };

  const { push } = useRouter();
  const handleNextStep = () => {
    push(`/posts/${postId}/edit/pcb`);
  };

  return (
    <>
      {keyboardKeycaps && keyboardKeycaps.length > 0 && keyboardLayout && keyboardlayoutOptionKeys && (
        <div className={cx('root')}>
          <StepCard
            cardTitle="레이아웃에 키캡 장착"
            cardDescription="각 키 별로 어떤 키캡가 장착되어있는지를 알기 위해 키를 선택 후 키캡을 등록해주세요!"
          >
            <div>
              <span className={cx('currentDefinitionName')}>
                현재 로드된 레이아웃 <b>{keyboardLayout.name}</b>
              </span>
              <div className={cx('layoutBlock')}>
                <KeyGroup
                  definition={keyboardLayout}
                  selectedOptionKeys={keyboardlayoutOptionKeys}
                  parentElWidth="1020px"
                  innerPadding={30}
                  clickedKeys={clickedKeys}
                  handleClickKeycap={handleClickKey}
                  isRedraw={isKeyboardRedraw}
                />
                {isShowKeyClickIcon === true && (
                  <Image className={cx('keyClickIcon')} src="/icons/click.gif" width={50} height={50} alt="키를 클릭해주세요." />
                )}
              </div>
              <ul className={cx('keycapList')}>
                {keyboardKeycaps.map((keyboardKeycap) => (
                  <li
                    key={keyboardKeycap.id}
                    className={cx('keycapItem', keyboardKeycap.id === selectedKeycapId && 'active')}
                    onClick={() => handleClickKeycap(keyboardKeycap.id)}
                  >
                    <h3 className={cx('keycapName')}>{keyboardKeycap.keycapName}</h3>
                    <ul className={cx('keycapInfoList')}>
                      <li className={cx('keycapInfoListItem')}>
                        <Image src="/icons/keycap.png" width={24} height={24} alt="키캡 프로파일" />
                        {KeyboardKeycapProfile.findName(keyboardKeycap.keycapProfile)}
                      </li>
                      <li className={cx('keycapInfoListItem')}>
                        <Image src="/icons/texture.png" width={24} height={24} alt="키캡 재질" />
                        {KeyboardKeycapTexture.findName(keyboardKeycap.keycapTexture)}
                      </li>
                      {keyboardKeycap.manufacturer && (
                        <li className={cx('keycapInfoListItem', 'onlyText')}>
                          <span>제조사 : {keyboardKeycap.manufacturer}</span>
                        </li>
                      )}
                      {keyboardKeycap.remark && <li className={cx('keycapInfoListItem')}>특이사항 : {keyboardKeycap.remark}</li>}
                    </ul>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={cx('keycapSaveBtn')}
                onClick={handleClickKeycapSaveBtn}
                disabled={clickedKeys.length === 0 || selectedKeycapId === null}
              >
                키캡 적용하기
              </button>
            </div>
          </StepCard>
          <PrevOrNextStep isFormValid onNextStep={() => handleNextStep()} isNextStepLoading={false} buttonText="다음으로" />
        </div>
      )}
      {isPending && <PageLoading />}
    </>
  );
}
