import moment from 'moment-timezone';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, prettyPrint, colorize } = format;
import config from '../config/config';

class Log {
  public static getLogger() {
    return createLogger({
      format: combine(timestamp({ format: this.timestampFormat }), prettyPrint(), colorize()),
      level: 'debug',
      transports: [new transports.File({ filename: 'combined.log' }), new transports.File({ filename: 'error.log', level: 'error' }), new transports.Console()]
    });
  }
  private static timestampFormat: any = moment(new Date()).tz(config.timezone).format(config.dataBaseDateTimeFormat);
}

export default Log;
