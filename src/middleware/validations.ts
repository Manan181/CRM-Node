import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import Log from '../helpers/logger';
import { errResponse } from '../helpers/utils';
const logger = Log.getLogger();

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      logger.error(error);
      errResponse(422, `Validation Error: ${error.message}`, res);
    }
  };
};

// --------------------------------Estimates--------------------------------
export const validateEstimatesData = {};

// --------------------------------Contracts--------------------------------
export const validateContractsData = {};

// --------------------------------Proposals--------------------------------
export const validateProposalsData = {};

// --------------------------------Projects--------------------------------
export const validateProjectsData = {};

// --------------------------------Tasks--------------------------------
export const validateTasksData = {};

// --------------------------------Tickets--------------------------------
export const validateTicketsData = {};

// --------------------------------Expenses--------------------------------
export const validateExpensesData = {};

// --------------------------------Payments--------------------------------
export const validatePaymentsData = {};

// --------------------------------Credit Notes--------------------------------
export const validateCreditNotesData = {};

// --------------------------------Items--------------------------------
export const validateItemsData = {};

// --------------------------------Subscriptions--------------------------------
export const validateSubscriptionsData = {};

// --------------------------------Knowledge Base--------------------------------
export const validateKnowledgeBaseData = {};

// --------------------------------Email Templates--------------------------------
export const validateEmailTemplatesData = {};

// --------------------------------Settings--------------------------------
export const validateSettingsData = {};

// --------------------------------Leads--------------------------------
export const validateLeadsData = {};

// --------------------------------Estimate Requests--------------------------------
export const validateEstimateRequestsData = {};

// --------------------------------Surveys--------------------------------
export const validateSurveysData = {};

// --------------------------------Reports--------------------------------
export const validateReportsData = {};
