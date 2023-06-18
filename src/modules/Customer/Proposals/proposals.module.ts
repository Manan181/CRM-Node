import Proposal from './proposals.model';
import { Request } from 'express';
import Log from '../../../helpers/logger';
import { sucResponse, errResponse } from '../../../helpers/utils';

class proposalsModule {
  private static logger: any = Log.getLogger();

  // create a new proposal
  public static createProposal = async (req: Request) => {
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
      return sucResponse(200, 'Proposal Saved!', savedProposal);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // get all proposals
  public static readAllProposals = async () => {
    try {
      const proposals = await Proposal.find();
      if (proposals.length > 0) {
        return sucResponse(200, `${proposals.length} Proposals Found!`, proposals);
      } else {
        return errResponse(404, 'No Proposals Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // read a proposal
  public static readProposal = async (req: Request) => {
    try {
      const proposalId = req.params.id;
      const proposal = await Proposal.findById(proposalId);
      if (!proposal) {
        this.logger.error('Proposal not found!');
        return errResponse(404, 'Proposal Not Found!', proposal);
      } else {
        this.logger.info('Proposal Found!', proposal);
        return sucResponse(200, 'Found Proposal!', proposal);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // update a proposal
  public static updateProposal = async (req: Request) => {
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
        return sucResponse(201, 'Updated Proposal!', proposal);
      } else {
        this.logger.error('Proposal Not Found!');
        return errResponse(404, 'Proposal Not Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  // delete a proposal
  public static deleteProposal = async (req: Request) => {
    try {
      const proposalId = req.params.id;
      const proposal = await Proposal.findByIdAndDelete(proposalId);
      if (!proposal) {
        this.logger.error('Proposal not found!');
        return errResponse(404, 'Proposal Not Found!', proposal);
      } else {
        return sucResponse(200, 'Proposal Deleted!', proposal);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };
}

export default proposalsModule;
