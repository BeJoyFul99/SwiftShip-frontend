export type LoginActionResponse = {
  success: boolean;
  debugMsg?: string;
  message: string;
  input?: Record<string, any>;
  errors?: string[];
};
