import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

import { useReport } from "hooks/useReport";

import ArticleForm from "components/form/ArticleForm";
import DateInput from "components/form/DateInput";
import ClientForm from "components/form/ClientForm";

import Alert from '@mui/material/Alert';

export default function CreateReport() {
  const pathname = useLocation();
  const { salesmanId, reportId } = useParams();
  const { createReport, updateReport, getSingleReport, isLoading, error, setError } =
    useReport();

  const [date, setDate] = useState();
  const [report, setReport] = useState("");
  const [articlesSales, setArticlesSales] = useState([]);
  const [totalSales, setTotalSales] = useState();

  const [client, setClient] = useState({});

  const [showProvisionalSales, setShowProvisionalSales] = useState(false);
  const [provisionalDate, setProvisionalDate] = useState();

  const [provisionalArticles, setProvisionalArticles] = useState([]);
  const [provisionalTotal, setProvisionalTotal] = useState();

  // verify if date is before provisional date
  const [dateIsValid, setDateIsValid] = useState(true);
  useEffect(() => {
    if (date && provisionalDate) {
      const dateIsBeforeProvisionalDate = new Date(date) < new Date(provisionalDate);
      setDateIsValid(dateIsBeforeProvisionalDate);
    }
  }, [date, provisionalDate]);

  const handleSubmit = async () => {
    if (!dateIsValid && showProvisionalSales) return setError("Date must be before provisional date");

    const newReport = {
      salesman: salesmanId,
      date,
      report,
      articles: articlesSales,
      total_sales: totalSales,
      client,
      provisional_total: provisionalTotal,
      provisional_articles: provisionalArticles,
      provisional_date: provisionalDate,
    };

    if (!showProvisionalSales) {
      newReport.provisional_date = null;
      newReport.provisional_articles = [];
      newReport.provisional_total = null;
    }

    if (reportId === "create-report") {
      await createReport(salesmanId, newReport);
    } else {
      await updateReport(salesmanId, reportId, newReport);
    }
  };

  const fetchReport = async () => {
    const getReport = await getSingleReport(reportId);

    // convert date to ISO string
    const availableDate = new Date(getReport.date).toISOString().slice(0, 10);

    setDate(availableDate);
    setReport(getReport.report);
    setArticlesSales(getReport.articles);
    setTotalSales(getReport.total_sales);
    setClient(getReport.client);

  if (getReport.provisional_date) {
    const availableProvisionalDate = new Date(getReport.provisional_date)
      .toISOString()
      .slice(0, 10);
    setProvisionalDate(availableProvisionalDate);
    if (getReport.provisional_articles.length > 0) {
        setProvisionalArticles(getReport.provisional_articles);
    }
    setProvisionalTotal(getReport.provisional_total);
    setShowProvisionalSales(true)
  }
  };


  useEffect(() => {
    if (reportId === "create-report") {
      // set date to today and provisional date to tomorrow
      setDate(new Date().toISOString().slice(0, 10));
      setProvisionalDate(
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
    } else {
      fetchReport();
    }
  }, []);

  const submitIsDisabled = useMemo(() => {
    return !date || !report || articlesSales.length === 0 || !totalSales || !client.contact || !client.name || !client.address
  }, [date, report, articlesSales, totalSales, client]);

  const addProvisionalSales = () => {
    setProvisionalDate(
          new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 10)
      );
    setShowProvisionalSales(true);
  }
  const resetProvisionalSales = () => {
    setProvisionalDate(
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    );
    setProvisionalArticles([]);
    setProvisionalTotal(null);
    setShowProvisionalSales(false);
  }

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
      <div className="flex flex-col gap-6 px-4 md:pl-6 py-12">
        <h1 className="title">Sales report</h1>
        <DateInput date={date} handleDate={(date) => setDate(date)} />
        <div>
          <label htmlFor="report" className="label">
            Report
          </label>
          <textarea
            required
            id="report"
            name="report"
            rows="4"
            cols="50"
            className="input"
            value={report}
            onChange={(e) => setReport(e.target.value)}
          />
        </div>
        <ArticleForm
          articles={articlesSales}
          handleArticles={(articles) => setArticlesSales(articles)}
          total={totalSales}
          handleTotal={(total) => setTotalSales(total)}
        />
      </div>
      <div className="flex flex-col gap-6 px-6 bg-gray-800 py-12">
        <h1 className="title">Client Informations</h1>
        <ClientForm
          client={client}
          handleClient={(client) => setClient(client)}
        />
          <div className="grid gap-6">
            <div className="flex gap-4">
              <h2 className="title">Provisional sales</h2>
              {/* ADD/RESET PROVISIONAL SALES BUTTONS*/}
              {showProvisionalSales ? (
                <button
                  onClick={() => resetProvisionalSales()}
                  className="btn btn-red justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              ) : (
              <button
                className="btn btn-green justify-center"
                onClick={() => addProvisionalSales()}
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="w-5 h-5">
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6" />
                </svg>
              </button>
              )}
            </div>
            {showProvisionalSales && (
          <>
            <DateInput
            date={provisionalDate}
            handleDate={(date) => setProvisionalDate(date)}
            isDateInvalid={!dateIsValid}
          />
            <ArticleForm
              articles={provisionalArticles}
              handleArticles={(articles) => setProvisionalArticles(articles)}
              total={provisionalTotal}
              handleTotal={(total) => setProvisionalTotal(total)}
            />
          </>
        )}
        </div>
      </div>
      <div className="md:col-span-2 h-12 fixed bottom-4 left-0 w-full flex justify-between items-center px-4 text-white">
        <Link
          to={{
            pathname: `/salesman/${salesmanId}`,
            state: { background: pathname },
          }}
          className="btn btn-red"
        >
          Cancel
        </Link>
        {error && (
            <Alert
              severity="error"
              onClose={() => {
                setError(null);
              }}
            >
              {error}
            </Alert>
        )}
        <button
          type="submit"
          tabIndex={submitIsDisabled ? -1 : 0}
          disabled={isLoading || submitIsDisabled}
          className={`btn btn-green ${submitIsDisabled && "cursor-not-allowed"}`}
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}
