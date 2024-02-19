import express, { Request, Response, Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import calculationRoutes from './routes/calculation.routes.js';
import interestRateRoutes from './routes/interestRate.routes.js';
import { HttpResponse } from './utils/httpResponse.util.js';
import { HttpError } from './utils/httpError.util.js';
import { Code } from './enum/code.enum.js';
import { Status } from './enum/status.enum.js';

export class Service {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = 'Service is running on port';
  private readonly ROUTE_NOT_FOUND = 'Route does not exist in this API';

  constructor(private readonly port: string | number = process.env.PORT || 3000) {
    this.app = express();
    this.middleware();
    this.routes();
  }

  listen(): void {
    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING} ${this.port}`);
  }

  private middleware(): void {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors({ origin: '*' }));
  }

  private routes(): void {
    this.app.get('/', (_req: Request, res: Response) =>
      res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Credit Calculator Service v1.0.0 by Jakub Cieślik'))
    );

    this.app.use('/calculation', calculationRoutes);
    this.app.use('/interestRate', interestRateRoutes);

    this.app.all('*', (_req: Request, res: Response) =>
      res.status(Code.NOT_FOUND).send(new HttpError(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND))
    );
  }
}
