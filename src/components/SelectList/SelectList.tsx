'use client';

import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { ArrowDropDown } from '@mui/icons-material';

import useInputText from '@/hooks/useInputText';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './SelectList.module.css';

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
  options: SelectOptionType[];
  defaultValue?: string | number;
  defaultLabel?: string;
  allowSearch?: boolean;
  className?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  afterChangedValueFn?: (optionValue: string) => void;
};

export default function SelectList({
  inputId,
  label,
  options,
  allowSearch = true,
  defaultValue = '',
  defaultLabel = '',
  className = '',
  setValue,
  afterChangedValueFn,
}: Props) {
  const [isOptionsOpend, setIsOptionsOpend] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | number>(defaultLabel || defaultValue);
  const [searchKeyword, onChangeSearchKeyword, setSearchKeyword] = useInputText('');

  const handleOptionOpenBtnClick = () => {
    setIsOptionsOpend(true);
  };

  const handleChangeValue = (optionLabel: string, optionValue: string) => () => {
    if (setValue) {
      setValue(optionValue);
    }
    setSearchKeyword('');
    setSelectedOption(optionLabel);
    setIsOptionsOpend(false);
    if (afterChangedValueFn && defaultValue !== optionValue) {
      afterChangedValueFn(optionValue);
    }
  };

  const handleOutsideClick = () => {
    setSearchKeyword('');
    setIsOptionsOpend(false);
  };

  const [filteredOptions, setFilteredOptions] = useState<SelectOptionType[]>(options);
  useEffect(() => {
    const copyOptions = [...options];
    if (allowSearch === true) {
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
    }

    if (allowSearch === false) {
      setFilteredOptions(copyOptions);
    }
  }, [searchKeyword, allowSearch]);

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
          placeholder={isOptionsOpend === true ? selectedOption.toString() || label.toString() : label.toString()}
          autoComplete="off"
          onChange={onChangeSearchKeyword}
          readOnly={allowSearch === false}
        />
        <input type="text" readOnly required autoComplete="off" hidden />
        <ArrowDropDown />
      </button>
      {isOptionsOpend === true && (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <div className={cx('optionBlock')}>
            <ul className={cx('optionList')}>
              {filteredOptions.length === 0 ? (
                <li className={cx('optionItem')}>검색 결과가 존재하지 않습니다.</li>
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
