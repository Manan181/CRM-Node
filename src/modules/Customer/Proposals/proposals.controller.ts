import proposalsModule from './proposals.module';
import Log from '../../../helpers/logger';
import { errResponse } from '../../../helpers/utils';
import sendEmail from '../../../helpers/sendEmail';
import { isEmpty } from 'lodash';
class ContactsController {
  private static logger: any = Log.getLogger();

  public static createProposal = async (req, res) => {
    try {
      if (isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      if (req.body.status === 'send') {
        let data = {
          //
        };
        await sendEmail.sendEmail('proposal', data, [req.body.email.toString()], 'Proposal is ready');
      }
      let subTotal = 0,
        total = 0,
        items = req.body.items;
      if (items.length > 0) {
        items.forEach((item) => {
          if (item.qtyOrHours && item.rate) {
            item.amount = item.qtyOrHours * item.rate;
          }
          subTotal += item.amount;
        });
        if (req.body.discount > 0) {
          if (req.body.discount.type === 'percent') {
            subTotal = subTotal - subTotal * (req.body.discount.number / 100);
          } else if (req.body.discount.type === 'fixed') {
            subTotal = subTotal - req.body.discount.number;
          }
        }
        total = (subTotal > 0 ? subTotal : 0) + req.body.adjustment;
      }
      req.body.subTotal = subTotal;
      req.body.total = total;

      await proposalsModule.createProposal(req, res);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, error.message, error);
    }
  };

  public static readProposal = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await proposalsModule.readProposal(req, res);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, error.message, error);
    }
  };

  public static readAllProposals = async (req, res) => {
    try {
      await proposalsModule.readAllProposals(res);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, error.message, error);
    }
  };

  public static updateProposal = async (req, res) => {
    try {
      if (isEmpty(req.params) || isEmpty(req.body)) {
        this.logger.error('Bad Request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await proposalsModule.updateProposal(req, res);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, error.message, error);
    }
  };

  public static deleteProposal = async (req, res) => {
    try {
      if (isEmpty(req.params)) {
        this.logger.error('Bad request!');
        return errResponse(404, 'Bad Request!', res);
      }
      await proposalsModule.deleteProposal(req, res);
    } catch (error) {
      this.logger.error(error);
      return errResponse(500, error.message, error);
    }
  };
}

export default ContactsController;
