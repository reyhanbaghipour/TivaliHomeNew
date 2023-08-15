import { TApiError } from '../interface';

export type TAuthenticatePayload = {
  username: string;
  password: string;
};

export type TAuthenticateResponse = {
  status: number;
  id: number;
  error: null | TApiError;
  entity: {
    id: number;
    userName: string;
    fullName: string;
    imageUrl: string;
    token: string;
  };
  total: null;
};

export type TRegisterResponse = {
  entity: null;
  error: null | { code: string; message: string };
  id: number;
  status: number;
  total: null;
};

export type TSendOtpResponse = {
  status: number;
  id: number;
  error: null | TApiError;
  total: null;
};
