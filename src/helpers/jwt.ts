import * as jwt from 'jsonwebtoken';
import config from '../config/config';

class Jwt {
  /*
   * getAuthToken
   */
  public static getAuthToken(data: { userId }) {
    return jwt.sign(data, config.accessTokenSecret);
  }

  /*
   * decodeAuthToken
   */
  public static decodeAuthToken(token: string) {
    if (token) {
      try {
        return jwt.verify(token, config.accessTokenSecret);
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}

export default Jwt;
