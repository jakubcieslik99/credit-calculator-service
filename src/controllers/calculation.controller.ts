import { Request, Response } from 'express';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { connection } from '../config/database.config';
import { Calculation, CalculationRequest } from '../interface/calculation';
import { InterestRate } from '../interface/interestRate';
import { CALCULATION_QUERY } from '../database/calculation.query';
import { RATE_QUERY } from '../database/interestRate.query';
import { HttpResponse } from '../utils/httpResponse.util';
import { HttpError } from '../utils/httpError.util';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | ResultSetHeader, FieldPacket[]];

const getInterestRate = async () => {
  const { data } = await axios.get('https://static.nbp.pl/dane/stopy/stopy_procentowe.xml');
  const { stopy_procentowe } = await parseStringPromise(data);
  const interestRateString = stopy_procentowe.tabela[0].pozycja[0].$.oprocentowanie.replace(',', '.') as string;
  return parseFloat(interestRateString).toFixed(2) as unknown as number;
};

const saveInterestRate = async (interestRate: number) => {
  const InterestRate: InterestRate = { interestRate: `Stopa referencyjna: ${interestRate}%` };
  const pool = await connection();
  await pool.query(RATE_QUERY.CREATE_RATE, Object.values(InterestRate));
};

const calculateValueOfInstallment = (data: CalculationRequest, interestRate: number = data.interest) => {
  const { numberOfInstallments, financingValue } = data;
  const interestDecimalMonth = interestRate / 100 / 12;

  return (
    (financingValue * interestDecimalMonth * Math.pow(1 + interestDecimalMonth, numberOfInstallments)) /
    (Math.pow(1 + interestDecimalMonth, numberOfInstallments) - 1)
  );
};

const saveCalculation = async (
  interestRate: number,
  interest: number,
  valueOfInstallment: number,
  valueOfInstallmentIR: number
) => {
  const Calculation: Calculation = {
    interestRate: `Stopa referencyjna: ${interestRate}%`,
    interest: `Oprocentowanie: ${interest}%`,
    valueOfInstallment: `${valueOfInstallment.toFixed(2)} PLN`,
    valueOfInstallmentIR: `${valueOfInstallmentIR.toFixed(2)} PLN`,
  };
  const pool = await connection();
  await pool.query(CALCULATION_QUERY.CREATE_CALCULATION, Object.values(Calculation));
};

export const createCalculation = async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const interestRate = await getInterestRate();
    await saveInterestRate(interestRate);

    if (req.body.interest > interestRate) {
      return res
        .status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Twoje oprocentowanie jest większe niż stopa referencyjna NBP.'));
    }

    const valueOfInstallment = calculateValueOfInstallment(req.body);
    const valueOfInstallmentIR = calculateValueOfInstallment(req.body, interestRate);

    await saveCalculation(interestRate, req.body.interest, valueOfInstallment, valueOfInstallmentIR);

    return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Kalkulacja została zapisana.'));
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpError(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          'Wystąpił błąd podczas dokonywania kalkulacji.'
        )
      );
  }
};

export const getCalculation = async (req: Request, res: Response): Promise<Response<Calculation>> => {
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(CALCULATION_QUERY.SELECT_CALCULATION, [req.params.calculationId]);

    if ((result[0] as Array<any>).length === 0) {
      return res.status(Code.NOT_FOUND).send(new HttpError(Code.NOT_FOUND, Status.NOT_FOUND, 'Nie znaleziono kalkulacji.'));
    }
    return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, result[0]));
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpError(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          'Wystąpił błąd podczas pobierania kalkulacji.'
        )
      );
  }
};
