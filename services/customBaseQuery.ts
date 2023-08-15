import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { RootState } from '@/store/store';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_DOMAIN,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    // setting default headers for reaquest
    headers.set('Accept', 'text/plain');

    if (token) headers.set('token', token);

    return headers;
  },
});
