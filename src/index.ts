import { Service } from './service';

const start = (): void => {
  const service = new Service();
  service.listen();
};

start();
