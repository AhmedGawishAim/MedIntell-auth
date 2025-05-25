import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/apis/fetchBaseQuery';
import { API_BASE_URL, BILLING } from '@/apis/endpoints';

export const billingApi = createApi({
    reducerPath: 'billingApi',
    baseQuery: baseQueryWithReauth(API_BASE_URL),
    tagTypes: ['Billing', 'Reports'],
    endpoints: (builder) => ({
        createBilling: builder.mutation({
            query: (data) => ({
                url: BILLING,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{type: 'Billing', id: 'LIST'}, { type: 'Reports', id: 'LIST' }],
        }),
    }),
});

export const { useCreateBillingMutation } = billingApi;