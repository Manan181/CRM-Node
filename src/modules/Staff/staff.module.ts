import Staff from './staff.model';
import { Request, Response } from 'express';
import Log from '../../helpers/logger';
import { sucResponse, errResponse } from '../../helpers/utils';
import Jwt from '../../helpers/jwt';

class staffModule {
  private static logger: any = Log.getLogger();

  public static createStaff = async (req: Request, res: Response) => {
    try {
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
      const token = Jwt.getAuthToken({ userId: staff._id });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
      const savedStaff = await staff.save();
      return sucResponse(200, 'Staff Saved!', savedStaff);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static readStaff = async (req: Request) => {
    try {
      const staffId = req.params.id;
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
      const staffId = req.params.id;
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
      const staffId = req.params.id;
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

  public static checkStaffEmailExists = async (email: string) => {
    try {
      const staffDetail = await Staff.findOne({ email: email });
      return staffDetail ? staffDetail : {};
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, `Something Went Wrong: ${error.message}`);
    }
  };

  public static loginStaff = async (req, res) => {
    try {
      const { email, password } = req.body;
      const staff = await Staff.login(email, password);
      const token = Jwt.getAuthToken({ userId: staff._id });
      await res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
      return sucResponse(200, 'User Logged In', staff);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, `Something Went Wrong: ${error.message}`);
    }
  };
}

export default staffModule;
