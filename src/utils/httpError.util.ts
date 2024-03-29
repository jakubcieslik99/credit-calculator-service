import { Code } from '../enum/code.enum.js';
import { Status } from '../enum/status.enum.js';

export class HttpError {
  private timeStamp: string;
  constructor(private statusCode: Code, private httpStatus: Status, private message: string) {
    this.timeStamp = new Date().toLocaleString();
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
    this.message = message;
  }
}
