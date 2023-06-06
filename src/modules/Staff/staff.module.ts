import Staff from '../../models/Staff/staff.model';
import { Request } from 'express';
import { Log } from '../../helpers/logger';
import { sucResponse, errResponse } from '../../helpers/utils';

export class staffModule {
  private static logger: any = Log.getLogger();

  public static createStaff = async (req: Request) => {
    try {
      if (!req.body) {
        this.logger.error(404, 'Bad request');
        return errResponse(404, 'Bad Request');
      }
      const staff = new Staff({
        firstName: req.body.firstName,
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
        permissions: {
          role: req.body.permissions.role,
          permissions: req.body.permissions.permissions
        }
      });
      const savedStaff = await staff.save();
      return sucResponse(200, 'Staff Saved', savedStaff);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static readStaff = async (req: Request) => {
    try {
      if (!req.body) {
        this.logger.error(404, 'Bad request');
        return errResponse(404, 'Bad Request');
      }
      const staffId = req.params.staffId;
      const staff = await Staff.findById(staffId);
      if (!staff) {
        this.logger.error('Staff member not found');
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
      return sucResponse(200, `Found ${staffs.length} staff members`, staffs);
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
}

export default staffModule;
