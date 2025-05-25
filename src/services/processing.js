import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/apis/fetchBaseQuery';
import { API_BASE_URL, PROCESSING } from '@/apis/endpoints';

export const processingApi = createApi({
    reducerPath: 'processingApi',
    baseQuery: baseQueryWithReauth(API_BASE_URL),
    endpoints: (builder) => ({
      getResult: builder.query({
        query: (id) => ({
          url: `${PROCESSING}${id}`,
          // Add cache-busting parameter
          params: { timestamp: Date.now() }
        }),
        // Keep unused data for shorter time
        keepUnusedDataFor: 5,
      }),
    }),
  });

export const { useGetResultQuery } = processingApi;