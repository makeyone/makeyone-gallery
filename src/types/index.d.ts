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
      TEST_NAVER_CLIENT_ID: string;
      TEST_NAVER_CLIENT_SECRENT: string;
      NAVER_CLIENT_ID: string;
      NAVER_CLIENT_SECRENT: string;
      TEST_GOOGLE_OAUTH_CLIENT_ID: string;
      TEST_GOOGLE_OAUTH_CLIENT_SECRET: string;
      GOOGLE_OAUTH_CLIENT_ID: string;
      GOOGLE_OAUTH_CLIENT_SECRET: string;
      TEST_KAKAO_REST_API_KEY: string;
      TEST_KAKAO_CLIENT_SECRENT: string;
      KAKAO_REST_API_KEY: string;
      KAKAO_CLIENT_SECRENT: string;
      DISCORD_CLIENT_ID: string;
      TEST_DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRENT: string;
      TEST_DISCORD_CLIENT_SECRENT: string;
      FRONT_SERVER_URL: string;
      API_SERVER_URL: string;
      RESOURCES_URL: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
    }
  }
}
