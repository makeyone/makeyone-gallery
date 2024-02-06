/* eslint-disable array-callback-return */

'use client';

import { ChangeEvent, useState } from 'react';

import {
  VIADefinitionV2,
  VIADefinitionV3,
  isKeyboardDefinitionV2,
  isVIADefinitionV2,
  isVIADefinitionV3,
  keyboardDefinitionV2ToVIADefinitionV2,
} from '@the-via/reader';

import KeyGroup from '@/components/KeyboardLayout/KeyGroup';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './SelectKeyboardLayout.module.css';

const cx = bindClassNames(styles);

type Props = {};

const isVIADefinition = (
  definition: VIADefinitionV2 | VIADefinitionV3 | null | undefined,
): definition is VIADefinitionV2 | VIADefinitionV3 => {
  return isVIADefinitionV2(definition) || isVIADefinitionV3(definition);
};

const makeReaderPromise = (file: File): Promise<[string, string]> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) return rej();
      res([file.name, reader.result.toString()]);
    };
    reader.onerror = rej;
    reader.onabort = rej;
    reader.readAsBinaryString(file);
  });
};

export default function SelectKeyboardLayout({}: Props) {
  const [loadedDefinition, setLoadedDefinition] = useState<VIADefinitionV2 | undefined>(undefined);
  const handleChangeKeyboardJson = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(evt.target.files as FileList) as File[];
    Promise.all(files.map(makeReaderPromise)).then((results) => {
      const definitions = results
        .map(([fileName, result]) => {
          try {
            console.log('>> Load Json File Name : ', fileName);
            const res = JSON.parse(result.toString());
            const isValid = isKeyboardDefinitionV2(res) || isVIADefinitionV2(res);
            if (isValid) {
              const definition = isVIADefinitionV2(res) ? res : keyboardDefinitionV2ToVIADefinitionV2(res);
              return definition;
            }
          } catch (err: any) {
            console.error(err);
          }
        })
        .filter(isVIADefinition);

      console.log(definitions[0]);
      setLoadedDefinition(definitions[0]);
    });
  };

  return (
    <div className={cx('root')}>
      <div style={{ position: 'relative', top: '450px' }}>
        <div>Select Keyboard Layout</div>
        <input type="file" accept=".json" onChange={handleChangeKeyboardJson} multiple={false} />
        {loadedDefinition && <KeyGroup definition={loadedDefinition as VIADefinitionV2} />}
      </div>
    </div>
  );
}
