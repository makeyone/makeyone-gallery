import { ErrorOutput } from '@/apis/common/dtos/error.dto';

export class CoreOutput<T1 = null, T2 = null> {
  result!: 'SUCCESS' | 'ERROR';

  data?: T1;

  error?: ErrorOutput<T2>;
}

export class CursorPaginationOutput<T1 = null, T2 = null> {
  // cursor?: Cursor | null;
  // totalResults?: number;

  result!: 'SUCCESS' | 'ERROR';

  data?: T1;

  error?: ErrorOutput<T2>;
}
