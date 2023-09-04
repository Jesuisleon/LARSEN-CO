import { useState } from "react";
import DropdownReportMenu from "components/DropdownReportMenu.jsx";

import Modal from "components/Modal";
import ViewReport from "components/ViewReport.jsx";

export default function StackedList({list, handleEditReport, handleDeleteReport}) {

  const [openModal, setOpenModal] = useState(false);
  const [openViewReport, setOpenViewReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedReport(id);
    setOpenModal(true);
  };

  const handleDeleteAction = (id) => {
    handleDeleteReport(id);
    setOpenModal(false);
  };


  return (
    <div className="mx-auto w-full shadow rounded px-12 overflow-visible ">
      {/* :MODAL */}
      {openModal && (
        <Modal
          open={openModal}
          setOpen={setOpenModal}
          title="Delete Report"
          description="Are you sure you want to delete this report? All of your data will be permanently removed from our servers forever. This action cannot be undone."
          handleAction={() => handleDeleteAction(selectedReport)}
          cancelButtonRef={null}
        />
      )}
      {/* :VIEW REPORT MODAL */}
      {openViewReport && (
          <ViewReport open={openViewReport} setOpen={setOpenViewReport} report={selectedReport}/>
      )}
      <ul className="grid grid-cols-1">
        {list.map((report) => (
          <li
            key={report._id}
            className="py-5 md:px-4 flex flex-col md:flex-row justify-between gap-y-4 items-start md:items-center border-b border-gray-500"
          >
            {/* :LEFT SIDE */}
            <div className="space-y-3 md:space-y-2 truncate">
              <div className="space-y-2 md:space-y-0 md:flex gap-2 items-center">
                {/* ID */}
                <p className="badge-gray">
                  Report n° {report._id}
                </p>
                {/* PRICE */}
                <p className="badge-yellow">Total : {report.total_sales} $</p>
              </div>
              {/* DATE - CLIENT NAME - SALESMAN NAME */}
              <div className="flex gap-2 items-center">
                <p className="text-sm text-gray-500">at {report.date}</p>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <p className="text-sm text-gray-500">to {report.client.name}</p>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <p className="text-sm text-gray-500">by {report.salesman.name}</p>
              </div>
            </div>
            {/* :ACTION BUTTONS */}
            <div className="md:px-4 flex items-center mdjustify-end space-x-4">
              {/* VIEW REPORT BUTTONS */}
              <button type="button" className="btn btn-gray"
                      onClick={() => {
                        setSelectedReport(report)
                        setOpenViewReport(true)
                      }}>
                View Report
              </button>
              {/* ::OPTIONS BUTTONS */}
              <DropdownReportMenu
              handleEdit={() => handleEditReport(report._id)}
              handleDelete={() => openDeleteModal(report._id)}/>
              <button
                type="button"
                className="inline-flex justify-center items-center text-gray-400 hover:text-yellow-500"
              >
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
