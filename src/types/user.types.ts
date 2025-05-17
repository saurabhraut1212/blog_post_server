export interface IUser {
  _id: string;
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ServiceResult {
  success: boolean;
  message: string;
  data?: any;
  token?: string;
}
