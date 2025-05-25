"use client";

import React, { useState, useEffect, use } from "react";
import { useInView } from "react-intersection-observer";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import GridLoading from "@/components/skeleton/Grid";
import { useGetReportsQuery } from "@/services/reports";
import Delete from "@/components/ui/Delete";
import ReportGrid from "./ReportGrid";
import UploadFile from "./UploadFile";
import { useDispatch } from "react-redux";
import { toggleAddModal } from "./store";


const Reports = () => {
    const [page, setPage] = useState(1);
    const { data: reports, isLoading, isFetching } = useGetReportsQuery({ page, pageSize: 10 });
    const { ref, inView } = useInView({ threshold: 0.3 });
    const { width, breakpoints } = useWidth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (inView && reports?.next && !isFetching) {
            setPage((prev) => prev + 1);
        }
    }, [inView, reports, isFetching]);

    return (
        <div>
            <div className="flex flex-wrap justify-between items-center mb-4">
                <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                    Reports
                </h4>
                <div
                    className={`${width < breakpoints.md ? "space-x-rb" : ""
                        } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                >
                    <Button
                        icon="heroicons-outline:plus"
                        text="Upload Your File"
                        className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                        iconClass="text-lg"
                        onClick={() => dispatch(toggleAddModal(true))}
                    />
                </div>
            </div>
            {isLoading && <GridLoading count={10} />}

            {!isLoading && reports?.results?.length > 0 ? (
                <>
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                        {reports.results.map((report, index) => (
                            <ReportGrid key={index} report={report} />
                        ))}
                    </div>

                    <div ref={ref} className="flex justify-center py-6">
                        {isFetching && <p className="text-gray-500">Loading more...</p>}
                    </div>
                </>
            ) : (
                !isLoading && (
                    <div className="flex justify-center items-center h-96">
                        <h2>No reports yet, please create one!</h2>
                    </div>
                )
            )}
            <UploadFile />
            <Delete />
        </div>
    );
};

export default Reports;
