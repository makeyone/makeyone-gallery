export class Cursor {
  beforeCursor!: string | null | undefined;

  afterCursor!: string | null | undefined;
}

export class CursorPaginationInput {
  limit!: number;

  nextCursor?: string;
}

export class CursorPaginationRes {
  cursor!: Cursor | null;

  totalResults!: number;
}
