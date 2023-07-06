import Proposal from './proposals.model';
import { Request, Response } from 'express';
import Log from '../../../helpers/logger';
import { sucResponse, errResponse } from '../../../helpers/utils';

class proposalsModule {
  private static logger: any = Log.getLogger();

  // create a new proposal
  public static createProposal = async (req: Request, res: Response) => {
    try {
      const proposal = new Proposal({
        subject: req.body.subject,
        related: req.body.related,
        customerId: req.body.customerId,
        leadId: req.body.leadId,
        project: req.body.project,
        date: req.body.date,
        openTill: req.body.openTill,
        currency: req.body.currency,
        discountType: req.body.discountType,
        tags: req.body.tags,
        allowComments: req.body.allowComments,
        status: req.body.status,
        assigned: req.body.assigned,
        to: req.body.to,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        country: req.body.country,
        email: req.body.email,
        phone: req.body.phone,
        items: req.body.items,
        itemIds: req.body.itemIds,
        discount: req.body.discount,
        adjustment: req.body.adjustment
      });
      const savedProposal = await proposal.save();
      return sucResponse('Proposal Saved!', res, savedProposal);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // get all proposals
  public static readAllProposals = async (res: Response) => {
    try {
      const proposals = await Proposal.find();
      if (proposals.length > 0) {
        return sucResponse(`${proposals.length} Proposals Found!`, res, proposals);
      } else {
        return errResponse(404, 'No Proposals Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // read a proposal
  public static readProposal = async (req: Request, res: Response) => {
    try {
      const proposalId = req.params.id;
      const proposal = await Proposal.findById(proposalId);
      if (!proposal) {
        this.logger.error('Proposal not found!');
        return errResponse(404, 'Proposal Not Found!', res, proposal);
      } else {
        this.logger.info('Proposal Found!', proposal);
        return sucResponse('Found Proposal!', res, proposal);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // update a proposal
  public static updateProposal = async (req: Request, res: Response) => {
    try {
      const update = {
        subject: req.body.subject,
        related: req.body.related,
        customerId: req.body.customerId,
        leadId: req.body.leadId,
        project: req.body.project,
        date: req.body.date,
        openTill: req.body.openTill,
        currency: req.body.currency,
        discountType: req.body.discountType,
        tags: req.body.tags,
        allowComments: req.body.allowComments,
        status: req.body.status,
        assigned: req.body.assigned,
        to: req.body.to,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        country: req.body.country,
        email: req.body.email,
        phone: req.body.phone,
        items: req.body.items,
        itemIds: req.body.itemIds,
        discount: req.body.discount,
        adjustment: req.body.adjustment
      };
      const proposal = await Proposal.updateOne({ _id: req.params.id }, { $set: update }, { upsert: true });
      if (proposal) {
        this.logger.info('Proposal Updated Successfully!');
        return sucResponse('Updated Proposal!', res, proposal);
      } else {
        this.logger.error('Proposal Not Found!');
        return errResponse(404, 'Proposal Not Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  // delete a proposal
  public static deleteProposal = async (req: Request, res: Response) => {
    try {
      const proposalId = req.params.id;
      const proposal = await Proposal.findByIdAndDelete(proposalId);
      if (!proposal) {
        this.logger.error('Proposal not found!');
        return errResponse(404, 'Proposal Not Found!', res, proposal);
      } else {
        return sucResponse('Proposal Deleted!', res, proposal);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default proposalsModule;
