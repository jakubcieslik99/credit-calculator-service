import { Request, Response } from 'express';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { connection } from '../config/database.config.js';
import { InterestRate } from '../interface/interestRate.js';
import { RATE_QUERY } from '../database/interestRate.query.js';
import { HttpResponse } from '../utils/httpResponse.util.js';
import { HttpError } from '../utils/httpError.util.js';
import { Code } from '../enum/code.enum.js';
import { Status } from '../enum/status.enum.js';

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | ResultSetHeader, FieldPacket[]];

export const getInterestRate = async (req: Request, res: Response): Promise<Response<InterestRate>> => {
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(RATE_QUERY.SELECT_RATE, [req.params.interestRateId]);

    if ((result[0] as Array<any>).length === 0) {
      return res
        .status(Code.NOT_FOUND)
        .send(new HttpError(Code.NOT_FOUND, Status.NOT_FOUND, 'Nie znaleziono odczytu wartości stopy procentowej NBP.'));
    }
    return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, result[0]));
  } catch (error: unknown) {
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpError(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          'Wystąpił błąd podczas pobierania wartości stopy procentowej NBP.'
        )
      );
  }
};
