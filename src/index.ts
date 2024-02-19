import { Service } from './service.js';

const start = (): void => {
  const service = new Service();
  service.listen();
};

start();
