import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class RefreshJwtTokenInput {
  refreshToken!: string;
}

export const RefreshJwtTokenError = {
  USER_NOT_FOUND: 'Err Code - 1000\n문제가 지속 될 경우 관리자에게 문의해주세요.',
  REGISTERED_TOKEN_NOT_FOUND: 'Err Code - 1001\n문제가 지속 될 경우 관리자에게 문의해주세요.',
} as const;

export class RefreshJwtTokenOutput extends CoreOutput<typeof RefreshJwtTokenError> {
  accessToken?: string;
}
