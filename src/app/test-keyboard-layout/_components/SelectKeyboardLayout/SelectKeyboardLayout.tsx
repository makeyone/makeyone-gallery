'use client';

import React, { useEffect, useState } from 'react';

import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';

import customDefinitions from '@/public/customDefinitions';

import KeyGroup from '@/components/KeyboardLayout/KeyGroup';
import SelectList from '@/components/SelectList';
import { SelectOptionType } from '@/components/SelectList/SelectList';
import SliderToggle from '@/components/SliderToggle';

import useImportKeyboardDefinition from '@/hooks/useImportKeyboardDefinition';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './SelectKeyboardLayout.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function SelectKeyboardLayout({}: Props) {
  const [loadedDefinition, importKeyboardDefinition, selectKeyboardDefinition] = useImportKeyboardDefinition();
  const [selectedOptionKeys, setSelectedOptionKeys] = useState<number[]>([]);
  useEffect(() => {
    setSelectedOptionKeys([]);
  }, [loadedDefinition]);

  const handleChangeOption = (layoutKey: number, options: string[], selectedValue: string) => {
    const optionIndex = options.indexOf(selectedValue);
    const optionKeys = Array.from(selectedOptionKeys).map((i) => i || 0);
    optionKeys[layoutKey] = optionIndex;
    setSelectedOptionKeys(optionKeys);
  };

  const handleChangeSelectKeyboardDefinition = (selectedValue: string) => {
    const findDefinition = customDefinitions.find((customDefinition) => customDefinition.name === selectedValue) as
      | VIADefinitionV2
      | VIADefinitionV3
      | undefined;
    if (findDefinition !== undefined) {
      selectKeyboardDefinition(findDefinition);
    }
  };

  return (
    <div className={cx('root')}>
      <div style={{ position: 'relative', top: '450px' }}>
        <div>Select Keyboard Layout</div>
        <input type="file" accept=".json" onChange={importKeyboardDefinition} multiple={false} />
        <SelectList
          inputId="select-file-list"
          label="기존 파일 선택"
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
        {loadedDefinition && (
          <div>
            <KeyGroup definition={loadedDefinition} selectedOptionKeys={selectedOptionKeys} />
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

                    return (
                      <div key={optionLabel} className={cx('optionItem')}>
                        <SelectList
                          inputId={optionLabel}
                          label={optionLabel}
                          allowSearch={false}
                          defaultLabel={options[0]}
                          options={selectElementOptions as unknown as SelectOptionType[]}
                          afterChangedValueFn={(selectedValue: string) => {
                            handleChangeOption(layoutKey, options, selectedValue);
                          }}
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={optionsWithLabel}>
                      <span>{optionsWithLabel}</span>
                      <SliderToggle
                        isChecked={Boolean(selectedOptionKeys[layoutKey])}
                        onChange={(isChecked) => {
                          const optionKeys = Array.from(selectedOptionKeys).map((i) => i || 0);
                          optionKeys[layoutKey] = Number(isChecked);
                          setSelectedOptionKeys(optionKeys);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
