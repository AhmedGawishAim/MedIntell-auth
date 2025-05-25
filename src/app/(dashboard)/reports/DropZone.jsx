"use client";

import React from "react";
import { useDropzone } from "react-dropzone";
import uploadSvgImage from "@/assets/images/svg/upload.svg";

const DropZone = ({ onFileSelected }) => {
    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
            "application/vnd.ms-excel": [],
            "application/vnd.ms-excel.sheet.macroEnabled.12": [],
        },
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                onFileSelected(file);
            }
        },
    });

    return (
        <div className="w-full text-center border-dashed border border-secondary-500 rounded-md py-[52px] flex flex-col justify-center items-center">
            <div {...getRootProps({ className: "dropzone cursor-pointer" })}>
                <input {...getInputProps()} className="hidden" />
                {isDragAccept ? (
                    <p className="text-sm text-slate-500 dark:text-slate-300">
                        Drop the Excel file here ...
                    </p>
                ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-300">
                        Drop Excel file here or click to upload.
                    </p>
                )}
            </div>
        </div>
    );
};

export default DropZone;
