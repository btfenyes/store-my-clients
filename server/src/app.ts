import express, { Application } from 'express';
import clientRouter from './routes/client';
import sequelize from './database/database';
import { urlencoded } from 'body-parser';

const app: Application = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use('/client', clientRouter);

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

