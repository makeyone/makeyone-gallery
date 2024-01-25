'use client';

import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { CreateOrEditPostInput } from '@/apis/posts/form-inputs/CreateOrEditPost.input';

import FormCard from '@/app/posts/(create-or-edit)/_components/FormCard';

import FormFloatingLabelInput from '@/components/FormFloatingLabelInput';
import FormFloatingLabelSelect from '@/components/FormFloatingLabelSelect';

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
          inputRegisterReturn={register('housingName')}
          currentInputValue={watch().housingName}
        />
        <FormFloatingLabelSelect
          inputId="housingLayout"
          label="하우징 레이아웃"
          fieldName="housingLayout"
          register={register('housingLayout')}
          setValue={setValue}
          allowSearch
          options={['full', 'tkl', 'etc.'].map((layout) => ({
            key: layout,
            label: layout,
            value: layout,
            searchKeywords: [layout],
          }))}
        />
      </FormCard>
    </div>
  );
}
