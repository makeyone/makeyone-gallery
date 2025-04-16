'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import snakecase from 'snakecase';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PrevOrNextStep from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/StepCard';

import KeyGroup from '@/components/KeyboardLayout/KeyGroup';
import PageLoading from '@/components/Loading/PageLoading';

import useClientI18n from '@/hooks/useClientI18n';
import useWindowSize from '@/hooks/useWindowSize';

import { bindClassNames } from '@/libs/BindClassName';
import { sweetConfirm } from '@/libs/CustomAlert';

import { KeyRowCol } from '@/utils/keyboards/types/keyboard-rendering';
import { KeyboardLayoutKey } from '@/utils/keyboards/types/types';

import { useRouter } from '@/i18n/routing';

import styles from './PostSwitchOnLayout.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostSwitchOnLayout({}: Props) {
  const tEditPost = useClientI18n('edit-post');
  const tSwitchEnum = useClientI18n('switch-enum');

  const { windowWidth } = useWindowSize();
  const { replace } = useRouter();
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData, refetch } = useSuspenseQuery({
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
        toast.success(tEditPost('edit_post_switch_on_layout_save_success'));
        setIsKeyboardRedraw(true);
      }
    },
  });

  const handleClickSwitchSaveBtn = async () => {
    if (selectedSwitchId === null) {
      return toast.warning(tEditPost('edit_post_switch_on_layout_please_select_switch'));
    }

    const confirm = await sweetConfirm.fire({ titleText: tEditPost('edit_post_switch_on_layout_save_confirm'), icon: 'warning' });
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
            cardTitle={tEditPost('edit_post_switch_on_layout_card_title')}
            cardDescription={tEditPost('edit_post_switch_on_layout_card_description')}
          >
            <div>
              <span className={cx('currentDefinitionName')}>
                {tEditPost('edit_post_loaded_keyboard_layout')} <b>{keyboardLayout.name}</b>
              </span>
              <button type="button" className={cx('allClickKeysBtn')} onClick={handleAllClickKeys}>
                {tEditPost('edit_post_all_click_keys_btn')}
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
                        {tEditPost('edit_post_switch_on_layout_switch_type')} :{' '}
                        {tSwitchEnum(`switch_type_${snakecase(keyboardSwitch.switchType)}`)}
                      </li>
                      {keyboardSwitch.isSlientSwitch === true && (
                        <li className={cx('switchInfoListItem')}>{tEditPost('edit_post_switch_on_layout_silent_switch')}</li>
                      )}
                      <li className={cx('switchInfoListItem')}>
                        {tEditPost('edit_post_switch_on_layout_switch_lube')} :{' '}
                        {tSwitchEnum(`switch_lube_${snakecase(keyboardSwitch.switchLube)}`)}
                      </li>
                      {keyboardSwitch.bottomOutForce && (
                        <li className={cx('switchInfoListItem')}>
                          {tEditPost('edit_post_switch_on_layout_switch_bottom_of_force')} : {keyboardSwitch.bottomOutForce}g
                        </li>
                      )}
                      {keyboardSwitch.springLength && (
                        <li className={cx('switchInfoListItem')}>
                          {tEditPost('edit_post_switch_on_layout_switch_spring_length')} : {keyboardSwitch.springLength}mm
                        </li>
                      )}
                      {keyboardSwitch.switchFilm && (
                        <li className={cx('switchInfoListItem')}>
                          {tEditPost('edit_post_switch_on_layout_switch_film')} : {keyboardSwitch.switchFilm}
                        </li>
                      )}
                      {keyboardSwitch.remark && (
                        <li className={cx('switchInfoListItem')}>
                          {tEditPost('edit_post_switch_on_layout_switch_remark')} : {keyboardSwitch.remark}
                        </li>
                      )}
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
                {tEditPost('edit_post_switch_on_layout_save_btn')}
              </button>
            </div>
          </StepCard>
          <PrevOrNextStep
            isFormValid
            onNextStep={() => handleNextStep()}
            isNextStepLoading={false}
            buttonText={tEditPost('only_next_step_btn')}
          />
        </div>
      )}
      {isPending && <PageLoading />}
    </>
  );
}
