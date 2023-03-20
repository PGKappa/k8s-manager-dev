import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context";
import Pagination, { PaginationProps } from "./Pagination";
// import Loader from "./Loader";
// import { formatStake, formatTime } from "@pg-ui/i18n";

export const handleSortingChange = (accessor, sortField, order, sortData) => {
  const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
  if (sortField) {
    const sorted = [...sortData].sort((a, b) => {
      if (a[sortField] === null) return 1;
      if (b[sortField] === null) return -1;
      if (a[sortField] === null && b[sortField] === null) return 0;
      return (
        a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
          numeric: true,
        }) * (sortOrder === "asc" ? 1 : -1)
      );
    });

    return sorted;
  }
};

export type TableProps = {
  tableHeader?: string;
  tableData: any[];
  headers: any[];
  onClickHandler?: () => void;
  pageTotal: {};
  total: {};
  pagination: PaginationProps;
  goToPage: (pageIndex, numItemsPerPage) => void;
  mode?: string;
  itemId?: string;
  special?: boolean;
  specialColumn?: any[];
  cellRenderer: Function;
  dataIndex: string;
};

const Table = ({
  tableHeader,
  tableData,
  headers,
  onClickHandler,
  pageTotal,
  total,
  pagination,
  goToPage,
  mode,
  itemId,
  special,
  specialColumn,
  cellRenderer,
  dataIndex,
}: TableProps) => {
  const { isDarkMode } = useContext(ThemeContext),
    [sortField, setSortField] = useState(""),
    [order, setOrder] = useState(""),
    [data, setData] = useState(tableData),
    [isWaitDownloading, setIsWaiting] = useState(true);

  useEffect(() => {
    setIsWaiting(true);
    setData(tableData);
  }, [tableData]);

  // if(!isWaiting) return <Loader/>

  return (
    <>
      {tableHeader && (
        <div>
          <h4>{tableHeader}</h4>
        </div>
      )}
      <table className="p-table--mobile-card">
        <thead>
          <tr>
            {headers.map(({ name, sortable, accessor, defaultSort }, idx) => {
              if (sortField === "" && defaultSort) {
                setSortField(accessor);
                setOrder(defaultSort);
              }
              const cl = sortable
                ? sortField === accessor && order === "asc"
                  ? "descending"
                  : sortField === accessor && order === "desc"
                  ? "ascending"
                  : "none"
                : "";

              return (
                <th
                  aria-sort={cl}
                  key={idx}
                  onClick={
                    sortable
                      ? () => {
                          const sortOrder =
                            accessor === sortField && order === "asc"
                              ? "desc"
                              : "asc";

                          const field = accessor;
                          const newData = handleSortingChange(
                            accessor,
                            field,
                            sortOrder,
                            tableData
                          );
                          setIsWaiting(false);
                          setSortField(accessor);
                          setOrder(sortOrder);
                          setData(newData);
                        }
                      : null
                  }
                >
                  {name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((tableDataItem, reportIndx) => (
            <tr
              key={reportIndx}
              onClick={() => {
                if (onClickHandler instanceof Function)
                  onClickHandler({ itemId: tableDataItem.id });
              }}
            >
              {headers.map(({ name, sortable, accessor }, idx) => (
                <td key={idx} data-heading={name}>
                  {cellRenderer
                    ? cellRenderer[accessor](tableDataItem)
                    : tableDataItem[accessor]}
                </td>
              ))}
            </tr>
          ))}

          {pageTotal && (
            <tr key={"page-total"}>
              {/* {Object.values(pageTotal).map((item, idx) => (
                <td key={idx}>{item}</td>
              ))} */}
              {headers.map(({ name, sortable, accessor }, idx) =>
                pageTotal[accessor] ? (
                  <td key={idx}>
                    {cellRenderer
                      ? cellRenderer[accessor](pageTotal)
                      : pageTotal[accessor]}
                  </td>
                ) : (
                  <td key={idx}
                    // className="u-hide--medium"
                  ></td>
                )
              )}
            </tr>
          )}
          {total && (
            <tr key={"total"}>
              {headers.map(({ accessor }, idx) =>
                total[accessor] ? (
                  <td key={idx}>
                    {cellRenderer
                      ? cellRenderer[accessor](total)
                      : total[accessor]}
                  </td>
                ) : (
                  <td key={idx}></td>
                )
              )}
              {/* {Object.values(total).map((item, idx) => (
                <td key={idx}>{item}</td>
              ))} */}
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {pagination && (
          <Pagination
            chunk={pagination.chunk}
            last_chunk={pagination.last_chunk}
            total={pagination.total}
            limit={pagination.limit}
            goToPage={goToPage}
            displayedItems={tableData.length}
            itemId={itemId ? itemId : null}
            isDarkMode={isDarkMode}
            dataIndex={dataIndex}
          />
        )}
      </div>
    </>
  );
};

export default Table;
