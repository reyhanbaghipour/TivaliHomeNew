import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  TGetCitiesQueryPayload,
  TGetCitiesResponse,
  TGetSexesQueryResponse,
  TGetStatesQueryPayload,
  TGetStatesResponse,
} from './interface';

export const citiesAndStatesApi = createApi({
  reducerPath: 'citiesAndStatesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_DOMAIN }),
  endpoints: (builder) => ({
    getStates: builder.query<TGetStatesResponse, TGetStatesQueryPayload>({
      query: (params) => ({
        url: 'BaseData/GetAreas?pageSize=36',
        params,
      }),
    }),
    getCities: builder.query<TGetCitiesResponse, TGetCitiesQueryPayload>({
      query: (params) => ({
        url: 'BaseData/GetCities',
        params,
      }),
    }),
    getSexes: builder.query<TGetSexesQueryResponse, void>({
      query: () => ({
        url: 'BaseData/GetSex',
      }),
    }),
  }),
});
export const { useGetStatesQuery, useLazyGetCitiesQuery, useGetSexesQuery } =
  citiesAndStatesApi;
