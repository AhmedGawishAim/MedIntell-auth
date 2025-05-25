import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/apis/fetchBaseQuery';
import { API_BASE_URL, REPORTS, UPLOAD } from '@/apis/endpoints';

export const reportsApi = createApi({
    reducerPath: 'reportsApi',
    baseQuery: baseQueryWithReauth(API_BASE_URL),
    tagTypes: ["Reports"],
    endpoints: (builder) => ({
        getReports: builder.query({
            query: ({ page = 1, pageSize = 10 }) => `${REPORTS}?page=${page}&page_size=${pageSize}`,
            // transformResponse: (response) => ({
            //     next: response.next,
            //     results: response.results,
            //     count: response.count,
            // }),
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (currentCache, newItems, { arg }) => {
                if (arg.page === 1) {
                    return newItems;
                }
                const ids = new Set(currentCache.results.map(r => r.id));
                const filtered = newItems.results.filter(r => !ids.has(r.id));
                return {
                    ...currentCache,
                    results: [...currentCache.results, ...filtered],
                    next: newItems.next,
                    count: newItems.count,
                };
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            providesTags: (result) => [
                { type: 'Reports', id: 'LIST' },
                ...(result?.results
                    ? result.results.map(({ id }) => ({ type: 'Reports', id }))
                    : []
                ),
            ],
        }),
        uploadReport: builder.mutation({    
            query: (formData) => ({
                url: UPLOAD,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [{ type: 'Reports', id: 'LIST' }],
        }),
        deleteReport: builder.mutation({
            query: (id) => ({
                url: `${REPORTS}${id}/`,
                method: 'DELETE',
            }),
            transformResponse: (response, meta, arg) => {
                return arg;
            },
            invalidatesTags: (result, error, id) => [
                { type: 'Reports', id },
                { type: 'Reports', id: 'LIST' }
            ],
            async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
                const patchResult = dispatch(
                    reportsApi.util.updateQueryData('getReports', undefined, draft => {
                        draft.results = draft.results.filter(report => report.id !== id);
                        draft.count -= 1;
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const { useGetReportsQuery, useUploadReportMutation, useDeleteReportMutation } = reportsApi;