import React, { useContext, useEffect, useState, FC, useCallback } from "react";
import { ThemeContext, AsidePanelContext, TourContext } from "@/context";
import Loader from "@/components/Loader";
import { Button, Notification } from "@canonical/react-components";
import { PanelUserCreate, PanelUserDetails } from "@/components/panels";
import { useUsersPages } from "@/hooks/users";
import { USERS_HEADERS } from "@/Users";
import Pagination from "@/components/Pagination";
import { handleSortingChange } from "@/components/Table";
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import { useAuth } from "@/hooks/auth";
// import { toast } from "react-toastify";
import { formatTime } from "@pg-ui/i18n";
import { useTranslation } from "@pg-ui/i18n";

const CELL_RENDERER__USERS = {
  username: (item) => item.username,
  level: (item) => item.level,
  created_at: (item) => formatTime(item.currency_id, item.intl),
  updated_at: (item) => formatTime(item.amount_in, item.intl),
};

const PageUsers: FC = ({ asidePanel }: any) => {
  const { user } = useAuth({ middleware: "auth" });
  // const [isWaitingForResponse, setIsWaitingForResponse] = useState(true),
  const { isDarkMode } = useContext(ThemeContext),
    { openAsidePanel, closeAsidePanel } = useContext(AsidePanelContext),
    [numItemsPerPage, setNumItemsPerPage] = useState(10),
    headers = USERS_HEADERS,
    [sortField, setSortField] = useState(""),
    [order, setOrder] = useState("asc");
  //   const { tour, startTour } = useContext(TourContext);
  const { t } = useTranslation("");

  const {
    waiting: isWaitingForResponse,
    users: userData,
    updatePage,
    goToPage,
    pagination,
  } = useUsersPages({ itemsPerPage: numItemsPerPage });

  const openUserCreatePanel = useCallback(() => {
    if (!openAsidePanel) return;
    openAsidePanel({
      title: "Create User",
      content: <PanelUserCreate updatePage={updatePage} auth={user} />,
    });
  }, [openAsidePanel, user]);

  const openUserDetails = useCallback(
    ({ itemId }: { itemId: string }) => {
      if (!openAsidePanel) return;
      openAsidePanel({
        title: "User Details",
        content: <PanelUserDetails userId={itemId} updatePage={updatePage} />,
      });
    },
    [openAsidePanel, user]
  );

  useEffect(() => {
    return () => {
      if (!closeAsidePanel) return;
      closeAsidePanel();
    };
  }, [closeAsidePanel]);

  if (isWaitingForResponse) return <Loader />;

  return (
    <AppLayout asidePanel={asidePanel}>
      <Head>
        <title>{t("user.title")}</title>
      </Head>
      <div className={"p-panel " + (isDarkMode ? "is-dark" : "")}>
        <div className="p-panel__header">
          <h4 className="p-panel__title">{t("user.header")}</h4>
          <div className="p-panel__controls ">
            <div className="p-form--inline col-4 ">
              <Button
                hasIcon
                id={"user-create-button"}
                className={
                  "u-no-margin--bottom " + (isDarkMode ? "is-dark" : "")
                }
                onClick={() => {
                  openUserCreatePanel();

                  //   if (tour.tourActive) {
                  //     // startTour({
                  //     //     run: false,
                  //     //     tourActive: false,
                  //     //     stepIndex: 0,
                  //     //     steps: [],
                  //     // });
                  //   setTimeout(() => {

                  //     startTour({
                  //       run: true,
                  //       steps: tour.steps.slice(1),
                  //       tourActive: true,
                  //       stepIndex: tour.stepIndex ,
                  //     });
                  //   }, 800);
                  //   }
                }}
              >
                <i className="p-icon--plus"></i>
              </Button>
            </div>
          </div>
        </div>
        <div className="p-panel__content">
          {/* {tour} */}
          <div className="u-fixed-width">
            {userData.length == 0 && (
              <Notification
                borderless
                severity="information"
                title={t("error.warning")}
              >
                {t("error.no_result")}
              </Notification>
            )}
            {userData.length > 0 && (
              <>
                <table className="p-table--mobile-card">
                  <thead>
                    <tr>
                      {headers.map(({ name, sortable, accessor }, idx) => {
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
                                      userData
                                    );

                                    setSortField(accessor);
                                    setOrder(sortOrder);
                                    setUserData(newData);
                                  }
                                : null
                            }
                          >
                            {t(`user.table.${accessor}`)}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((item, idx) => (
                      <tr
                        key={idx}
                        onClick={() => openUserDetails({ itemId: item.id })}
                      >
                        <th
                          data-heading={t("user.table.username")}
                          className="p-table__cell--icon-placeholder"
                        >
                          {item.enabled == 0 && (
                            //   <Chip appearance="negative" value="disabled" />
                            <i className="p-icon--error p-tooltip--top-center"></i>
                          )}
                          {item.username}
                        </th>
                        <th data-heading={t("user.table.level")}>
                          {item.level}
                        </th>
                        <th data-heading={t("user.table.created_at")}>
                          {formatTime(item.created_at, item.intl)}
                        </th>

                        <th data-heading={t("user.table.updated_at")}>
                          {formatTime(item.updated_at, item.intl)}
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <Pagination
            chunk={pagination.chunk}
            last_chunk={pagination.last_chunk}
            total={pagination.total}
            limit={pagination.limit}
            displayedItems={userData.length}
            goToPage={goToPage}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </AppLayout>
  );
};
export default PageUsers;
