"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toggleAddModal } from "./store";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DropZone from "./DropZone";
import { useUploadReportMutation } from "@/services/reports";
import { useCreateBillingMutation } from "@/services/billing";

const UploadFile = () => {
    const { openReportModal } = useSelector((state) => state.reports);
    const dispatch = useDispatch();
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadReport, { data: uploadData, isLoading: upIsloading, error: uploadError, reset: resetUploadReport }] = useUploadReportMutation();
    const [createBilling, { isLoading: confirming, error: confirmError, data: billingData, reset: resetBilling }] = useCreateBillingMutation();
      
      const FormValidationSchema = yup.object({
        original_filename: yup.string().required("Original filename is required"),
        file: yup
          .mixed()
          .required("File is required")
          .test(
            "fileFormat",
            "Unsupported file format. Please upload an Excel file (.xls or .xlsx).",
            (file) => {
              if (!file) return false;
              const allowedExtensions = ["xls", "xlsx"];
              const fileExtension = file.name.split(".").pop().toLowerCase();
              return allowedExtensions.includes(fileExtension);
            }
          )
          
      });
      
    const {
        register,
        setValue,
        getValues,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });
    
    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setValue("file", file, { shouldValidate: true });
        setValue("original_filename", file.name, { shouldValidate: true });
    };
    

    const onSubmit = async (formData) => {
        if (!selectedFile) {
            return;
        }

        const payload = new FormData();
        payload.append("original_filename", formData.original_filename);
        payload.append("file", selectedFile);
        uploadReport(payload);
    };

    const handleClose = () => {
        reset();
        resetUploadReport();
        resetBilling();
        dispatch(toggleAddModal(false));
    };
    const handleConfirmPayment = async (file_id) => {
        await createBilling({ file_id: file_id });
        console.log("redirect...")
        // router.push(`/processing/${billingData.task_id}`);
    };

    return (
        <Modal
            title="Upload File"
            className="max-w-3xl"
            labelclassName="btn-outline-dark"
            activeModal={openReportModal}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Textinput
                    name="original_filename"
                    label="Original Filename"
                    placeholder="Original Filename"
                    register={register}
                    error={errors.original_filename}
                />

                <input type="hidden" {...register("file")} />

                <DropZone onFileSelected={handleFileSelect} />
                {errors.file && (
                    <div className=" mt-2  text-danger-500 block text-sm">
                       {errors.file?.message || errors.file?.label.message}
                    </div>
                )}

                {getValues("file") && (
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Selected File: <strong>{getValues("file").name}</strong>
                    </p>
                )}

                <div className="ltr:text-right rtl:text-left">
                    <button
                        type="submit"
                        className="btn btn-dark text-center"
                        disabled={upIsloading}
                    >
                        {upIsloading ? "Uploading..." : "Upload"}
                    </button>
                </div>


            </form>

            {uploadData && (
                <div className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold">
                        {uploadData?.message}
                    </h3>
                    <h3 className="text-lg font-semibold">
                        File Info: {uploadData?.file_info?.original_filename}
                    </h3>

                    <p>Status: <strong>{uploadData?.file_info?.status}</strong></p>
                    <p>Upload Date: {new Date(uploadData?.file_info?.upload_date).toLocaleString()}</p>
                    <p>Processing Scope: {uploadData?.file_info?.processing_scope}</p>
                    <p>Row Count: <strong>{uploadData?.file_info?.row_count}</strong></p>

                    <div className="pt-2">
                        <h4 className="font-medium">Billing</h4>
                        <p>Total Charge: <strong>{uploadData?.file_info?.total_charge} SAR</strong></p>
                    </div>


                    {upIsloading && <p>Loading status...</p>}
                </div>
            )}
            {uploadError && (
                <div className="text-red-600 mt-2 space-y-1">
                    <p className="font-semibold">Upload failed:</p>

                    {/* Missing Columns Error */}
                    {"data" in uploadError && uploadError.data?.missing_columns && (
                        <p>
                            {typeof uploadError.data.missing_columns === "string"
                                ? uploadError.data.missing_columns
                                : `Missing required columns: ${JSON.stringify(uploadError.data.missing_columns)}`}
                        </p>
                    )}

                    {/* File Errors (nested) */}
                    {"data" in uploadError && uploadError.data?.file && (
                        <ul className="list-disc list-inside">
                            {Object.entries(uploadError.data.file).map(([key, message]) => (
                                <li key={key}>{message}</li>
                            ))}
                        </ul>
                    )}

                    {/* Generic fallback */}
                    {!uploadError.data?.missing_columns && !uploadError.data?.file && (
                        <p>{uploadError.data?.detail || "An unknown error occurred."}</p>
                    )}
                </div>
            )}

            {uploadData?.file_info?.status === "VALIDATED" && (
                <div className="mt-4 border-t pt-4">
                    <h4 className="text-md font-semibold mb-2">Confirm Billing</h4>
                    <p className="mb-4">You're about to be charged <strong>{uploadData?.file_info?.total_charge} SAR</strong> to process this file.</p>

                    <div className="flex justify-end gap-2">
                        <button
                            className="btn btn-dark"
                            onClick={() => handleConfirmPayment(uploadData?.file_info?.id)}
                            disabled={confirming}
                        >
                            {confirming ? "Processing..." : "Confirm & Pay"}
                        </button>
                    </div>

                    {confirmError && (
                        <p className="text-red-600 mt-2">Payment failed. Please try again.</p>
                    )}
                </div>
            )}
            {billingData && (
                <div className="mt-4 border-t pt-4">
                    <p className="text-green-600">Billing confirmed successfully.</p>
                    <p>Do you want to view the processing status?</p>
                    <div className="flex gap-2 mt-2">
                        <button
                            className="btn btn-primary"
                            onClick={() => router.push(`/processing/${billingData.task_id}`)}
                        >
                            Yes, show me
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={handleClose}
                        >
                            No, stay here
                        </button>
                    </div>
                </div>
            )}
            {confirming && <p className="text-sm text-slate-500">Confirming payment...</p>}
            {confirmError && (
                <p className="text-sm text-red-600 mt-2">
                    Error: {confirmError?.data?.detail || "Failed to confirm billing."}
                </p>
            )}
        </Modal>
    );
};

export default UploadFile;
