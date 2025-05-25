// API BASE URL
export const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

// AUTH
export const TOKEN = "__MEDINTELL_TOKEN__";
export const REFRESHTOKEN = "__MEDINTELL_REFRESH_TOKEN__";

const BASE_AUTH = "/auth/jwt";
export const CREATE_JWT = `${BASE_AUTH}/create/`;
export const REFRESH_JWT = `${BASE_AUTH}/refresh/`;
export const VERIFY_JWT = `${BASE_AUTH}/verify/`;

// Accounts
export const ACTIVATE = "/users/activation/";
export const RESET_PASSWORD = "/users/reset_password/";
export const RESET_PASSWORD_CONFIRM = "/users/reset_password_confirm/";
export const ME = "/users/me/";
export const USERS = "/users/";

// Reports
export const REPORTS = "/reports/";
export const UPLOAD = "/upload/";

export const PROCESSING = "/processing/";
// Billing
export const BILLING = "/billing/";
