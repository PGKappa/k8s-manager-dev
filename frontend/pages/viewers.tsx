import React, { useContext, useEffect, useState, useCallback } from "react";
import { ThemeContext, AsidePanelContext } from "@/context";
import Loader from "@/components/Loader";
import {
  requestViewers,
  RequestViewersResponse,
  VIEWERS_HEADERS,
} from "@/hooks/viewers";
import Pagination, { PaginationProps } from "@/components/Pagination";
import { Notification, Button } from "@canonical/react-components";
import { PanelViewerDetails, PanelViewerCreate } from "@/components/panels";
import TableExpandItem from "@/components/TableExpandItem";
import { handleSortingChange } from "@/components/Table";
import { useAuth } from "@/hooks/auth";
import AppLayout from "@/components/Layouts/AppLayout";
import { useTranslation } from "@pg-ui/i18n";

const PageViewers = ({ asidePanel }) => {
  const { user } = useAuth({ middleware: "auth" }),
    [isWaitingForResponse, setIsWaitingForResponse] = useState<boolean>(true),
    { isDarkMode } = useContext(ThemeContext),
    { openAsidePanel } = useContext(AsidePanelContext),
    [viewersData, setViewersData] = useState([]),
    [pagination, setPagination] = useState<PaginationProps>(),
    [numItemsPerPage, setNumItemsPerPage] = useState(10),
    headers = VIEWERS_HEADERS,
    [sortField, setSortField] = useState("id"),
    [order, setOrder] = useState("desc"),
    { t } = useTranslation("");

  useEffect(() => {
    requestViewers({
      onSuccess: (res: RequestViewersResponse) => {
        setViewersData(res.viewers);
        setPagination(res.pagination);
        setIsWaitingForResponse(false);
      },
      onError: (e) => {
        setIsWaitingForResponse(false);
      },
    });
  }, []);

  const openViewerDetails = useCallback(
    ({ itemId }) => {
      if (user.level != "analyst") {
        openAsidePanel({
          isOpen: true,
          title: "Viewer Details " + itemId,
          content: (
            <PanelViewerDetails viewerId={itemId} updatePage={updatePage} />
          ),
        });
      }
    },
    [user]
  );

  function openViewerCreatePanel() {
    openAsidePanel({
      isOpen: true,
      title: "Create Viewer",
      content: <PanelViewerCreate updatePage={updatePage} />,
    });
  }

  const goToPage = useCallback(
    (pageIndex: number, numItemsPerPage?: number) => {
      requestViewers({
        pageIndex,
        numItemsPerPage,
        onSuccess: (res: RequestViewersResponse) => {
          setIsWaitingForResponse(false);

          setViewersData(res.viewers);
          setPagination(res.pagination);
          //   setRequestParams(res.params);
        },
        onError: (e) => {
          setIsWaitingForResponse(false);
        },
      });
    },
    [numItemsPerPage]
  );

  const updatePage = useCallback(() => {
    goToPage(pagination.chunk, pagination.limit);
  }, [goToPage, pagination]);

  if (isWaitingForResponse) return <Loader />;

  return (
    <AppLayout asidePanel={asidePanel}>
      <div className={"p-panel " + (isDarkMode ? "is-dark" : "")}>
        <div className="p-panel__header">
          <h4 className="p-panel__title">Viewers</h4>
          <div className="p-panel__controls">
            {user.level != "analyst" && (
              <Button
                hasIcon
                className={
                  "u-no-margin--bottom " + (isDarkMode ? "is-dark" : "")
                }
                onClick={openViewerCreatePanel}
              >
                <i className="p-icon--plus"></i>
              </Button>
            )}
          </div>
        </div>
        <div className="p-panel__content">
          <div className="u-fixed-width">
            {viewersData.length == 0 && (
              <Notification
                borderless
                severity="information"
                title={t("error.warning")}
              >
                {t("error.no_result")}
              </Notification>
            )}
            {viewersData.length > 0 && (
              <>
                <table
                  aria-label="Ticket List Table"
                  className="p-table--mobile-card p-table--expanding"
                >
                  <thead>
                    <tr>
                      {headers.map(
                        ({ name, sortable, accessor, defaultSort }, idx) => {
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
                                        accessor === sortField &&
                                        order === "asc"
                                          ? "desc"
                                          : "asc";

                                      const field = accessor;
                                      const newData = handleSortingChange(
                                        accessor,
                                        field,
                                        sortOrder,
                                        viewersData
                                      );

                                      setSortField(accessor);
                                      setOrder(sortOrder);
                                      setViewersData(newData);
                                    }
                                  : null
                              }
                            >
                              {name}
                            </th>
                          );
                        }
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {viewersData.map((item, idx) => (
                      <tr key={idx} data-index={idx}>
                        <th
                          data-heading={t("veiwer.table.id")}
                          onClick={() => openViewerDetails({ itemId: item.id })}
                        >
                          {item.id}
                        </th>
                        <th
                          data-heading={t("veiwer.table.macaddress")}
                          onClick={() => openViewerDetails({ itemId: item.id })}
                        >
                          {item.macaddress}
                        </th>
                        <th
                          data-heading={t("veiwer.table.user")}
                          onClick={() => openViewerDetails({ itemId: item.id })}
                        >
                          {item.user}
                        </th>
                        <th
                          data-heading={t("veiwer.table.monitor")}
                          onClick={() => openViewerDetails({ itemId: item.id })}
                        >
                          {item.monitor}
                        </th>
                        <th
                          data-heading={t("veiwer.table.channel")}
                          onClick={() => openViewerDetails({ itemId: item.id })}
                        >
                          {item.channel}
                        </th>
                        <th
                          data-heading={t("veiwer.table.lanuage")}
                          onClick={() => openViewerDetails({ itemId: item.id })}
                        >
                          {item.language}{" "}
                        </th>
                        <TableExpandItem
                          panelContext={item.videoURL}
                          panelHeader={"Video Url"}
                          buttonText={"Url"}
                          // openExpandArea={}
                          ariaControlls={item.id}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
                {pagination && (
                  <Pagination
                    chunk={pagination.chunk}
                    last_chunk={pagination.last_chunk}
                    total={pagination.total}
                    limit={pagination.limit}
                    goToPage={goToPage}
                    isDarkMode={isDarkMode}
                    displayedItems={viewersData.length}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PageViewers;
