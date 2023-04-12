import React, { useContext, useEffect, useState, FC, useCallback } from "react";
import { ThemeContext, AsidePanelContext } from "@/context";
import { Notification, Button } from "@canonical/react-components";
import { PanelTicketDetails, PanelTicketFilters } from "@/components/panels";
import { RequestTicketListResponse, requestTicketList } from "@/hooks/tickets";
import {
  TRANSACTION_HEADERS,
  SUMMARY_HEADERS,
  SUMMARY_BY_SHOP_HEADERS,
  TRANSACTION_SHOPS_HEADERS,
  TRANSACTION_USERS_HEADERS,
  SUMMARY_USERS_HEADERS,
} from "@/Ticket";
import Loader from "@/components/Loader";
import Pagination, { PaginationProps } from "@/components/Pagination";
import Table from "@/components/Table";
import { getTodayDate } from "@/utils";
import { formatStake, formatTime } from "@pg-ui/i18n";
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/auth";
import { useTranslation } from "@pg-ui/i18n";

const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });

const CELL_RENDERER__TRANSACTION = {
  id: (item) => item.id,
  external_id: (item) => item.external_id,
  // user_id: (item) => item.user_id,
  username: (item) => item.username,
  type: (item) => item.type,
  time: (item) => formatTime(item.time, item.intl),
  // currency_id: (item) => item.currency_id,
  amount_in: (item) => formatStake(item.amount_in, item.intl),
  amount_out: (item) => formatStake(item.amount_out, item.intl),
  status: (item) => item.status,
};

const CELL_RENDERER__SUMMARY = {
  active: (item) => item.active,
  in: (item) => formatStake(item.in, item.intl),
  out: (item) => formatStake(item.out, item.intl),
  profit: (item) => formatStake(item.profit, item.intl),
  tickets: (item) => item.tickets,
};

const CELL_RENDERER__TRANSACTION_USERS = {
  id: (item) => item.id,
  user_id: (item) => item.user_id,
  type: (item) => item.type,
  time: (item) => formatTime(item.time, {locale: "en-US"}),
  // time: (item) => formatTime(item.time, item.intl),
  // currency_id: (item) => item.currency_id,
  amount_in: (item) => formatStake(item.amount_in, item.intl),
  amount_out: (item) => formatStake(item.amount_out, item.intl),
  status: (item) => item.status,
};

const CELL_RENDERER__TRANSACTION_SHOPS = {
  id: (item) => item.id,
  user_id: (item) => item.user_id,
  type: (item) => item.type,
  time: (item) => formatTime(item.time, {locale: "en-US"}),
  // time: (item) => formatTime(item.time, item.intl),
  // currency_id: (item) => item.currency_id,
  amount_in: (item) => formatStake(item.amount_in, item.intl),
  amount_out: (item) => formatStake(item.amount_out, item.intl),
  status: (item) => item.status,
};

const CELL_RENDERER__SUMMARY_SHOPS = {
  concatPercentage: (item) => formatStake(item.concatPercentage, item.intl),
  sumIn: (item) => formatStake(item.sumIn, item.intl),
  sumOut: (item) => formatStake(item.sumOut, item.intl),
  shop_id: (item) => item.shop_id,
};

const PageTicketList: FC = ({ asidePanel }: any) => {
  const { user } = useAuth({ middleware: "auth" }),
    todaysDate = getTodayDate(),
    { t } = useTranslation(""),
    { isDarkMode } = useContext(ThemeContext),
    { openAsidePanel, closeAsidePanel } = useContext(AsidePanelContext),
    [numItemsPerPage, setNumItemsPerPage] = useState(10),
    [isWaitingForResponse, setIsWaitingForResponse] = useState(true),
    [ticketData, setTicketData] = useState([]),
    [pagination, setPagination] = useState<PaginationProps>(),
    [headers, setHeaders] = useState({}),
    [total, setTotal] = useState({}),
    [pageTotal, setPageTotal] = useState({}),
    [requestParams, setRequestParams] = useState({
      type: "transaction",
      groupBy: "",
      fromDate: todaysDate,
      toDate: todaysDate,
      shops: [],
      users: [],
    }),
    [mode, setMode] = useState(""),
    [formFilterErrors, setFormFilterErrors] = useState({
      shops: "",
      users: "",
      type: "",
      fromDate: "",
      toDate: "",
      groupBy: "",
    }),
    [isError, setIsError] = useState(false),
    [error, setError] = useState();
  // [periodDates, setPeriodDates] = useState({
  //   minDate: new Date().setMonth(new Date(todaysDate).getMonth() - 1),
  //   maxDate: new Date().getTime(),
  // });

  const goToPage = useCallback(
    (
      pageIndex: number,
      numItemsPerPage?: number,
      args?: {
        shops?;
        dataIndex?;
      }
    ) => {
      setIsWaitingForResponse(true);
      var defaultArgs = {
        ...requestParams,
        ...args, // if args => add them but not here
        chunk: pageIndex,
        limit: numItemsPerPage,
      };

      if (
        (mode == "transactionShops" || mode == "transactionUsers") &&
        args.shops
      ) {
        const requestArgs = {
          shop: [args.shops],
          type: "transaction",
          chunk: pageIndex,
          limit: numItemsPerPage,
        };
        const previousMode = mode;
        requestTicketList({
          params: requestArgs,
          onSuccess: (res: RequestTicketListResponse) => {
            setIsWaitingForResponse(false);

            setMode(previousMode);

            ticketData[args.dataIndex] = res.reports;
            setTicketData(ticketData);
            total.group[args.dataIndex] = res.totalSum;
            setTotal(total);
            pageTotal.group[args.dataIndex] = res.totalSumOfPerPage;
            setPageTotal(pageTotal);
            pagination.group[args.dataIndex] = res.pagination;

            setPagination(pagination);

            toast(t("Tickets updated for shop: ") + args.shops, {
              hideProgressBar: true,
              autoClose: 2000,
              type: "success",
            });
          },
          onError: (e) => {
            toast(e.message ? e.message : t("errors.tickets"), {
              hideProgressBar: true,
              autoClose: 2000,
              type: "error",
            });
          },
        });

        return true;
      } else {
        requestTicketList({
          params: defaultArgs,
          onSuccess: (res: RequestTicketListResponse) => {
            setIsWaitingForResponse(false);

            setMode(res.mode);

            setTicketData(res.reports);
            setTotal(res.totalSum);
            setPageTotal(res.totalSumOfPerPage);
            setPagination(res.pagination);
            setRequestParams(res.params);

            toast("Tickets updated ", {
              hideProgressBar: true,
              autoClose: 2000,
              type: "success",
            });
          },
          onError: (e) => {
            setIsWaitingForResponse(false);
            toast(e.message ? e.message : t("error.tickets"), {
              hideProgressBar: true,
              autoClose: 2000,
              type: "error",
            });
          },
        });
        return true;
      }
    },
    [numItemsPerPage, requestParams]
  );

  const updatePage = useCallback((opts) => {
    setIsWaitingForResponse(false);
    // goToPage(pagination.chunk, pagination.limit);

    setMode(opts.mode);

    setTicketData(opts.reports);
    setTotal(opts.totalSum);
    setPageTotal(opts.totalSumOfPerPage);
    setPagination(opts.pagination);
    setRequestParams(opts.params);

    switch (opts.mode) {
      case "summary":
        setHeaders(SUMMARY_HEADERS);
        break;
      case "transaction":
        setHeaders(TRANSACTION_HEADERS);
        break;
      case "summaryShops":
        setHeaders(SUMMARY_BY_SHOP_HEADERS);
        break;
      case "transactionShops":
        setHeaders(TRANSACTION_SHOPS_HEADERS);
        break;
      case "transactionUsers":
        setHeaders(TRANSACTION_USERS_HEADERS);
        break;
      case "summaryUsers":
        setHeaders(SUMMARY_USERS_HEADERS);
        break;
      default:
        console.log("default mode? ");
    }

    return true;
  }, []);

  function openTicketDetails({ itemId }: { itemId: string }) {
    openAsidePanel({
      isOpen: true,
      title: t("ticket.panel.details") + itemId,
      content: <PanelTicketDetails ticketId={itemId} />,
    });
  }

  function openFiltersPanel() {
    openAsidePanel({
      isOpen: true,
      title: t("ticket.panel.filters"),
      content: (
        <PanelTicketFilters
          updatePage={updatePage}
          fromDate={requestParams.fromDate}
          toDate={requestParams.toDate}
          groupBy={requestParams.groupBy}
          type={requestParams.type}
          shops={requestParams.shops ?? [""]}
          users={requestParams.users ?? [""]}
          validations={formFilterErrors}
        />
      ),
    });
  }

  useEffect(() => {
    requestTicketList({
      params: requestParams,
      onSuccess: (res: RequestTicketListResponse) => {
        setIsWaitingForResponse(false);

        setMode(res.mode);

        setTicketData(res.reports);
        setTotal(res.totalSum);
        setPageTotal(res.totalSumOfPerPage);
        setPagination(res.pagination);
        setRequestParams(res.params);
        setHeaders(TRANSACTION_HEADERS);
      },
      onError: (e) => {
        setError(e && e.message);
        setIsError(true);
        setIsWaitingForResponse(false);
        console.warn("ON ERROR", e);
        const message = e.message ? e.message : t("error.data");
        toast(message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      },
    });
  }, []);

  useEffect(() => {
    return () => {
      if (closeAsidePanel) closeAsidePanel();
    };
  }, [closeAsidePanel]);

  const formatDateDatepicker = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${month}/${day}/${year}`;
  };

  const onFromDateChange = useCallback(
    (fromDate: Date) => {
      let newMaxToDate = new Date(fromDate);
      newMaxToDate.setMonth(newMaxToDate.getMonth() + 1);
      let newToDate = requestParams.toDate;
      if (requestParams.toDate > newMaxToDate) {
        newToDate = newMaxToDate;
      }
      setRequestParams({
        ...requestParams,
        fromDate: formatDateDatepicker(fromDate),
        toDate: newToDate,
      });
    },
    [requestParams]
  );

  const onToDateChange = useCallback(
    (toDate: Date) => {
      let newMinFromDate = new Date(toDate);
      newMinFromDate.setMonth(newMinFromDate.getMonth() - 1);
      let newFromDate = requestParams.fromDate;
      if (requestParams.fromDate < newMinFromDate) {
        newFromDate = newMinFromDate;
      }
      setRequestParams({
        ...requestParams,
        fromDate: newFromDate,
        toDate: formatDateDatepicker(toDate),
      });
    },
    [requestParams]
  );

  if (isWaitingForResponse) return <Loader />;

  const isClickHandlerAllowed =
    mode === "trasnsactionShops" ||
    mode === "transaction" ||
    mode === "trasnsactionUsers"
      ? openTicketDetails
      : null;

  return (
    <AppLayout asidePanel={asidePanel}>
      <Head>
        <title>{t("ticket.list.title")}</title>
      </Head>

      <div className={"p-panel " + (isDarkMode ? "is-dark" : "")}>
        <div className="row">
          <div className="col-2 p-panel__header ">
            <h4 className="p-panel__title">{t("ticket.list.header")}</h4>
          </div>
          <div className="col-10">
            <div className="p-panel__controls">
              <div className="p-form p-form--stacked">
                <div className="p-form__group row">
                  <div className="col-1 u-align--center">
                    <label className="p-form__label">{t("ticket.from")}</label>
                  </div>
                  <div className="col-3">
                    <div className="p-form__control">
                      <DatePicker
                        className={
                          "u-no-margin--bottom " + (isDarkMode ? "is-dark" : "")
                        }
                        dateFormat={"dd/MM/yyyy"}
                        selected={Date.parse(
                            //   formatTime(requestParams.fromDate, user?.locale)
                            formatTime(requestParams.fromDate, {locale: "en_GB"})
                        )}
                        //   minDate={periodDates.minDate}
                        maxDate={Date.parse(todaysDate)}
                        onChange={onFromDateChange}
                      />
                    </div>
                  </div>
                  <div className="col-1 u-align--center">
                    <label className="p-form__label">{t("ticket.to")}</label>
                  </div>
                  <div className="col-3">
                    <div className="p-form__control">
                      <DatePicker
                        className={
                          "u-no-margin--bottom " + (isDarkMode ? "is-dark" : "")
                        }
                        dateFormat={"dd/MM/yyyy"}
                        selected={Date.parse(
                          // formatTime(requestParams.toDate, user?.locale)
                          formatTime(requestParams.toDate, {locale: "en_GB"})

                        )}
                        // minDate={periodDates.minDate}
                        maxDate={Date.parse(todaysDate)}
                        onChange={onToDateChange}
                      />
                    </div>
                  </div>
                  <div className="col-2 u-align--center">
                    <Button
                      className={isDarkMode ? "is-dark" : ""}
                      hasIcon={true}
                      onClick={(e) => {
                        e.preventDefault();

                        goToPage(1, numItemsPerPage, requestParams);
                      }}
                    >
                      <i className="p-icon--change-version"></i>
                      <span>{t("ticket.button.update")}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-panel__content">
          <div className="u-fixed-width">
            {isError ? (
              <>
                <Notification
                  borderless
                  className={isDarkMode ? "is-dark" : ""}
                  severity="negative"
                  title={t("error.error")}
                >
                  {error}
                </Notification>
              </>
            ) : (
              <>
                {ticketData.length == 0 && (
                  <Notification
                    borderless
                    severity="information"
                    title={t("error.warning")}
                    className={isDarkMode ? "is-dark" : ""}
                  >
                    {t("error.no_result")}
                  </Notification>
                )}
                {ticketData.length > 0 && (
                  <>
                    {mode == "transactionUsers" && (
                      <div>
                        {ticketData.map((item, index) => {
                          return (
                            <div key={index}>
                              <Table
                                tableHeader={
                                  "User id: " +
                                  item[0].user_id +
                                  " Type: " +
                                  item[0].type
                                }
                                tableData={item}
                                headers={headers}
                                onClickHandler={openTicketDetails}
                                pageTotal={pageTotal.group[index]}
                                total={total.group[index]}
                                pagination={pagination.group[index]}
                                goToPage={goToPage}
                                mode={mode}
                                itemId={item[0].user_id}
                                dataIndex={index}
                                cellRenderer={CELL_RENDERER__TRANSACTION_USERS}
                              />
                              <hr />
                            </div>
                          );
                        })}
                        <Pagination
                          chunk={pagination.chunk}
                          last_chunk={pagination.last_chunk}
                          total={pagination.total}
                          limit={pagination.limit}
                          goToPage={goToPage}
                          displayedItems={ticketData.length}
                          isDarkMode={isDarkMode}
                        />
                      </div>
                    )}
                    {mode == "transactionShops" && (
                      <div>
                        {ticketData.map((item, index) => {
                          return (
                            <div key={index}>
                              <Table
                                tableHeader={"Shop: " + item[0].shop_id}
                                tableData={item}
                                headers={headers}
                                onClickHandler={openTicketDetails}
                                pageTotal={pageTotal.group[index]}
                                total={total.group[index]}
                                pagination={pagination.group[index]}
                                goToPage={goToPage}
                                mode={mode}
                                itemId={item[0].user_id}
                                dataIndex={index}
                                cellRenderer={CELL_RENDERER__TRANSACTION_SHOPS}
                              />
                              <hr />
                            </div>
                          );
                        })}
                        <Pagination
                          chunk={pagination.chunk}
                          last_chunk={pagination.last_chunk}
                          total={pagination.total}
                          limit={pagination.limit}
                          goToPage={goToPage}
                          displayedItems={ticketData.length}
                          isDarkMode={isDarkMode}
                        />
                      </div>
                    )}
                    {mode == "summary" && (
                      <Table
                        tableData={ticketData}
                        headers={headers}
                        onClickHandler={isClickHandlerAllowed}
                        pageTotal={pageTotal}
                        total={total}
                        pagination={pagination}
                        goToPage={goToPage}
                        isDarkMode={isDarkMode}
                        cellRenderer={CELL_RENDERER__SUMMARY}
                      />
                    )}
                    {mode == "transaction" && (
                      <Table
                        tableData={ticketData}
                        headers={headers}
                        onClickHandler={isClickHandlerAllowed}
                        pageTotal={pageTotal}
                        total={total}
                        pagination={pagination}
                        goToPage={goToPage}
                        isDarkMode={isDarkMode}
                        cellRenderer={CELL_RENDERER__TRANSACTION}
                      />
                    )}
                    {mode == "summaryShops" && (
                      <Table
                        tableData={ticketData}
                        headers={headers}
                        onClickHandler={isClickHandlerAllowed}
                        pageTotal={pageTotal}
                        total={total}
                        pagination={pagination}
                        goToPage={goToPage}
                        isDarkMode={isDarkMode}
                        cellRenderer={CELL_RENDERER__SUMMARY_SHOPS}
                      />
                    )}
                    {mode == "summaryUsers" && (
                      <Table
                        tableData={ticketData}
                        headers={headers}
                        onClickHandler={isClickHandlerAllowed}
                        pageTotal={pageTotal}
                        total={total}
                        pagination={pagination}
                        goToPage={goToPage}
                        isDarkMode={isDarkMode}
                        //   cellRenderer={CELL_RENDERER__TRANSACTION_USERS}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PageTicketList;
