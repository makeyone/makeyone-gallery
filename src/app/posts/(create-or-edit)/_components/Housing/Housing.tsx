'use client';

import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { keyboardHousingCustomAnodizedValues } from '@/apis/posts/enums/KeyboardHousingCustomAnodized.enum';
import { keyboardHousingFunctionKeyValues } from '@/apis/posts/enums/KeyboardHousingFunctionKey.enum';
import { keyboardHousingLayoutValues } from '@/apis/posts/enums/KeyboardHousingLayout.enum';
import { keyboardHousingMountValues } from '@/apis/posts/enums/KeyboardHousingMount.enum';
import { keyboardHousingWindowKeyValues } from '@/apis/posts/enums/KeyboardHousingWindowKey.enum';
import { CreateOrEditPostInput } from '@/apis/posts/form-inputs/CreateOrEditPost.input';

import FormCard from '@/app/posts/(create-or-edit)/_components/FormCard';

import FormFloatingLabelInput from '@/components/FormFloatingLabelInput';
import FormFloatingLabelSelect from '@/components/FormFloatingLabelSelect';
import FormRadioGroupWithLabel from '@/components/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './Housing.module.css';

const cx = bindClassNames(styles);

type Props = {
  register: UseFormRegister<CreateOrEditPostInput>;
  watch: UseFormWatch<CreateOrEditPostInput>;
  setValue: UseFormSetValue<CreateOrEditPostInput>;
};

export default function Housing({ register, watch, setValue }: Props) {
  return (
    <div className={cx('root')}>
      <FormCard cardTitle="하우징" cardDescription="하우징에 대한 기본 정보를 작성해주세요!">
        <FormFloatingLabelInput
          label="하우징 이름"
          inputId="housingName"
          inputType="text"
          maxLength={200}
          inputRegisterReturn={register('housingName')}
          currentInputValue={watch().housingName}
        />
        <FormFloatingLabelInput
          label="하우징 색상"
          inputId="housingColor"
          inputType="text"
          maxLength={100}
          inputRegisterReturn={register('housingColor')}
          currentInputValue={watch().housingColor}
        />
        <FormRadioGroupWithLabel
          label="하우징 구매 이후 아노다이징 여부"
          register={register('housingCustomAnodized')}
          required
          align="Row"
          name="housingCustomAnodized"
          items={keyboardHousingCustomAnodizedValues.map((customAnodized) => ({
            id: `housingCustomAnodized_${customAnodized.code}`,
            label: customAnodized.name,
            value: customAnodized.code,
          }))}
        />
        <FormFloatingLabelSelect
          inputId="housingMount"
          label="하우징 결합방식"
          fieldName="housingMount"
          register={register('housingMount')}
          setValue={setValue}
          allowSearch
          options={keyboardHousingMountValues.map((mount) => ({
            key: mount.code,
            label: mount.name,
            value: mount.code,
            searchKeywords: [mount.name, mount.name.replaceAll(' ', '')],
          }))}
        />
        <FormFloatingLabelSelect
          inputId="housingLayout"
          label="하우징 레이아웃"
          fieldName="housingLayout"
          register={register('housingLayout')}
          setValue={setValue}
          allowSearch
          options={keyboardHousingLayoutValues.map((layout) => ({
            key: layout.code,
            label: layout.name,
            value: layout.code,
            searchKeywords: [layout.name, layout.name.replaceAll(' ', '')],
          }))}
        />
        <FormRadioGroupWithLabel
          label="윈도우 레이아웃"
          register={register('housingWindowKey')}
          required
          align="Row"
          name="housingWindowKey"
          items={keyboardHousingWindowKeyValues.map((windowKey) => ({
            id: `housingWindowKey_${windowKey.code}`,
            label: windowKey.name,
            value: windowKey.code,
          }))}
        />
        <FormRadioGroupWithLabel
          label="Function 레이아웃"
          register={register('housingFunctionKey')}
          required
          align="Row"
          name="housingFunctionKey"
          items={keyboardHousingFunctionKeyValues.map((functionKey) => ({
            id: `housingFunctionKey_${functionKey.code}`,
            label: functionKey.name,
            value: functionKey.code,
          }))}
        />
      </FormCard>
    </div>
  );
}
