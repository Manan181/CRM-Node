/* eslint-disable no-unused-vars */
export class Tables {
  public static readonly ADMIN = 'admin';
  public static readonly MODULE = 'modules';
  public static readonly SUBMODULE = 'subModules';
  public static readonly HOME_SERVICES = 'homeServices';
  public static readonly SERVICE_BOOKINGS = 'serviceBookings';
  public static readonly COMPLAINTS = 'complaints';
  public static readonly TEST_DRIVE = 'testDrives';
  public static readonly ROADSIDE_ASSISTANCES = 'roadsideAssistances';
  public static readonly CLIENTS = 'clients';
  public static readonly STAFF = 'staff';
  public static readonly CONTACTS = 'contacts';
  public static readonly COUNTRY = 'country';
  public static readonly COUNTRY_DETAILS = 'countryDetails';
  public static readonly DESIGNATION = 'designation';
  public static readonly DOMAIN = 'domain';
  public static readonly ATTACHMENT = 'attachments';
  public static readonly ATTACHMENT_THUMB = 'attachmentThumbs';
}

export enum ClientTable {
  ID = 'id',
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
  PHONE_NUMBER = 'phoneNumber',
  ADDRESS1 = 'address1',
  ADDRESS2 = 'address2',
  CITY = 'city',
  COUNTRY = 'country',
  API_END_POINT = 'apiEndPoint',
  DEV_DOMAIN = 'devDomin',
  STAGE_DOMIN = 'stageDomin',
  PROD_DOMIN = 'prodDomin',
  IS_ENABLE = 'isEnable',
  IS_DELETE = 'isDelete',
  ENABLE_CONFIG = 'enableConfig',
  CREATED_AT = 'createdAt'
}

export enum ContactTable {
  ID = 'id',
  CLIENT_ID = 'clientId',
  DESIGNATION_ID = 'designationId',
  FIRST_NAME = 'firstname',
  LAST_NAME = 'lastname',
  PHONE_NUMBER = 'phoneNumber',
  EMAIL = 'email',
  IS_ENABLE = 'isEnable',
  IS_DELETE = 'isDelete',
  CREATED_AT = 'createdAt'
}

// modules table's fields
export enum ModuleTable {
  ID = 'id',
  NAME = 'name',
  IS_ENABLE = 'isEnable',
  CAN_DISABLE = 'canDisable',
  IS_LOGIN_REQUIRED = 'isLoginRequired',
  UPDATED_AT = 'updatedAt'
}

// submodules table's fields
export enum SubModuleTable {
  ID = 'id',
  MODULE_ID = 'moduleId',
  NAME = 'name',
  IS_ENABLE = 'isEnable',
  CAN_DISABLE = 'canDisable',
  UPDATED_AT = 'updatedAt',
  IS_FOR_CAROUSEL = 'isForCarousel'
}

export enum HomeServiceTable {
  ID = 'id',
  IS_SCHEDULED = 'isScheduled',
  ENABLE_QUANTITY = 'enableQuantity',
  IS_LOYALITY = 'isLoyality',
  SKU = 'sku',
  ESTIMATED_HOURS = 'estimatedHour',
  ESTIMATED_MINUTES = 'estimatedMinutes',
  IS_ENABLE = 'isEnable',
  TOTAL_VIEWS = 'totalViews',
  TOTAL_BOOKED = 'totalBooked',
  TOTAL_SALES = 'totalSales',
  IS_DELETE = 'isDeleted',
  CREATED_AT = 'createdAt'
}

export enum ServiceBookingsTable {
  ID = 'id',
  APPOINTMENTID = 'appointmentId',
  BOOKING_ID = 'bookingId',
  USER_ID = 'userId',
  USER_VEHICLE_ID = 'userVehicleId',
  DEALERSHIP_LOCATION_ID = 'dealershipLocationId',
  BOOKING_DATE = 'bookingDate',
  BOOKING_TYPE = 'bookingType',
  ASSIGNEE = 'assignee',
  IS_DELETED = 'isDeleted',
  STATUS = 'status',
  CREATED_AT = 'createdAt',
  BOOKING_TIME = 'bookingTime'
}

export enum TestDriveTable {
  ID = 'id',
  VEHICLE_ID = 'vehicleId',
  USER_ID = 'userId',
  DEALERSHIP_LOCATION_ID = 'dealershipLocationId',
  ASSOCIATED_STAFF_ID = 'associatedStaffId',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  START_TIME = 'startTime',
  END_TIME = 'endTime',
  TYPE = 'type',
  CUSTOMER_NAME = 'customerName',
  CUSTOMER_EMAIL = 'customerEmail',
  CUSTOMER_MOBILE = 'customerMobile',
  CUSTOMER_LOCATION_LAT = 'customerLocationLat',
  CUSTOMER_LOCATION_LONG = 'customerLocationLong',
  BOOKING_SOURCE = 'bookingSource',
  MILAGE_OUT = 'mileageOut',
  MILAGE_IN = 'mileageIn',
  FUEL_OUT = 'fuelOut',
  FUEL_IN = 'fuelIn',
  IS_CANCEL = 'isCancel',
  SALES_PERSON_NAME = 'salesPersonName',
  CANCEL_BY = 'cancelBy',
  REASON_FOR_CANCELLATION = 'reasonForCancellation'
}

export enum RoadsideAssistancesTable {
  ID = 'id',
  USER_ID = 'userId',
  REQUEST_DATE_TIME = 'requestDataTime',
  LATITUDE = 'latitude',
  LONGITUDE = 'longitude',
  DEALERSHIP_LOCATION_ID = 'nearestDealershipLocationId',
  CREATED_AT = 'createdAt'
}

export enum ComplaintsTable {
  ID = 'id',
  DEVICE_ID = 'deviceId',
  USER_ID = 'userId',
  FULL_NAME = 'fullName',
  PHONE_NUMBER = 'phoneNumber',
  EMAIL = 'email',
  SUBJECT = 'subject',
  DETAILS = 'details',
  CREATED_AT = 'createdAt',
  STATUS = 'status'
}

// country table's fields
export enum CountryTable {
  ID = 'id'
}

// countryDetails table's fields
export enum CountryDetailTable {
  ID = 'id',
  COUNTRY_ID = 'countryId',
  LANGUAGE_ID = 'languageId',
  NAME = 'name'
}

// attachments table's fields
export enum AttachmentTable {
  ID = 'id',
  NAME = 'name',
  TYPE = 'type'
}

// attachment thumbs table's fields
export enum AttachmentThumbTable {
  ID = 'id',
  ATTACHMENT_ID = 'attachmentId',
  NAME = 'name',
  TYPE = 'type'
}
