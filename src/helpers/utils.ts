let res = (status: string, statusCode: number, message: string, data: object) => {
  return { status, statusCode, message, data };
};

export class utils {
  // Function to create a success response object
  public static sucResponse(statusCode: number, msg: string, data: object) {
    return res('Success', statusCode || 200, msg, data);
  }

  // Function to create an error response object
  public static errResponse(statusCode: number, msg: string, data: object) {
    return res('Fail', statusCode, msg, data);
  }

  // Function to validate an email address
  public static validateEmail(email: string) {
    var regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regEx.test(email) === false) {
      return false;
    }
    return true;
  }

  // Function to validate a name field
  public static validateName(nameField: string) {
    var regEx = /^[A-Za-z\s]{3,20}$/;
    if (regEx.test(nameField) === false) {
      return false;
    }
    return true;
  }
}
