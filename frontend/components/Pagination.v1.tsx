import React, { useEffect, useState } from "react";

type PaginationProps = {
  chunk: number;
  last_chunk: number;
  total: number;
  limit: number;
  goToPage: (pageIndex: number, numItemsPerPage) => void;
};

const Pagination = ({
  chunk,
  last_chunk,
  total,
  limit,
  goToPage,
}: PaginationProps) => {
  const [data, setData] = useState<{
    start: number;
    end: number;
    pages: number[];
  }>({
    start: 1,
    end: 1,
    pages: [],
  });

  useEffect(() => {
    let pages: number[] = [];

    let start = chunk - 2,
      end = Number(chunk) + 2;

    if (start < 1) {
      start = 1;
      end = end + 1;
    }
    if (end >= last_chunk) {
      end = last_chunk; // reset end to last page
    }
    for (var i = start; i <= end; i++) {
      pages.push(i);
    }
    // pages.slice(0, 3)

    setData({
      start: start,
      end: end,
      pages: pages,
    });
  }, [chunk, last_chunk]);

  return (
    <nav aria-label="Pagination u-fixed-width">
      <ol className="p-pagination u-align--center">
        <li className="p-pagination__item">
          <a
            className={
              "p-pagination__link" + (chunk == 1 ? " is-disabled" : "")
            }
            onClick={() => goToPage(1, limit)}
            aria-disabled="true"
          >
            «
          </a>
        </li>

        <li className="p-pagination__item">
          <a
            className={
              "p-pagination__link--previous" +
              (chunk == 1 ? " is-disabled" : "")
            }
            onClick={() => goToPage(chunk - 1 == 0 ? 1 : chunk - 1, limit)}
          >
            <i className="p-icon--chevron-down">Previous page</i>
          </a>
        </li>
        {data.start > 1 && (
          <li className={"p-pagination__item"}>
            {/* if start > 1 */}
            <a
              className={
                "p-pagination__link" + (chunk == 1 ? " is-active" : "")
              }
              onClick={() => goToPage(1, limit)}
            >
              1
            </a>
          </li>
        )}
        {data.start > 1 && chunk != 4 && (
          <li className="p-pagination__item p-pagination__item--truncation">
            …
          </li>
        )}

        {data.pages.map((page, idx) => (
          <li className="p-pagination__item" key={idx}>
            <a
              className={
                "p-pagination__link" + (chunk == page ? " is-active" : "")
              }
              onClick={() => goToPage(page, limit)}
            >
              {page}
            </a>
          </li>
        ))}

        {data.end < last_chunk && chunk + 3 != last_chunk && (
          <li className="p-pagination__item p-pagination__item--truncation">
            …
          </li>
        )}

        {data.end < last_chunk && (
          <li className="p-pagination__item">
            <a
              className="p-pagination__link"
              onClick={() => goToPage(last_chunk, limit)}
            >
              {last_chunk}
            </a>
          </li>
        )}

        {/* {last_chunk != 1 && last_chunk != chunk &&
          <li className="p-pagination__item">
            <a className="p-pagination__link">{last_chunk}</a>
          </li>
        } */}

        <li className="p-pagination__item">
          <a
            className={
              "p-pagination__link--next" +
              (chunk == last_chunk ? " is-disabled" : "")
            }
            onClick={() => goToPage(chunk + 1, limit)}
          >
            <i className="p-icon--chevron-down">Next page</i>
          </a>
        </li>
        <li className="p-pagination__item">
          <a
            className={
              "p-pagination__link" + (chunk == last_chunk ? " is-disabled" : "")
            }
            onClick={() => goToPage(last_chunk, limit)}
          >
            »
          </a>
        </li>
      </ol>
      <div>{"showing " + limit * chunk + " from " + total}</div>
    </nav>
  );
};
export default Pagination;
