export {};

declare global {
  export interface Window {
    webkit: {
      messageHandlers: {};
    };
    android: {};
  }

  export namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'dev' | 'prod';
    }
  }
}
