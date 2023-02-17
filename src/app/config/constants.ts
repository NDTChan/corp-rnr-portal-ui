export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error',
};

export const PATTERN = {
  HKID: /^([A-Z]{1,2})([0-9]{6})\(([0-9A-F]{1})\)$/,
  DOB: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})/,
};

export const DOC_TYPE = {
  HKID: 'HKID',
  OLD_HKID: 'HKID_2003',
  NEW_HKID: 'HKID_2018',
  PASSPORT: 'PASS',
};

export const YES = 'Y';
export const NO = 'N';

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';
