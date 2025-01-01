import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import React from "react";
import Button from "./Button";

const fallbackData = [];

const Table = React.memo(
  ({
    enablePagination = true,
    columnsDef,
    data,
    pageIndex,
    pageSize,
    hasMoreData,
    setPageIndex,
    setPageSize,
  }) => {
    const table = useReactTable({
      data: data ?? fallbackData,
      columns: columnsDef,
      getCoreRowModel: getCoreRowModel(),
      debugTable: false,
      manualPagination: true,
      state: {
        pagination: {
          pageIndex,
          pageSize,
        },
      },
      onPaginationChange: (updater) => {
        const nextPagination =
          typeof updater === "function"
            ? updater({ pageIndex, pageSize })
            : updater;
        setPageIndex(nextPagination.pageIndex);
        setPageSize(nextPagination.pageSize);
      },
    });

    return (
      <div className="my-4 border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-min items-center border-collapse table-fixed">
            <thead className="min-w-min">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{
                        width:
                          header.getSize() !== 150 ? header.getSize() : "auto",
                      }}
                      className={`min-w-max px-2 sm:px-4 align-middle border py-2 sm:py-4 text-xs sm:text-sm uppercase whitespace-nowrap truncate font-semibold text-left bg-white dark:bg-slate-900 dark:text-slate-300 border-slate-300 dark:border-slate-700 ${
                        header.column.columnDef.className || ""
                      }`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="min-w-min cursor-pointer">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className={`min-w-max border-t-0 px-2 sm:px-4 align-middle border-l-0 border-r-0 text-xs sm:text-sm whitespace-nowrap truncate py-2 sm:py-4 text-slate-500 bg-white dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700 ${
                        cell.column.columnDef.className || ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {enablePagination && (
          <div className="flex flex-row justify-between items-center bg-white dark:bg-slate-900 px-4 sm:px-12 py-3 sm:py-6 border-t dark:border-slate-700 gap-x-4">
            <Button
              variant="outline"
              onClick={() => {
                setPageIndex((old) => Math.max(old - 1, 0));
              }}
              disabled={pageIndex === 0}
              className="flex-shrink-0"
            >
              Previous
            </Button>
            <span className="text-slate-900 dark:text-slate-300 text-center flex-grow">
              Page {table.getState().pagination.pageIndex + 1}
            </span>
            <Button
              variant="outline"
              onClick={() => {
                setPageIndex((old) => old + 1);
              }}
              disabled={!hasMoreData}
              className="flex-shrink-0"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    );
  },
);

Table.displayName = "Table";

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columnsDef: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  hasMoreData: PropTypes.bool.isRequired,
  setPageIndex: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  enablePagination: PropTypes.bool,
};

export default Table;
