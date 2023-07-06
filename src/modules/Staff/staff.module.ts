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
      return sucResponse('Staff Saved!', res, savedStaff);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readStaff = async (req: Request, res: Response) => {
    try {
      const staffId = req.params.id;
      const staff = await Staff.findById(staffId);
      if (!staff) {
        this.logger.error('Staff Member Not Found!');
        return errResponse(404, 'Staff Member Not Found!', res, staff);
      } else {
        this.logger.info('Staff Member Found!', staff);
        return sucResponse('Found Staff Member!', res, staff);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllStaff = async (res: Response) => {
    try {
      const staffs = await Staff.find();
      if (staffs.length > 0) {
        return sucResponse(`${staffs.length} Staffs Found!`, res, staffs);
      } else {
        return errResponse(404, 'No Staff Members Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateStaff = async (req: Request, res: Response) => {
    try {
      const staffId = req.params.id;
      const staff = await Staff.findById(staffId);
      if (staff) {
        staff.set(req.body);
        await staff.save();
        return sucResponse('Updated Staff Member', res, staff);
      } else {
        this.logger.error('Staff Member Not Found');
        return errResponse(404, 'Staff Member Not Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteStaff = async (req: Request, res: Response) => {
    try {
      const staffId = req.params.id;
      const staff = await Staff.findByIdAndDelete(staffId);
      if (!staff) {
        this.logger.error('Staff member not found!');
        return errResponse(404, 'Staff Member Not Found!', res, staff);
      } else {
        return sucResponse('Staff Member Deleted!', res, staff);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static checkStaffEmailExists = async (email: string, res: Response) => {
    try {
      const staffDetail = await Staff.findOne({ email: email });
      return staffDetail ? staffDetail : {};
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, `Something Went Wrong: ${error.message}`, res);
    }
  };

  public static loginStaff = async (req, res) => {
    try {
      const { email, password } = req.body;
      const staff = await Staff.login(email, password);
      const token = Jwt.getAuthToken({ userId: staff._id });
      await res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
      return sucResponse('User Logged In', res, staff);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, `Something Went Wrong: ${error.message}`, res);
    }
  };
}

export default staffModule;
