import { Router } from 'express';
import { createCalculation, getCalculation } from '../controllers/calculation.controller';

const calculationRoutes = Router();

calculationRoutes.route('/').post(createCalculation);
calculationRoutes.route('/:calculationId').get(getCalculation);

export default calculationRoutes;
