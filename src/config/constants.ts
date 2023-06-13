import * as Enum from 'enum';
import { Tables } from '../config/tables';

export class Constants {
  public static readonly TIMEZONE = 'Asia/Kolkata';
  public static readonly SUCCESS = 'SUCCESS';
  public static readonly ERROR = 'ERROR';
  public static readonly BAD_DATA = 'BAD_DATA';
  public static readonly CODE = 'CODE';
  public static readonly DATA_BASE_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  public static readonly DISPLAY_DATE_FORMAT = 'DD-MM-YYYY';
  public static readonly UNAUTHORIZED_CODE = 401;
  public static readonly NOT_FOUND_CODE = 404;
  public static readonly SUCCESS_CODE = 200;
  public static readonly INTERNAL_SERVER_ERROR_CODE = 500;
  public static readonly FAIL_CODE = 400;
  public static readonly DUPLICATE_CODE = 409;
  public static readonly RANDOM_CODE_STR_LENGTH = 6;
  public static readonly EXPIRY_MINUTES = 5;
  public static readonly TOKEN_EXPIRE_TIME = 120;
  public static readonly FRONT_END_FORGOT_PASSWORD_ROUTE = 'reset-password';
  public static readonly HASH_STRING_LIMIT = 12;
  public static readonly PRECONDITION_FAILED = 412;
  public static readonly DEFAULT_LIMIT = 10;
  public static readonly DEFAULT_PAGE = 1;
  public static readonly MEDIA_THUMB_TYPE = 'GENERAL';
  public static readonly PASSWORD_REGEX = '^(?=.*[0-9])(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$%^&*+=])(.{8,15})$';

  public static readonly LANGUAGES = new Enum({ en: 1, ar: 2 });

  public static readonly MASTER_TABLES = {
    [Tables.DESIGNATION]: {},
    [Tables.DOMAIN]: {},
    [Tables.MODULE]: {
      isEnable: true,
      isStaff: true
    },
    [Tables.COUNTRY]: {},
    [Tables.SUBMODULE]: {
      isEnable: true
    }
  };
}
