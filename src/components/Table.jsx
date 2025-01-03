import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Table = ({
  data,
  columnsDef,
  pageIndex,
  pageSize,
  hasMoreData,
  setPageIndex,
  setPageSize,
  enablePagination = true,
}) => {
  const visibleData = data.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize,
  );

  return (
    <div className="my-4 border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-min items-center border-collapse table-fixed">
          <thead>
            <tr>
              {columnsDef.map((col) => (
                <th
                  key={col.header}
                  className={`min-w-max px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-left uppercase border bg-white dark:bg-slate-900 dark:text-slate-300 border-slate-300 dark:border-slate-700 ${
                    col.className || ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row, rowIndex) => (
              <tr key={rowIndex} className="cursor-pointer">
                {columnsDef.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`min-w-max px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm border-t-0 border-l-0 border-r-0 whitespace-nowrap truncate text-slate-500 bg-white dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700 ${
                      col.className || ""
                    }`}
                  >
                    {col.cell ? col.cell({ row }) : row[col.accessorKey]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {enablePagination && (
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 px-4 sm:px-12 py-3 sm:py-6 border-t dark:border-slate-700">
          <Button
            variant="outline"
            onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}
            disabled={pageIndex === 0}
          >
            Previous
          </Button>
          <span className="text-slate-900 dark:text-slate-300 text-center flex-grow">
            Page {pageIndex + 1}
          </span>
          <Button
            variant="outline"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={!hasMoreData}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columnsDef: PropTypes.array.isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  hasMoreData: PropTypes.bool.isRequired,
  setPageIndex: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  enablePagination: PropTypes.bool,
};

export default Table;
