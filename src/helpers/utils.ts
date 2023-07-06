import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

let format = (status: string, statusCode: number, message: string, data: object) => {
  return { status, statusCode, message, data };
};

// Function to create a success response object
const sucResponse = (msg: string, res: Response, data: object) => {
  return res.status(200).json(format('Success', 200, msg, data)).end();
};

// Function to create an error response object
const errResponse = (statusCode: number, msg: string, res: Response, data = {}) => {
  return res.status(statusCode).json(format('Fail', statusCode, msg, data)).end();
};

// Function to validate an email address
const validateEmail = (email: string) => {
  var regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regEx.test(email) === false) {
    return false;
  }
  return true;
};

// Function to validate a name field
const validateName = (nameField: string) => {
  var regEx = /^[A-Za-z\s]{3,20}$/;
  if (regEx.test(nameField) === false) {
    return false;
  }
  return true;
};

const imageUpload = async (file) => {
  const uploadsDir = path.resolve(__dirname, '..', 'uploads');
  const tempDir = await fs.promises.mkdtemp(`${uploadsDir}/`);
  const ext = path.extname(file.name);
  const filename = path.join(tempDir, `${uuidv4()}${ext}`);
  await file.mv(filename);
  return `${path.basename(tempDir)}/${path.basename(filename)}`;
};

export { sucResponse, errResponse, validateEmail, validateName, imageUpload };
