export type LoginActionResponse = {
  success: boolean;
  code?: string;
  message: string;
  input?: Record<string, any>;
  errors?: string[];
  redirectPath?: string;
  data?: User | null;
};

export type User = {
  id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country_code?: string;
  created_at: string;
  updated_at: string;
  jwt_token?: string;
  addresses?: object;
  packages?: object;
  transactions?: object;
  is_account_verified?: boolean;
  is_account_locked?: boolean;
  role: string;
};
export type SignupActionResponse = {
  success?: boolean;
  debugMsg?: string;
  code?: string;
  message: string;
  input?: Record<string, any>;
  errors?: string[];
  redirectPath?: string;
};
