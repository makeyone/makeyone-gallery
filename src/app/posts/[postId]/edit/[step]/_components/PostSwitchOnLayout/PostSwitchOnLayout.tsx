'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { editPostSwitchOnLayout } from '@/apis/posts/actions/EditPostSwitchOnLayout';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { EditPostSwitchOnLayoutInput, EditPostSwitchOnLayoutOutput } from '@/apis/posts/dtos/EditPostSwitchOnLayout.dto';
import { KeyboardSwitchLube } from '@/apis/posts/enums/KeyboardSwitchLube.enum';
import { KeyboardSwitchSlient } from '@/apis/posts/enums/KeyboardSwitchSlient.enum';
import { KeyboardSwitchType } from '@/apis/posts/enums/KeyboardSwitchType.enum';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import KeyGroup from '@/components/KeyboardLayout/KeyGroup';
import PageLoading from '@/components/Loading/PageLoading';

import { bindClassNames } from '@/libs/bind-class-name';
import { sweetConfirm } from '@/libs/sweet-alert2';

import { KeyRowCol } from '@/utils/keyboards/types/keyboard-rendering';
import { KeyboardLayoutKey } from '@/utils/keyboards/types/types';

import styles from './PostSwitchOnLayout.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostSwitchOnLayout({}: Props) {
  const { replace } = useRouter();
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data, refetch } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
  });
  const post = data?.post;

  const keyboardSwitches = post?.postSwitches;
  const keyboardLayout = post?.postKeyboardDefinition?.keyboardDefinition;
  const keyboardlayoutOptionKeys = post?.postKeyboardDefinition?.layoutOptionKeys;

  useEffect(() => {
    if (keyboardLayout === undefined) {
      replace(`/posts/${postId}/edit/keyboard-layout`);
    } else if (keyboardSwitches?.length === 0) {
      replace(`/posts/${postId}/edit/switch`);
    }
  }, [keyboardLayout]);

  const [isShowKeyClickIcon, setIsShowKeyClickIcon] = useState<boolean>(false);
  useEffect(() => {
    const hasRegisteredSwitch = data?.post?.postKeyboardDefinition?.keyboardDefinition.layouts.keys.some(
      (key: KeyboardLayoutKey) => key?.registeredSwitch !== undefined,
    );
    if (hasRegisteredSwitch === false) {
      setIsShowKeyClickIcon(true);
    }

    if (hasRegisteredSwitch === true) {
      setIsShowKeyClickIcon(false);
    }
  }, [data]);

  const [clickedKeys, setClickedKeys] = useState<KeyRowCol[]>([]);
  const handleClickKeycap = (keyRowCol: KeyRowCol) => {
    setIsShowKeyClickIcon(false);
    const { row: clickedKeyRow, col: clickedKeyCol } = keyRowCol;
    const findExistingKey = clickedKeys.find((key) => key.col === clickedKeyCol && key.row === clickedKeyRow);
    if (findExistingKey) {
      return setClickedKeys(clickedKeys.filter((key) => key.col !== clickedKeyCol || key.row !== clickedKeyRow));
    }

    return setClickedKeys([...clickedKeys, keyRowCol]);
  };

  const [selectedSwitchId, setSelectedSwitchId] = useState<number | null>(null);
  const handleClickSwitch = (switchId: number) => {
    setSelectedSwitchId(switchId);
  };

  const [isKeyboardRedraw, setIsKeyboardRedraw] = useState<boolean>(true);
  useEffect(() => {
    if (isKeyboardRedraw === true) {
      setIsKeyboardRedraw(false);
    }
  }, [isKeyboardRedraw]);

  const { isPending, mutate } = useMutation<
    EditPostSwitchOnLayoutOutput,
    AxiosError<EditPostSwitchOnLayoutOutput>,
    EditPostSwitchOnLayoutInput
  >({
    mutationFn: editPostSwitchOnLayout,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        setClickedKeys([]);
        setSelectedSwitchId(null);
        toast.success('스위치 등록이 완료되었습니다.');
        setIsKeyboardRedraw(true);
      }
    },
  });

  const handleClickSwitchSaveBtn = async () => {
    if (selectedSwitchId === null) {
      return toast.error('등록할 스위치를 선택해주세요.');
    }

    const confirm = await sweetConfirm.fire({ titleText: '스위치를 등록하시겠습니까?', icon: 'warning' });
    if (confirm.isConfirmed === true) {
      mutate({
        postId,
        switchId: selectedSwitchId,
        keys: clickedKeys,
      });
    }
  };

  const { push } = useRouter();
  const handleNextStep = () => {
    push(`/posts/${postId}/edit/keycap-on-layout`);
  };

  return (
    <>
      {keyboardSwitches && keyboardSwitches.length > 0 && keyboardLayout && keyboardlayoutOptionKeys && (
        <div className={cx('root')}>
          <StepCard
            cardTitle="레이아웃에 스위치 장착"
            cardDescription="각 키 별로 어떤 스위치가 장착되어있는지를 알기 위해 키를 선택 후 스위치를 등록해주세요!"
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
                  handleClickKeycap={handleClickKeycap}
                  isRedraw={isKeyboardRedraw}
                />
                {isShowKeyClickIcon === true && (
                  <Image className={cx('keyClickIcon')} src="/icons/click.gif" width={50} height={50} alt="키를 클릭해주세요." />
                )}
              </div>
              <ul className={cx('switchList')}>
                {keyboardSwitches.map((keyboardSwitch) => (
                  <li
                    key={keyboardSwitch.id}
                    className={cx('switchItem', keyboardSwitch.id === selectedSwitchId && 'active')}
                    onClick={() => handleClickSwitch(keyboardSwitch.id)}
                  >
                    <h3 className={cx('switchName')}>{keyboardSwitch.switchName}</h3>
                    <ul className={cx('switchInfoList')}>
                      <li className={cx('switchInfoListItem')}>
                        <Image src="/icons/switch.png" width={24} height={24} alt="스위치 타입" />
                        {KeyboardSwitchType.findName(keyboardSwitch.switchType)}
                      </li>
                      <li className={cx('switchInfoListItem')}>
                        <Image src="/icons/lube.png" width={24} height={24} alt="스위치 윤활" />
                        {KeyboardSwitchLube.findName(keyboardSwitch.switchLube)}
                      </li>
                      <li className={cx('switchInfoListItem')}>
                        <Image src="/icons/sound.png" width={24} height={24} alt="저소음 여부" />
                        {KeyboardSwitchSlient.findName(keyboardSwitch.isSlientSwitch === true ? 'Y' : 'N')}
                      </li>
                      {(keyboardSwitch.bottomOutForce || keyboardSwitch.springLength || keyboardSwitch.switchFilm) && (
                        <li className={cx('switchInfoListItem', 'onlyText')}>
                          {keyboardSwitch.bottomOutForce && <span>바닥압 : {keyboardSwitch.bottomOutForce}g</span>}
                          {keyboardSwitch.springLength && <span>스프링 길이 : {keyboardSwitch.springLength}mm</span>}
                          {keyboardSwitch.switchFilm && <span>스위치 필름 : {keyboardSwitch.switchFilm}</span>}
                        </li>
                      )}
                      {keyboardSwitch.remark && <li className={cx('switchInfoListItem')}>특이사항 : {keyboardSwitch.remark}</li>}
                    </ul>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={cx('switchSaveBtn')}
                onClick={handleClickSwitchSaveBtn}
                disabled={clickedKeys.length === 0 || selectedSwitchId === null}
              >
                스위치 적용하기
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
