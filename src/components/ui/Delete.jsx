"use client";
import React from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteModal } from "@/store/action";

const Delete = ({
    title = "Confirm Action",
    message = "Are you sure you want to delete ?",
}) => {
    const { openDeleteModal, fun, params } = useSelector((state) => state.actions);
    const dispatch = useDispatch();

    return (
        <div>
            <Modal
                title={title}
                themeClass="bg-danger-600"
                activeModal={openDeleteModal}
                onClose={() => dispatch(toggleDeleteModal({ open: false, fun: null, params: null }))}
                footerContent={
                    <Button
                        text="Accept"
                        className = "bg-danger-600 text-white"
                        onClick={() => {
                            fun(params);
                            dispatch(toggleDeleteModal({ open: false, fun: null, params: null }))
                        }}
                    />
                }
            >
                <h4 className="font-medium text-lg mb-3 text-slate-900">
                    {message}
                </h4>
            </Modal>
        </div>
    );
};

export default Delete;
