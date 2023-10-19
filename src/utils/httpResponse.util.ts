import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';

export class HttpResponse {
  constructor(private statusCode: Code, private httpStatus: Status, private httpResponse?: {} | string) {
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
    this.httpResponse = httpResponse;
  }
}
