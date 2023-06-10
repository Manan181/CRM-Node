import Joi from 'joi';

// --------------------------------Staffs--------------------------------
// for staff login purposes
export const validateLoginData = (login) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(36).required()
  });

  return loginSchema.validate(login);
};

// for staff register purposes
export const validateStaffData = (staff) => {
  const staffSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    profileImage: Joi.string(),
    hourlyRate: Joi.number(),
    phone: Joi.string(),
    facebookUrl: Joi.string().default(''),
    linkedinUrl: Joi.string().default(''),
    skypeUrl: Joi.string().default(''),
    defaultLanguage: Joi.string(),
    emailSignature: Joi.string().default(''),
    direction: Joi.string(),
    isAdministrator: Joi.boolean(),
    sendWelcomeEmail: Joi.boolean(),
    role: Joi.any(),
    permissions: Joi.object()
  });

  return staffSchema.validate(staff);
};

// --------------------------------Customers--------------------------------
// for validating create customer api
export const validateCustomerData = (customer) => {
  const AddressSchema = Joi.object({
    street: Joi.string().max(100),
    city: Joi.string().max(50),
    state: Joi.string().max(50),
    zipCode: Joi.string().max(10),
    country: Joi.string().max(50)
  });
  const customerSchema = Joi.object({
    active: Joi.boolean().default(true),
    phone: Joi.string().required(),
    website: Joi.string().uri(),
    groups: Joi.array().default([]),
    currency: Joi.string().default('USD').valid('USD', 'EUR'),
    defaultLanguage: Joi.string().default('en').valid('en', 'es'),
    company: Joi.string().max(100).required().messages({
      'any.required': 'Company is required',
      'string.max': 'Company exceeds the maximum length of 100 characters'
    }),
    vatNumber: Joi.string(),
    billingAddress: AddressSchema,
    shippingAddress: AddressSchema,
    customerAddress: AddressSchema
  });

  return customerSchema.validate(customer);
};

// --------------------------------Contacts--------------------------------
// for validating create contacts api
export const validateContactsData = (contact) => {
  const Permissions = Joi.object({
    invoices: Joi.boolean().default(true),
    estimates: Joi.boolean().default(true),
    contracts: Joi.boolean().default(true),
    proposals: Joi.boolean().default(true),
    support: Joi.boolean().default(true),
    projects: Joi.boolean().default(true)
  });
  const EmailNotifications = Joi.object({
    invoice: Joi.boolean().default(true),
    estimate: Joi.boolean().default(true),
    contract: Joi.boolean().default(true),
    creditNote: Joi.boolean().default(true),
    tickets: Joi.boolean().default(true),
    project: Joi.boolean().default(true),
    task: Joi.boolean().default(true)
  });
  const contactsSchema = Joi.object({
    customerId: Joi.any().required(),
    profileImageUrl: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    position: Joi.string(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    direction: Joi.string(),
    isPrimaryContact: Joi.boolean(),
    sendWelcomeEmail: Joi.boolean(),
    sendSetPasswordEmail: Joi.boolean(),
    permissions: Permissions,
    emailNotifications: EmailNotifications
  });

  return contactsSchema.validate(contact);
};

// for validating contact reset password api
export const validateContactPassword = (contact) => {
  const contactPassword = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  });

  return contactPassword.validate(contact);
};
