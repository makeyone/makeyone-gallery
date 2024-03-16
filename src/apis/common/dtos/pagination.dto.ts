import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class Cursor {
  beforeCursor!: string | null | undefined;

  afterCursor!: string | null | undefined;
}

export class CursorPaginationInput {
  limit!: number;

  nextCursor?: string;
}

export class CursorPaginationOutput extends CoreOutput {
  cursor?: Cursor | null;

  totalResults?: number;
}

export class OffsetPaginationInput {
  page!: number;

  limit!: number;
}

export class OffsetPaginationOutput extends CoreOutput {
  totalPages?: number;

  totalResults?: number;
}
