export class ErrorOutput<T1, T2> {
  statusType!: string;

  statusCode!: number;

  message!: keyof T1;

  data?: T2;
}
