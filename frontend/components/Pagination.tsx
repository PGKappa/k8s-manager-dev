import React from "react";
import { Select, Form } from "@canonical/react-components";
import { useTranslation } from "@pg-ui/i18n";

export type PaginationProps = {
  chunk: number;
  last_chunk: number;
  total: number;
  limit: number;
  goToPage?: (pageIndex, numItemsPerPage, args?) => void;
  //   goToPage?: ({pageIndex, numItemsPerPage, args}) => void;
  displayedItems?: number;
  itemId?: string;
  isDarkMode?: boolean;
  dataIndex?: string;
};

const Pagination = ({
  chunk,
  last_chunk,
  total,
  limit,
  goToPage,
  displayedItems,
  itemId,
  isDarkMode,
  dataIndex,
}: PaginationProps) => {
  if (last_chunk <= 1) return <></>;

  const { t } = useTranslation("");

  const startItems = chunk <= 1 ? 1 : chunk * limit - limit;
  const middleItems = last_chunk == chunk ? total : displayedItems * chunk;

  return (
    <div className="row">
      <div className="col-4">
        <Form inline>
          <Select
            defaultValue={limit}
            className={isDarkMode ? "is-dark" : ""}
            label={t("pagination.perPage")}
            options={[
              {
                label: "10",
                value: 10,
              },
              {
                label: "25",
                value: 25,
              },
              {
                label: "50",
                value: 50,
              },
              {
                label: "100",
                value: 100,
              },
            ]}
            onChange={(e) => {
              goToPage(
                1,
                e.target.value,
                itemId ? { shops: itemId, dataIndex: dataIndex ?? null } : ""
              );
            }}
          />
        </Form>
      </div>
      <div className="col-2">
        {startItems + "-" + middleItems + " of " + total}
      </div>
      <div className={"col-5 " + (isDarkMode ? "is-dark" : "")}>
        <button
          className="p-button--base"
          disabled={chunk == 1 ? true : false}
          onClick={() =>
            goToPage(
              1,
              limit,
              itemId ? { shops: itemId, dataIndex: dataIndex ?? null } : ""
            )
          }
          aria-disabled="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-bar-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </button>

        <button
          className="p-button--base"
          disabled={chunk == 1 ? true : false}
          onClick={() =>
            goToPage(
              chunk - 1 == 0 ? 1 : chunk - 1,
              limit,
              itemId ? { shops: itemId, dataIndex: dataIndex ?? null } : ""
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </button>
        <button
          id="next-page"
          className="p-button--base"
          disabled={chunk == last_chunk ? true : false}
          onClick={() =>
            goToPage(
              chunk + 1,
              limit,
              itemId ? { shops: itemId, dataIndex: dataIndex ?? null } : ""
            )
          }
          //   onClick={() => goToPage({chunk: chunk +1 ,limit: limit , itemId : itemId ? { shops: itemId, dataIndex: dataIndex ?? null } : "" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
            />
          </svg>
        </button>
        <button
          id="last-page"
          className="p-button--base"
          disabled={chunk == last_chunk ? true : false}
          onClick={() =>
            goToPage(
              last_chunk,
              limit,
              itemId ? { shops: itemId, dataIndex: dataIndex ?? null } : ""
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-bar-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Pagination;
