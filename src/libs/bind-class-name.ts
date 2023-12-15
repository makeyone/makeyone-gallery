const getKeyLength = (obj: Record<string, any>): number => Object.keys(obj).length;

type Styles = { [key: string]: string };
export function bindClassNames<T extends Styles>(styles: T) {
  type BooleanMap = Partial<Record<keyof T, boolean> & { [key: string]: boolean }>;
  type ClassNames = keyof T | false | null | undefined | BooleanMap;
  type ExtraClassName = ClassNames | Omit<string, keyof T>;

  const styleUtils = {
    ...styles,
  };

  const originUtilsKeysLen = getKeyLength(styles);
  const resultStylesKeyLen = getKeyLength(styleUtils);
  if (originUtilsKeysLen !== resultStylesKeyLen) {
    throw new Error('Detected duplicate keys while merging styles. Ensure unique class names across all style modules.');
  }

  const fn = (...classNames: ExtraClassName[]) => {
    return (classNames.filter((cn) => cn) as (keyof T)[])
      .map((className) => {
        if (typeof className === 'object') {
          const keys = Object.keys(className) as (keyof T)[];
          return keys
            .filter((key) => className[key])
            .map((key) => styleUtils[key])
            .join(' ');
        }
        return styleUtils[className] ?? className;
      })
      .join(' ');
  };

  return fn;
}
