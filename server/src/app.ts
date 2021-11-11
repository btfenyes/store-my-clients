import express, { Application } from 'express';
import clientRouter from './routes/client';
import companyTypeRouter from './routes/copmanyType';
import cityRouter from './routes/city';
import sequelize from './database/database';
import { urlencoded } from 'body-parser';

const app: Application = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use('/client', clientRouter);
app.use('/companyType', companyTypeRouter);
app.use('/city', cityRouter);

const startApp = async () => {
  await sequelize.sync();
  await sequelize.authenticate();

  app.listen(5000, () => {
    console.log('Server is running');
  });
};

try {
  startApp();  
} catch (error) {
  console.log(`Cannot start server: ${error}`);
}

