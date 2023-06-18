import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet'; // Security
import DB from './database';
import Log from './helpers/logger';
import SendEmail from './helpers/sendEmail';
import config from './config/config';
import Routes from './routes';
import { errResponse } from './helpers/utils';
import fileUpload from 'express-fileupload';
import timeout from 'connect-timeout';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

// initialize database
DB.init();

class App {
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
    this.app.use(cookieParser());
    this.app.use(timeout('5s'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
    this.app.use(express.static(path.resolve(__dirname, '..', 'dist/uploads'))); // Static File Path
    this.app.use(fileUpload({ parseNested: true }));
    const routes = new Routes(NODE_ENV);
    this.app.use('/api/', routes.path());
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

export default App;
