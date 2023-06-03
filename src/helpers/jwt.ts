import * as jwt from 'jsonwebtoken';
import { config } from '../config/config';

export class Jwt {
  /*
   * getAuthToken
   */
  public static getAuthToken(data: { userId: number }) {
    return jwt.sign(data, config.jwtSecret);
  }

  /*
   * decodeAuthToken
   */
  public static decodeAuthToken(token: string) {
    if (token) {
      try {
        return jwt.verify(token, config.jwtSecret);
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
