import { useState } from "react";

export default function List({ thList, tdList, itemsPerPage, title, icon, options }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tdList.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const generateTableDataColumns = (td) => {
    return Object.entries(td)
      .filter(([key, value]) => key !== "_id" && value != null)
      .map(([key, value]) => (
        <td key={key} className="td-list">
          {value}
        </td>
      ));
  };

  const generateOptions = (td) => {
    return options.map((option) => (
      <button
        key={option.name}
        onClick={() => option.action(td._id)}
        className="btn btn-gray"
      >
        {option.name}
      </button>
    ));
  };

  return (
    <div className="mx-auto w-full h-full">
      <div className="flex gap-2 items-center">
        {icon}
        <h2 className="title">{title}</h2>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 pt-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {thList.map((th) => (
                  <th key={th} className="th-list">
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((td) => (
                <tr className="w-fit" key={td._id}>
                  {generateTableDataColumns(td)}
                  {options &&
                  <td className="td-list">{generateOptions(td)}</td>
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* PAGINATION */}
      <div className="flex flex-col justify-center items-center gap-2">
        <span className="text-xs text-gray-200 ml-4">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, tdList.length)} of {tdList.length} {title}
        </span>
        {/* PREV / NEXT BUTTONS */}
        <div>
          {tdList.length > itemsPerPage && (
            <div>
              <button
                className="btn btn-gray"
                style={{
                  borderRadius: "0",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className="btn btn-gray"
                style={{
                  borderRadius: "0",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
                onClick={nextPage}
                disabled={indexOfLastItem >= tdList.length}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
