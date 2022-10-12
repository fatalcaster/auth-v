export class ValidationErrorTemplate {
  constructor(
    public params: string,
    public msg: string,
    public id?: number | string | undefined
  ) {}
}
