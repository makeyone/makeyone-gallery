import { ChangeEvent, useEffect, useState } from 'react';
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

const loadDefinitionAndValid = (definitionJson: any) => {
  let definitionVersion: keyof DefinitionVersionMap | 'v3' = 'v2';
  let isDefinitionValid = isKeyboardDefinitionV2(definitionJson) || isVIADefinitionV2(definitionJson);

  if (isDefinitionValid === false) {
    isDefinitionValid = isKeyboardDefinitionV3(definitionJson) || isVIADefinitionV3(definitionJson);
    definitionVersion = 'v3';
  }

  if (isDefinitionValid === true && definitionVersion === 'v2') {
    const definition = isVIADefinitionV2(definitionJson) ? definitionJson : keyboardDefinitionV2ToVIADefinitionV2(definitionJson);
    return definition;
  }

  if (isDefinitionValid === true && definitionVersion === 'v3') {
    const definition = isVIADefinitionV3(definitionJson) ? definitionJson : keyboardDefinitionV3ToVIADefinitionV3(definitionJson);
    return definition;
  }
};

export default function useImportKeyboardDefinition(defaultLoadedDefinition?: VIADefinitionV2 | VIADefinitionV3) {
  const [isSuccessUploaded, setIsSuccessUploaded] = useState<boolean>(false);
  const [loadedDefinition, setLoadedDefinition] = useState<VIADefinitionV2 | VIADefinitionV3 | undefined>(
    defaultLoadedDefinition,
  );
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const resetKeyboardDefinition = () => {
    setUploadedFileName('');
    setLoadedDefinition(undefined);
  };

  const selectKeyboardDefinition = (selectedDefinition: VIADefinitionV2 | VIADefinitionV3) => {
    console.log(
      `Load Definition Name : %c${selectedDefinition.name}`,
      `
        color: #000000;
        background-color: #ff94ab;
        padding: 4px 8px;
        border-radius: 10px;
      `,
    );

    const definition = loadDefinitionAndValid(selectedDefinition);

    setUploadedFileName('');
    setLoadedDefinition(definition);
  };

  const importKeyboardDefinition = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(evt.target.files as FileList) as File[];
    if (files.length > 0) {
      Promise.all(files.map(makeReaderPromise)).then((results) => {
        const definitions = results
          .map(([fileName, result]) => {
            try {
              console.log(
                `Uploaded Definition File Name : %c${fileName}`,
                `
                color: #ffffff;
                background-color: #00a76f;
                padding: 4px 8px;
                border-radius: 10px;
              `,
              );

              const res = JSON.parse(result.toString());
              const definition = loadDefinitionAndValid(res);

              setUploadedFileName(fileName);

              return definition;
            } catch (err: any) {
              console.error(err);
              evt.target.value = '';
              resetKeyboardDefinition();
              toast.error(
                `키보드 레이아웃을 로드하는도중 알 수 없는 오류가 발생하였습니다.\n\nErr Code: 0001\n문제가 지속 될 경우 관리자에게 문의해주세요.`,
              );
            }
          })
          .filter(isVIADefinition);

        if (definitions[0] === undefined) {
          evt.target.value = '';
          resetKeyboardDefinition();
          return toast.error(`VIA 형식에 맞는 JSON 파일을 업로드해주세요.`);
        }

        setIsSuccessUploaded(true);
        return setLoadedDefinition(definitions[0]);
      });
    }
  };

  useEffect(() => {
    if (isSuccessUploaded === true) {
      setIsSuccessUploaded(false);
    }
  }, [isSuccessUploaded]);

  return {
    loadedDefinition,
    setLoadedDefinition,
    importKeyboardDefinition,
    selectKeyboardDefinition,
    resetKeyboardDefinition,
    uploadedFileName,
    isSuccessUploaded,
  } as const;
}
