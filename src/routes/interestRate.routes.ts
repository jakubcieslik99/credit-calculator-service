import { Router } from 'express';
import { getInterestRate } from '../controllers/interestRate.controller.js';

const interestRateRoutes = Router();

interestRateRoutes.route('/:interestRateId').get(getInterestRate);

export default interestRateRoutes;
