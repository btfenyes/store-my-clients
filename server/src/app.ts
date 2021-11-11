import express, { Application } from 'express';
import clientRouter from './routes/client';
import companyTypeRouter from './routes/copmanyType';
import cityRouter from './routes/city';
import sequelize from './database/database';
import { urlencoded } from 'body-parser';
import Client from './models/client.model';
import City from './models/city.model';
import CompanyType from './models/companyType.model';

const app: Application = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use('/client', clientRouter);
app.use('/companyType', companyTypeRouter);
app.use('/city', cityRouter);

const startApp = async () => {
  await sequelize.sync();
  await sequelize.authenticate();

  const companyTypes = [
    { name: 'Kft' },
    { name: 'Bt' },
  ];

  await Promise.all(companyTypes.map(async (type) => await CompanyType.create(type)));

  const cities = [
    { name: 'Budapest' },
    { name: 'Sopron' },
    { name: 'Szeged' },
  ];

  await Promise.all(cities.map(async (city) => await City.create(city)));

  const clients = [
    {
      name: 'Ügyfél Bt',
      taxNumber: '12312312312',
      companyRegistrationNumber: '12312373291',
      address: 'Fő utca 1',
      phone: '061777111',
      bankAccount: '6346264723467261231',
      comment: 'Teszt megjegyzés',
      CityId: 2,
      CompanyTypeId: 2,
    },
    {
      name: 'Kliens Kft',
      taxNumber: '3845734985',
      companyRegistrationNumber: '3485u3345',
      address: 'Mellék utca 34',
      phone: '061123123',
      bankAccount: '77346278346783246',
      comment: 'Megjegyzés teszt',
      CityId: 1,
      CompanyTypeId: 1,
    },
  ];

  await Promise.all(clients.map(async (client) => await Client.create(client)));

  app.listen(5000, () => {
    console.log('Server is running');
  });
};

try {
  startApp();  
} catch (error) {
  console.log(`Cannot start server: ${error}`);
}

