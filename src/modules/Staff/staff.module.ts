import Staff from './staff.model';
import { Request } from 'express';
import Log from '../../helpers/logger';
import { sucResponse, errResponse } from '../../helpers/utils';
import bcrypt from 'bcryptjs';
import { validateStaffData } from '../../helpers/validations';

class staffModule {
  private static logger: any = Log.getLogger();

  public static createStaff = async (req: Request) => {
    try {
      if (!req.body) {
        this.logger.error(404, 'Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      const { error } = validateStaffData(req.body);
      if (error) {
        this.logger.error(400, 'Bad Request!', error);
        return errResponse(400, 'Bad Request!', error);
      }
      const staff = new Staff({
        firstName: req.body.firstName ?? '',
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        hourlyRate: req.body.hourlyRate,
        facebookUrl: req.body.facebookUrl,
        linkedinUrl: req.body.linkedinUrl,
        skypeUrl: req.body.skypeUrl,
        defaultLanguage: req.body.defaultLanguage,
        emailSignature: req.body.emailSignature,
        direction: req.body.direction,
        isAdministrator: req.body.isAdministrator,
        sendWelcomeEmail: req.body.sendWelcomeEmail,
        notStaffMember: req.body.notStaffMember,
        profileImageUrl: req.body.profileImageUrl,
        role: req.body.role,
        permissions: {
          role: req.body.permissions.role,
          permissions: req.body.permissions.permissions
        }
      });
      const savedStaff = await staff.save();
      return sucResponse(200, 'Staff Saved!', savedStaff);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static readStaff = async (req: Request) => {
    try {
      if (!req.body) {
        this.logger.error(404, 'Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      const staffId = req.params.staffId;
      const staff = await Staff.findById(staffId);
      if (!staff) {
        this.logger.error('Staff Member Not Found!');
        return errResponse(404, 'Staff Member Not Found!', staff);
      } else {
        this.logger.info('Staff Member Found!', staff);
        return sucResponse(200, 'Found Staff Member!', staff);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static readAllStaff = async () => {
    try {
      const staffs = await Staff.find();
      if (staffs.length > 0) {
        return sucResponse(200, `${staffs.length} Staffs Found!`, staffs);
      } else {
        return errResponse(404, 'No Staff Members Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static updateStaff = async (req: Request) => {
    try {
      if (!req.params) {
        this.logger.error(404, 'Bad request');
        return errResponse(404, 'Bad Request');
      }
      const staffId = req.params.staffId;
      const staff = await Staff.findById(staffId);
      if (staff) {
        staff.set(req.body);
        await staff.save();
        return sucResponse(201, 'Updated Staff Member', staff);
      } else {
        this.logger.error('Staff Member Not Found');
        return errResponse(404, 'Staff Member Not Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static deleteStaff = async (req: Request) => {
    try {
      if (!req.params) {
        this.logger.error(404, 'Bad Request!');
        return errResponse(404, 'Bad Request!');
      }
      const staffId = req.params.staffId;
      const staff = await Staff.findByIdAndDelete(staffId);
      if (!staff) {
        this.logger.error('Staff member not found!');
        return errResponse(404, 'Staff Member Not Found!', staff);
      } else {
        return sucResponse(200, 'Staff Member Deleted!', staff);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static loginAdmin = async (req) => {
    try {
      const { email, password } = req.body;
      const staffDetail = await Staff.findOne({ email: email });
      // validate email & password
      if (!email && !password) {
        return errResponse(400, 'Please fill all the required fields!');
      }
      // check is user is exist or not
      if (!staffDetail) {
        this.logger.error('Staff does not exist!');
        return errResponse(400, 'Staff does not exist!');
      }
      try {
        // const isMatch = await bcrypt.compare(password, staffDetail.password);
        if (await bcrypt.compare(password, staffDetail.password)) {
          return sucResponse(200, 'Staff Login Successful!', staffDetail);
        } else {
          this.logger.error('Password Incorrect!');
          return errResponse(200, 'Password Incorrect!');
        }
      } catch (error) {
        this.logger.error(error);
        return errResponse(500, `Something Went Wrong: ${error.message}`);
      }
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, `Something Went Wrong: ${error.message}`);
    }
  };
}

export default staffModule;
