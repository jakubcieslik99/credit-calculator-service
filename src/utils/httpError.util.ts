import { Code } from '../enum/code.enum.js';
import { Status } from '../enum/status.enum.js';

export class HttpError {
  public readonly timeStamp: string;

  constructor(
    public readonly statusCode: Code,
    public readonly httpStatus: Status,
    public readonly message: string,
  ) {
    this.timeStamp = new Date().toLocaleString();
  }
}
