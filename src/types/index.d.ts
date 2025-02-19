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
      readonly NODE_ENV: 'development' | 'production';
      readonly TEST_NAVER_CLIENT_ID: string;
      readonly TEST_NAVER_CLIENT_SECRENT: string;
      readonly NAVER_CLIENT_ID: string;
      readonly NAVER_CLIENT_SECRENT: string;
      readonly TEST_GOOGLE_OAUTH_CLIENT_ID: string;
      readonly TEST_GOOGLE_OAUTH_CLIENT_SECRET: string;
      readonly GOOGLE_OAUTH_CLIENT_ID: string;
      readonly GOOGLE_OAUTH_CLIENT_SECRET: string;
      readonly TEST_KAKAO_REST_API_KEY: string;
      readonly TEST_KAKAO_CLIENT_SECRENT: string;
      readonly KAKAO_REST_API_KEY: string;
      readonly KAKAO_CLIENT_SECRENT: string;
      readonly DISCORD_CLIENT_ID: string;
      readonly TEST_DISCORD_CLIENT_ID: string;
      readonly DISCORD_CLIENT_SECRENT: string;
      readonly TEST_DISCORD_CLIENT_SECRENT: string;
      readonly FRONT_SERVER_URL: string;
      readonly API_SERVER_URL: string;
      readonly NEXTAUTH_URL: string;
      readonly NEXTAUTH_SECRET: string;
      readonly JWT_ACCESS_TOKEN_COOKIE_NAME: string;
      readonly JWT_REFRESH_TOKEN_COOKIE_NAME: string;
      readonly COOKIE_DOMAIN: string;
    }
  }
}
