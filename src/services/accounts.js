import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/apis/fetchBaseQuery';
import { TOKEN, REFRESHTOKEN, ME, API_BASE_URL } from '@/apis/endpoints';
import { toast } from "react-toastify";


export const accountsApi = createApi({
    reducerPath: 'accountsApi',
    baseQuery: baseQueryWithReauth(API_BASE_URL),
    tagTypes: ['Accounts'],
    endpoints: (builder) => ({
        getAccount: builder.query({
            query: () => ME,
            providesTags: ['Accounts']
        }),
        getAccounts: builder.query({
            query: () => USERS,
            providesTags: ['Accounts']
        }),
        logOut: builder.mutation({
            queryFn: () => {
                localStorage.removeItem(TOKEN);
                localStorage.removeItem(REFRESHTOKEN);

                toast.success("User logged out successfully", {
                    position: "top-right",
                });

                return { data: { status: 'ok' } };
            }
        }),
    }),
});

export const { useGetAccountQuery, useGetAccountsQuery, useLogOutMutation } = accountsApi;