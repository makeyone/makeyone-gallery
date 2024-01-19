import { ErrorOutput } from '@/apis/common/dtos/error.dto';

export class CoreOutput<T1 = never, T2 = never> {
  ok!: boolean;

  error?: ErrorOutput<T1, T2>;
}

export class OffsetPaginationInput {
  limit!: number;

  page!: number;
}

export class OffsetPaginationOutput<T1 = never, T2 = never> extends CoreOutput<T1, T2> {
  totalPages?: number;

  totalResults?: number;
}
