'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import { KeyboardSwitchLube } from '@/constants/enum/KeyboardSwitchLube.enum';
import { KeyboardSwitchType } from '@/constants/enum/KeyboardSwitchType.enum';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import KeyGroup from '@/components/KeyboardLayout/KeyGroup';
import PageLoading from '@/components/Loading/PageLoading';

import useWindowSize from '@/hooks/useWindowSize';

import { bindClassNames } from '@/libs/BindClassName.ts';
import { sweetConfirm } from '@/libs/CustomAlert';

import { KeyRowCol } from '@/utils/keyboards/types/keyboard-rendering';
import { KeyboardLayoutKey } from '@/utils/keyboards/types/types';

import styles from './PostSwitchOnLayout.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostSwitchOnLayout({}: Props) {
  const { windowWidth } = useWindowSize();
  const { replace } = useRouter();
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData, refetch } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const keyboardSwitches = postData?.postSwitches;
  const keyboardLayout = postData?.postKeyboardDefinition?.keyboardDefinition;
  const keyboardlayoutOptionKeys = postData?.postKeyboardDefinition?.layoutOptionKeys;

  useEffect(() => {
    if (keyboardLayout === undefined) {
      replace(`/posts/${postId}/edit/keyboard-layout`);
    } else if (keyboardSwitches?.length === 0) {
      replace(`/posts/${postId}/edit/switch`);
    }
  }, [keyboardLayout]);

  const [isShowKeyClickIcon, setIsShowKeyClickIcon] = useState<boolean>(false);
  useEffect(() => {
    const hasRegisteredSwitch = postData?.postKeyboardDefinition?.keyboardDefinition.layouts.keys.some(
      (key: KeyboardLayoutKey) => key?.registeredSwitch !== undefined,
    );
    if (hasRegisteredSwitch === false) {
      setIsShowKeyClickIcon(true);
    }

    if (hasRegisteredSwitch === true) {
      setIsShowKeyClickIcon(false);
    }
  }, [postData]);

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

  const handleAllClickKeys = () => {
    if (!keyboardLayout) return;
    if (!keyboardlayoutOptionKeys) return;

    const keys = keyboardLayout.layouts.keys;
    const optionKeys = keyboardLayout.layouts.optionKeys;

    // 옵션 키 설정 (슷바 쪼개기 등)
    const displayedOptionKeys = optionKeys
      ? Object.entries(optionKeys).flatMap(([key, options]) => {
          const optionKey = parseInt(key, 10);
          return keyboardlayoutOptionKeys[optionKey] ? options[keyboardlayoutOptionKeys[optionKey]] : options[0];
        })
      : [];
    const displayedKeys = [...keys, ...displayedOptionKeys];

    setClickedKeys(displayedKeys);
    setIsShowKeyClickIcon(false);
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

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostSwitchOnLayout,
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
              <button type="button" className={cx('allClickKeysBtn')} onClick={handleAllClickKeys}>
                모든 키 선택
              </button>
              <div className={cx('layoutBlock')}>
                <KeyGroup
                  definition={keyboardLayout}
                  selectedOptionKeys={keyboardlayoutOptionKeys}
                  parentElWidth={`${windowWidth && windowWidth < 1300 ? windowWidth! - 160 : '1140'}px`}
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
                        스위치 타입 : {KeyboardSwitchType.findName(keyboardSwitch.switchType)}
                      </li>
                      {keyboardSwitch.isSlientSwitch === true && <li className={cx('switchInfoListItem')}>저소음 스위치</li>}
                      <li className={cx('switchInfoListItem')}>
                        운활 : {KeyboardSwitchLube.findName(keyboardSwitch.switchLube)}
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
