'use client';

import React, { useEffect, useState } from 'react';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';

import { ArrowDropDown } from '@mui/icons-material';

import useClientI18n from '@/hooks/useClientI18n';
import useInputText from '@/hooks/useInputText';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './FormFloatingLabelSelect.module.css';

const cx = bindClassNames(styles);

export type SelectOptionType = {
  key: string;
  label: string;
  value: string;
  searchKeywords: string[];
  html?: React.ReactNode;
};

type Props = {
  inputId: string;
  label: string;
  fieldName: string;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<any>;
  options: SelectOptionType[];
  defaultValue?: string;
  defaultLabel?: string;
  allowSearch?: boolean;
  className?: string;
  afterChangedValueFn?: () => void;
};

export default function FormFloatingLabel({
  inputId,
  label,
  fieldName,
  register,
  setValue,
  options,
  allowSearch = true,
  defaultValue = '',
  defaultLabel = '',
  className = '',
  afterChangedValueFn,
}: Props) {
  const t = useClientI18n('global');

  const [isOptionsOpend, setIsOptionsOpend] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(defaultLabel || defaultValue);
  const [searchKeyword, onChangeSearchKeyword, setSearchKeyword] = useInputText('');

  const handleOptionOpenBtnClick = () => {
    setIsOptionsOpend(true);
  };

  const handleChangeValue = (optionLabel: string, optionValue: string) => () => {
    setValue(fieldName, optionValue, { shouldValidate: true });
    setSearchKeyword('');
    setSelectedOption(optionLabel);
    setIsOptionsOpend(false);
    if (afterChangedValueFn && defaultValue !== optionValue) {
      afterChangedValueFn();
    }
  };

  const handleOutsideClick = () => {
    setSearchKeyword('');
    setIsOptionsOpend(false);
  };

  const [filteredOptions, setFilteredOptions] = useState<SelectOptionType[]>(options);
  useEffect(() => {
    const copyOptions = [...options];
    setFilteredOptions(
      copyOptions.filter((option) => {
        let isSatisfied = false;
        for (const optionKeyword of option.searchKeywords) {
          if (optionKeyword.indexOf(searchKeyword) !== -1) {
            isSatisfied = true;
          }
        }
        return isSatisfied;
      }),
    );
  }, [searchKeyword]);

  return (
    <div className={cx('root', className)}>
      <label className={cx('label', (isOptionsOpend === true || selectedOption !== '') && 'inputActived')} htmlFor={inputId}>
        {label}
      </label>
      <button type="button" onClick={handleOptionOpenBtnClick} className={cx('optionOpenBtn')}>
        <input
          id={inputId}
          className={cx('input')}
          value={allowSearch === true && isOptionsOpend === true ? searchKeyword : selectedOption}
          placeholder={isOptionsOpend === true ? selectedOption || label : label}
          autoComplete="off"
          onChange={onChangeSearchKeyword}
          readOnly={allowSearch === false}
        />
        <input {...register} type="text" readOnly required autoComplete="off" hidden />
        <ArrowDropDown />
      </button>
      {isOptionsOpend === true && (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <div className={cx('optionBlock')}>
            <ul className={cx('optionList')}>
              {filteredOptions.length === 0 ? (
                <li className={cx('optionItem')}>{t('form_select_no_result')}</li>
              ) : (
                filteredOptions.map((option) => (
                  <li className={cx('optionItem')} key={option.key} onClick={handleChangeValue(option.label, option.value)}>
                    {option.html || option.label}
                  </li>
                ))
              )}
            </ul>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
}
