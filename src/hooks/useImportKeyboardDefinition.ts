/* eslint-disable array-callback-return */

import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import {
  DefinitionVersionMap,
  VIADefinitionV2,
  VIADefinitionV3,
  isKeyboardDefinitionV2,
  isKeyboardDefinitionV3,
  isVIADefinitionV2,
  isVIADefinitionV3,
  keyboardDefinitionV2ToVIADefinitionV2,
  keyboardDefinitionV3ToVIADefinitionV3,
} from '@the-via/reader';

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

export default function useImportKeyboardDefinition(defaultLoadedDefinition?: VIADefinitionV2 | VIADefinitionV3) {
  const [loadedDefinition, setLoadedDefinition] = useState<VIADefinitionV2 | VIADefinitionV3 | undefined>(
    defaultLoadedDefinition,
  );
  const importKeyboardDefinition = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(evt.target.files as FileList) as File[];
    Promise.all(files.map(makeReaderPromise)).then((results) => {
      const definitions = results
        .map(([fileName, result]) => {
          try {
            console.log(
              `Load Definition File Name : %c${fileName}`,
              `
              color: #000000;
              padding: 4px 8px;
              border-radius: 10px;
              background-color: #ff94ab;
            `,
            );

            const res = JSON.parse(result.toString());
            let definitionVersion: keyof DefinitionVersionMap | 'v3' = 'v2';
            let isDefinitionValid = isKeyboardDefinitionV2(res) || isVIADefinitionV2(res);

            if (isDefinitionValid === false) {
              isDefinitionValid = isKeyboardDefinitionV3(res) || isVIADefinitionV3(res);
              definitionVersion = 'v3';
            }

            if (isDefinitionValid === true && definitionVersion === 'v2') {
              const definition = isVIADefinitionV2(res) ? res : keyboardDefinitionV2ToVIADefinitionV2(res);
              return definition;
            }

            if (isDefinitionValid === true && definitionVersion === 'v3') {
              const definition = isVIADefinitionV3(res) ? res : keyboardDefinitionV3ToVIADefinitionV3(res);
              return definition;
            }
          } catch (err: any) {
            console.error(err);
            toast.error(
              `키보드 레이아웃을 로드하는도중 알 수 없는 오류가 발생하였습니다.\n\nErr Code: 0001\n문제가 지속 될 경우 관리자에게 문의해주세요.`,
            );
          }
        })
        .filter(isVIADefinition);

      setLoadedDefinition(definitions[0]);
    });
  };

  return [loadedDefinition, importKeyboardDefinition] as const;
}
