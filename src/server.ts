import App from '@/app';
import AuthRoute from '@routes/auth.route';
import validateEnv from '@utils/validateEnv';
import AdminRoute from './routes/admin.route';
import CarRoutes from './routes/cars.route';
validateEnv();

(async () => {
  const app = new App([new AuthRoute(), new AdminRoute(), new CarRoutes()]);
  await app.connectToDatabase();
  app.listen();
})();
