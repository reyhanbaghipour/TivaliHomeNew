import { createApi } from '@reduxjs/toolkit/query/react';
import { TGetMenuItemsResponse } from './interface';
import { baseQuery } from '../customBaseQuery';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getMenuItems: builder.query<TGetMenuItemsResponse, number>({
      query: (query) => ({
        url: `User/GetUserMenu`,
        params: { UserId: query },
      }),
    }),
  }),
});
export const { useGetMenuItemsQuery } = dashboardApi;
