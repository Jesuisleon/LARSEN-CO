import { Link, useLocation } from "react-router-dom";

import { useParams } from "react-router-dom";

import ReportList from "pages/salesman/ReportList";

let createPath = 'create-report'

export default function Dashboard({user}) {
  const { salesmanId } = useParams();
  const { pathname } = useLocation();

  return (
    <div className="w-screen h-screen space-y-4">
      <div className="py-6 mx-10 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="title">{user?.name} Dashboard</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Link
            to={{
              pathname: `/salesman/${salesmanId}/report/${createPath}`,
              state: { background: pathname },
            }}
          >
            <button
              type="button"
              className="btn btn-yellow"
            >
              Create new Report
            </button>
          </Link>
        </div>
      </div>
      <ReportList />
    </div>
  );
}
