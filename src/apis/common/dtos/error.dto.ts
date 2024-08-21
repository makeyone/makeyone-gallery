export class ErrorOutput<T> {
  code!: string;

  message!: string;

  data!: T;
}
