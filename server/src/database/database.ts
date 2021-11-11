import { Sequelize } from 'sequelize';
import Client from '../models/client.model';
import City from '../models/city.model';
import CompanyType from '../models/companyType.model';


const sequelize = new Sequelize('sqlite::memory::');



export default sequelize;