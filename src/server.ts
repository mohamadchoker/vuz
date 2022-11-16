import App from '@/app';
import AuthRoute from '@routes/auth.route';
import validateEnv from '@utils/validateEnv';
import AdminRoute from './routes/admin.route';
import CarRoutes from './routes/cars.route';
import process from 'process';
import { logger } from '@utils/logger';
validateEnv();

process.on('unhandledRejection', (reason, promise) => {
  logger.error('unhandledRejection', promise, 'reason', reason);
  console.log('unhandledRejection', promise, 'reason', reason);
});
process.on('uncaughtException', err => {
  logger.error('uncaughtError', err);
});

(async () => {
  const app = new App([new AuthRoute(), new AdminRoute(), new CarRoutes()]);
  await app.connectToDatabase();
  app.listen();
})();
