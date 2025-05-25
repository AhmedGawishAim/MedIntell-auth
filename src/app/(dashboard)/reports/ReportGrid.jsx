"use client";
import React from "react";
import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
// import menu form headless ui
import { Menu } from "@headlessui/react";
import Icon from "@/components/ui/Icon";
import { useRouter } from "next/navigation";
import { useDeleteReportMutation } from "@/services/reports";
import { useDispatch } from "react-redux";
import Avatar from "@/components/Avatar";
import Badge from "@/components/ui/Badge";
import { toggleDeleteModal } from "@/store/action";
import { formatBytes } from "@/apis/utils";

const ReportGrid = ({ report }) => {


  const [deleteReport] = useDeleteReportMutation();
  const { id, file_upload, report_type, report_file, generated_at, is_owner, size, cost } = report;
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (report) => {
    router.push(`/reports/${report.id}`);
  };


  return (
    <Card>
      {/* header */}
      <header className="flex justify-between items-end">
        <div className="flex space-x-4 items-center rtl:space-x-reverse">
          <div className="flex-none">
            <div className="rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
              {report_type}
            </div>
          </div>
          <div onClick={() => handleClick(project)} className=" cursor-pointer font-medium text-base leading-6">
            <div className="dark:text-slate-200 text-slate-900 max-w-[160px] truncate">
              {file_upload.original_file}
            </div>
          </div>
        </div>
        <div>
          <Dropdown
            classMenuItems=" w-[130px]"
            label={
              <span className="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
            }
          >
            <div>
              <Menu.Item onClick={() => handleClick(report)}>
                <div
                  className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                     capitalize rtl:space-x-reverse"
                >
                  <span className="text-base">
                    <Icon icon="heroicons:eye" />
                  </span>
                  <span>View</span>
                </div>
              </Menu.Item>
              {is_owner && (
                <>
                  <Menu.Item onClick={() => dispatch(toggleDeleteModal({ open: true, fun: deleteReport, params: id }))}>
                    <div
                      className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                    w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                      capitalize rtl:space-x-reverse"
                    >
                      <span className="text-base">
                        <Icon icon="heroicons-outline:trash" />
                      </span>
                      <span>Delete</span>
                    </div>
                  </Menu.Item>
                </>
              )}
            </div>
          </Dropdown>
        </div>
      </header>

      {/* dates */}
      <div className="flex space-x-4 rtl:space-x-reverse">
        <div>
          <span className="block date-label">Created at</span>
          <span className="block date-text">{generated_at}</span>
        </div>
      </div>

      <div className="flex justify-between py-2 space-x-4 rtl:space-x-reverse">
        <div className="justify-start">
          <span className="date-label">Owner</span>
          <span className="date-text">
              <Avatar
                data={[file_upload.user]}
                size={"medium"}
                className="w-full h-full rounded-full"
              />
          </span>
        </div>
      </div>
      {/* size */}
      <div className="flex justify-between py-2 space-x-4 rtl:space-x-reverse">
        <div className="justify-start">
          <span className="date-label">Size</span>
          <span className="date-text">{formatBytes(size)}</span>
        </div>
      </div>
      {/* cost */}
      <div className="flex justify-between py-2 space-x-4 rtl:space-x-reverse">
        <div className="justify-start">
          <span className="date-label">Cost</span>
          <span className="date-text">{cost}</span>
        </div>
      </div>
    </Card>
  );
};

export default ReportGrid;
