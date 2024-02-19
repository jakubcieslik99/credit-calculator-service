import { Code } from '../enum/code.enum.js';
import { Status } from '../enum/status.enum.js';

export class HttpResponse {
  constructor(private statusCode: Code, private httpStatus: Status, private httpResponse?: {} | string) {
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
    this.httpResponse = httpResponse;
  }
}
