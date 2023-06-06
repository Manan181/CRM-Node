import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet'; // Security
import { DB } from './database';
import { Log } from './helpers/logger';
import { SendEmail } from './helpers/sendEmail';
import { config } from './config/config';
import CustomerRoutes from './routes/Customer/customer.route';
import StaffRoutes from './routes/Staff/staff.route';
import RoleRoutes from './routes/Roles/roles.route';
import { errResponse } from './helpers/utils';

dotenv.config();

// initialize database
DB.init();

export class App {
  protected app: Express = express();
  private logger = Log.getLogger();
  constructor() {
    const NODE_ENV = config.nodeEnv;
    const PORT = config.port as string;
    this.app.use(helmet());
    this.app.all('/*', (req: Request, res: Response, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Request-Headers', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization');
      res.header('Access-Control-Allow-Methods', 'PUT, PATCH, GET, POST, DELETE');
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
      } else {
        next();
      }
    });
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static('public'));
    this.app.get('/ping', (req: Request, res: Response) => res.json({ message: 'pong' }));
    this.app.use('/api/customers/', CustomerRoutes);
    this.app.use('/api/staff/', StaffRoutes);
    this.app.use('/api/roles/', RoleRoutes);
    this.app.listen(PORT, () => {
      this.logger.info(`The server is running in port localhost: ${config.port}`);
      this.app.use((err: any, req: any, res: any, next: () => void) => {
        if (err) {
          errResponse(500, 'Internal Server Error');
          SendEmail.sendEmail(null, null, [config.exceptionMail], `Admin API (${NODE_ENV}) - Unhandled Crash`, err.stack); // sending exception email
          return;
        }
        next();
      });
    });
  }
}
