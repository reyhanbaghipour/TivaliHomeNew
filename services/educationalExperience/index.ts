import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../customBaseQuery';
import { TGetArea, TGetClassHistoryResponse, TGetIntershipClass, TGetIntershipHistoryResponse } from './interface';

export const EducationalExperienceApi = createApi({
  reducerPath: 'educationalExperienceApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getIntershipHistory: builder.query<TGetIntershipHistoryResponse, void>({
      query: () => ({
        url: `User/GetIntershipHistory`,
      }),
    }),
    getClassHistory: builder.query<TGetClassHistoryResponse, void>({
      query: () => ({
        url: `User/GetClassHistory`,
      }),
    }),
    getIntershipClass:builder.query<TGetIntershipClass , void>(
      {
        query:() => ({
          url:`BaseData/GetIntershipClass`
        })
      }
    ),
    getAreas:builder.query<TGetArea , void>(
      {
        query:() => ({
          url:`BaseData/GetAreas`
        })
      }
    )
  }),
});
export const { useGetIntershipHistoryQuery, useGetClassHistoryQuery,useGetIntershipClassQuery,useGetAreasQuery } =
  EducationalExperienceApi;
