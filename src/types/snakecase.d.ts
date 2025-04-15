declare module 'snakecase' {
  /**
   * Converts a given string to `snake_case`.
   * @param input The input string to convert.
   * @returns The snake_cased string.
   * @example
   * ```ts
   * import snakecase from 'snakecase';
   * snakecase('hello world'); // 'hello_world'
   * ```
   */
  export default function snakecase(input: string): string;
}
