import { Request } from 'express';
import fs from 'fs';
import { Buffer } from 'buffer';
import { errResponse } from './utils';
import Log from '../helpers/logger';

const logger = Log.getLogger();

const uploadImage = async (req: Request) => {
  let matches = req.body.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    logger.info('Invalid Input String!');
    return errResponse(400, 'Invalid Input String');
  }
  const response: { type: string; data: Buffer } = {
    type: matches[1],
    data: Buffer.from(matches[2], 'base64')
  };
  const decodedImg = response;
  const imageBuffer = decodedImg.data;
  const type = decodedImg.type;
  const extension = type.split('/')[1]; // Extract the extension from the MIME type
  const fileName = `${req.body.name}${Date.now()}.${extension}`;
  try {
    fs.writeFileSync(`./library/contacts/contactProfileImages/${fileName}`, imageBuffer, 'utf8');
    logger.info('success: writeFileSync');
  } catch (e) {
    return errResponse(400, `Error:writeFileSync., ${e.message}`);
  }
};

export default uploadImage;
