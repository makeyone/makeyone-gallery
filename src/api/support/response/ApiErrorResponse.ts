export class ApiErrorResponse<ErrorData = null> {
  constructor(readonly code: string, readonly message: string, readonly data: ErrorData) {}
}
