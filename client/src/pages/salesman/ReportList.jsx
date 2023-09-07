import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import StackedList from "components/StackedList";

import { useReport } from "hooks/useReport";
import { useAuthContext } from "hooks/useAuthContext";

import LoadingSpinner from "components/LoadingSpinner";

export default function ReportList() {
  const navigate = useNavigate();
  const { salesmanId } = useParams();


  const { user } = useAuthContext();
  const { getAllReportBySalesman, deleteReport, isLoading } = useReport();

  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const reports = await getAllReportBySalesman(salesmanId);
    const newReports = reports.map((report) => {
      return {
        ...report,
        date: report.date.slice(0, 10),
      };
    });
    setReports(newReports);
  }

  useEffect(() => {
      fetchReports();
  }, []);

  const handleDeleteReport = async (id) => {
    await deleteReport(id);
    fetchReports();
  };

  const handleEditReport = (id) => {
    navigate(`/salesman/${user.id}/report/${id}`);
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <StackedList
        list={reports}
        handleEditReport={(id) => handleEditReport(id)}
        handleDeleteReport={(id) => handleDeleteReport(id)}
      />
    </div>
  );
}
