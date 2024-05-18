export class ResponseEntity {
  constructor(
    readonly message: string,
    readonly statusCode: number,
    readonly data: any,
  ) {}
}
