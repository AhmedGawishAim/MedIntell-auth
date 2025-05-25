import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOKEN, REFRESHTOKEN, REFRESH_JWT } from './endpoints';
import { localStorage } from '@/apis/utils';

export const baseQueryWithReauth = (baseUrl) => {
    const baseQuery = fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(TOKEN);
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    });

    return async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            // window.location.href = "/";
            const refreshToken = localStorage.getItem(REFRESHTOKEN);
            if (refreshToken) {
                const refreshResult = await baseQuery(
                    {
                        url: REFRESH_JWT,
                        method: 'POST',
                        body: { refresh: refreshToken },
                    },
                    api,
                    extraOptions
                );

                if (refreshResult.access) {
                    localStorage.setItem(TOKEN, refreshResult.access);
                    localStorage.setItem(REFRESHTOKEN, refreshResult.refresh);
                    // Retry the original query with the new token
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    console.log("Invalid or expired refresh token");
                    localStorage.removeItem(TOKEN);
                    localStorage.removeItem(REFRESHTOKEN);
                    // Redirect to login
                    window.location.href = "/";
                }
            } else {
                window.location.href = "/";
            }
        }
        return result;
    };
};