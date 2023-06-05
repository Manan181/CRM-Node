let res = (status: string, statusCode: number, message: string, data: object) => {
  return { status, statusCode, message, data };
};

// Function to create a success response object
const sucResponse = (statusCode: number, msg: string, data: object) => {
  return res('Success', statusCode || 200, msg, data);
};

// Function to create an error response object
const errResponse = (statusCode: number, msg: string, data = {}) => {
  return res('Fail', statusCode, msg, data);
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

export { sucResponse, errResponse, validateEmail, validateName };
