import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  TAuthenticatePayload,
  TAuthenticateResponse,
  TRegisterResponse,
  TSendOtpResponse,
} from './interface';
import { RegisterFormValuesInterface } from '@/components/templates/register/interface';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_DOMAIN }),
  endpoints: (builder) => ({
    authenticate: builder.mutation<TAuthenticateResponse, TAuthenticatePayload>(
      {
        query: ({ password, username }) => ({
          url: 'Autorize/authenticate',
          method: 'POST',
          body: { password, username },
        }),
      }
    ),
    register: builder.mutation<TRegisterResponse, RegisterFormValuesInterface>({
      query: (body) => ({
        url: 'User/Register',
        method: 'POST',
        body,
      }),
    }),
    resendOtp: builder.mutation<TSendOtpResponse, string>({
      query: (phoneNumber) => ({
        url: 'User/ReSendOtp',
        method: 'POST',
        body: { userName: phoneNumber },
      }),
    }),
    verifyOtp: builder.mutation<
      { status: number },
      { userId: string; otp: string }
    >({
      query: ({ userId, otp }) => ({
        url: 'User/ValidateOtp',
        method: 'POST',
        body: { userId, otp },
      }),
    }),
    setPassword: builder.mutation<
      { status: number },
      { id: string; password: string; rePassword: string }
    >({
      query: (body) => ({
        url: 'User/SetPassword',
        method: 'POST',
        body,
      }),
    }),
  }),
});
export const {
  useAuthenticateMutation,
  useRegisterMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useSetPasswordMutation,
} = authApi;
