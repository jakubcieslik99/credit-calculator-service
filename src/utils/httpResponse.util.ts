import { Code } from '../enum/code.enum.js';
import { Status } from '../enum/status.enum.js';

export class HttpResponse {
  constructor(
    public readonly statusCode: Code,
    public readonly httpStatus: Status,
    public readonly httpResponse?: {} | string,
  ) {}
}
