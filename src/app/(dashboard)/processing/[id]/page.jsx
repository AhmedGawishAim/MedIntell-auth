'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetResultQuery } from '@/services/processing';

const POLLING_INTERVAL = 2000; // 2 seconds

const ProcessingPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetResultQuery(id, {
    pollingInterval: POLLING_INTERVAL,
    skip: false,
  });

  // Optional: Stop polling when task is complete
  useEffect(() => {
    if (data?.state === 'SUCCESS' || data?.state === 'FAILURE') {
      // You could add additional logic here to handle completed states
    }
  }, [data?.state]);

  if (isLoading) return <div className="p-4 text-blue-500">Loading initial status...</div>;
  if (error) return <div className="p-4 text-red-500">An error occurred while fetching the result.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Processing Status</h1>
      
      <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
        <div className="space-y-2">
          <p><strong>Task ID:</strong> {data.task_id}</p>
          <p><strong>Status:</strong> <span className="capitalize">{data.state.toLowerCase()}</span></p>
        </div>

        {data?.state === 'PROGRESS' && (
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${data.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {data.message || `Processing: ${Math.round(data.progress)}% complete`}
            </p>
          </div>
        )}

        {data?.state === 'SUCCESS' && (
          <div className="space-y-4">
            <div className="p-4 bg-green-100 rounded-lg text-green-700">
              <p className="font-semibold">Processing complete!</p>
              {data.download_url && (
                <a
                  href={data.download_url}
                  className="mt-2 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Download Report
                </a>
              )}
            </div>
          </div>
        )}

        {data?.state === 'FAILURE' && (
          <div className="p-4 bg-red-100 rounded-lg text-red-700">
            <h2 className="font-bold mb-2">Processing Error</h2>
            <p>{data.error || 'Unknown error occurred during processing'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingPage;