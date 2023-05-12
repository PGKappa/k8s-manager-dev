import React, { useCallback, useContext, useEffect, useState, FC } from "react";
import { ThemeContext } from "@/context";
import Loader from "@/components/Loader";
import { Strip, Form, MainTable, Col } from "@canonical/react-components";
import {
  requestTicketList,
  requestDailyReportSummary,
  RequestDailyReportSummaryResponse,
  RequestTicketSummaryResponse,
  TicketSummaryGroupBy,
} from "@/hooks/tickets";
import { requestExportReports } from "@/hooks/exports";
import { getCurrentWeekinPHPFormat, getTodayDate, quicksort } from "@/utils";
// import { formatDate } from "@pg-ui/i18n";
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import { useAuth } from "@/hooks/auth";
import { toast } from "react-toastify";
import { Line } from "@/components/Chart";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslation } from "@pg-ui/i18n";
// import { formatTime } from "@pg-ui/i18n";

const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });

type SummaryDateResponseReport = {
  date: string;
  active_shops: number;
  gross_in: string;
  sumIn: string;
  sumOut: string;
  amountUnpaid: string;
  sumProfit: string;
  sumPercentage: string;
  concatPercentage: string;
};

type SummaryDateResponse = {
  mode: "summaryDate";
  status: number;
  pagination: {
    total: number;
    chunk: number;
    limit: string;
    last_chunk: number;
  };
  totalSum: {
    user_id: string;
    sumIn: string;
    sumOut: string;
    concatPercentage: string;
    intl: {
      locale: string;
    };
  };
  totalSumOfPerPage: null;
  reports: SummaryDateResponseReport[];
  params: {
    type: "summary";
    fromDate: string;
    toDate: string;
    groupBy: "date";
    shops: null;
    users: null;
  };
};

const dashboard: FC = ({ asidePanel }: any) => {
  const { user } = useAuth({ middleware: "auth" });

  const { isDarkMode } = useContext(ThemeContext),
    todaysDate = getTodayDate(),
    [isWaitingForResponse, setIsWaitingForResponse] = useState<boolean>(true),
    [isWaitingForExport, setIsWaitingForExport] = useState<boolean>(false),
    [reportChartData, setReportChartData] = useState({
      chartData: [],
      fromDate: getTodayDate(7),
      toDate: todaysDate,
    });

  const currentWeekinPHPFormat = getCurrentWeekinPHPFormat(),
    [weeklyReportDate, setWeeklyReportDate] = useState(currentWeekinPHPFormat),
    [weeklyReportType, setWeekReportType] = useState(),
    [weeklyReportChartDates, setWeeklyReportChartDates] = useState({
      fromDate: getTodayDate(7),
      toDate: todaysDate,
    });

  const { t } = useTranslation("");

  const [requestParams, setRequestParams] = useState({
    type: "summary",
    groupBy: "date",
    limit: 2000,
    chunk: 1,
  });
  const [todayReportData, setTodayReportData] = useState({
      dogs6: {
        in: 0,
        out: 0,
        profit: 0,
      },
      horses6: {
        in: 0,
        out: 0,
        profit: 0,
      },
    }),
    [todayReportDataIsLoading, setTodayReportDataIsLoading] =
      useState<boolean>(true);

  const formatDateDatepicker = useCallback((date: string | Date) => {
    let d: Date;
    if (typeof date == "string") {
      d = new Date(date);
    } else {
      d = date;
    }
    // var d = new Date(date),
    var month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${day}/${month}/${year}`;
  }, []);

  const createReportChartData = useCallback(
    (tickets: SummaryDateResponse) => {
      if (!formatDateDatepicker) return;
      let dataProfit = [];
      let dataSumIn = [];
      let dataSumOut = [];

      var date1 = new Date(tickets.params.fromDate);
      var date2 = new Date(tickets.params.toDate);

      var difference = date2.getTime() - date1.getTime() + 1;
      var numOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      let datesInDateRange = Array.from({ length: numOfDays }, () => new Date())
        .map((date, idx) => {
          date.setDate(date.getDate() - idx);

          return date;
        })
        .map((date) => {
          return {
            date: date,
            formattedDate: formatDateDatepicker(date), /// here
            active_shops: 0,
            gross_in: 0,
            sumIn: "0",
            sumOut: "0",
            amountUnpaid: "0",
            sumProfit: "0",
            sumPercentage: "0",
            concatPercentage: "0 (0%)",
          };
        });

      const reportsDatas = new Map<string, SummaryDateResponseReport>();

      tickets.reports.forEach((report: SummaryDateResponseReport) => {
        // console.warn("dateNotFOrmates", report.date); // printed
        let dateFormated = formatDateDatepicker(report.date); // getMonth is not a function , report.date = HOW WHEN ITS A STRING
        // console.warn("DateFormated", dateFormated); // not printed
        reportsDatas.set(dateFormated, {
          ...report,
          formattedDate: dateFormated,
        });
      });

      // datesInDateRange.forEach((report) => {
      //   console.warn(report.date, reportsDatas);
      //   const exists = reportsDatas.has(report.date);
      //   if (!exists) {
      //     reportsDatas.set(report.date, report);
      //   }
      // });

      datesInDateRange = datesInDateRange.map(
        (report: SummaryDateResponseReport) => {
          const exists = reportsDatas.has(report.formattedDate);
          if (exists) {
            return reportsDatas.get(report.formattedDate);
          }
          return report;
        }
      );

      console.warn("datesInDateRange ", datesInDateRange);
      // reportsDatas.forEach((item) => {
      //   dataProfit.push({
      //     date: item.date,
      //     params: Number(item.sumProfit),
      //   });
      //   dataSumIn.push({
      //     date: item.date,
      //     params: Number(item.sumIn),
      //   });
      //   dataSumOut.push({
      //     date: item.date,
      //     params: Number(item.sumOut),
      //   });
      // });

      datesInDateRange.forEach((item) => {
        dataProfit.push({
          date: item.formattedDate,
          notFormattedDate: item.date,
          params: Number(item.sumProfit),
        });
        dataSumIn.push({
          date: item.formattedDate,
          notFormattedDate: item.date,
          params: Number(item.sumIn),
        });
        dataSumOut.push({
          date: item.formattedDate,
          notFormattedDate: item.date,
          params: Number(item.sumOut),
        });
      });

      const data = [
        {
          label: "Profit",
          // data: dataProfit
          data: quicksort(dataProfit, (x) =>
            new Date(x.notFormattedDate).getTime()
          ),
        },
        {
          label: "Summary In",
          // data: dataSumIn
          data: quicksort(dataSumIn, (x) =>
            new Date(x.notFormattedDate).getTime()
          ),
        },
        {
          label: "Summary Out",
          // data: dataSumOut
          data: quicksort(dataSumOut, (x) =>
            new Date(x.notFormattedDate).getTime()
          ),
        },
      ];

      setReportChartData({
        fromDate: tickets.params.fromDate,
        toDate: tickets.params.toDate,
        chartData: data,
      });
    },
    [formatDateDatepicker]
  );

  const requestReportChartData = useCallback(
    (args) => {
      if (!createReportChartData) return;
      requestTicketList({
        params: {
          ...requestParams,
          fromDate: args.fromDate,
          toDate: args.toDate,
        },
        onSuccess: (res: SummaryDateResponse) => {
          if (res.reports.length > 0) {
            createReportChartData(res);
          }
          if (!isWaitingForResponse) {
            toast("Report chart updated!", {
              hideProgressBar: true,
              autoClose: 2000,
              type: "success",
            });
          }
        },
        onError: (e) => {
          setIsWaitingForResponse(false);

          toast("Failed to update chart", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
          });
        },
      });
    },
    [isWaitingForResponse, createReportChartData]
  );

  useEffect(() => {
    if (!requestReportChartData) return;
    // if (isMounted.current) return;
    if (isWaitingForResponse) {
      const argsActiveShopsData = {
        type: "summary",
      };

      requestReportChartData(requestParams);
      //   requestActiveShopsData(requestParams);

      requestTodaysProfitData({
        argsActiveShopsData,
        fromDate: todaysDate,
        toDate: todaysDate,
      });
      setIsWaitingForResponse(false);
    }
    // isMounted.current = true;
  }, [isWaitingForResponse, requestReportChartData]);

  const requestTodaysProfitData = (args: {
    fromDate: string;
    toDate: string;
    // groupBy: TicketSummaryGroupBy;
  }) => {
    // Active shops
    // console.warn(args);
    requestDailyReportSummary({
      params: {
        fromDate: args.fromDate,
        toDate: args.toDate,
        // type: "summary",
        // groupBy: args.groupBy,
      },
      onSuccess: (res: RequestDailyReportSummaryResponse) => {
        const responseData = res;

        // if (res.reports.length > 0) {
        // setTodayReportData({
        //   turnover: responseData.reports[0].in,
        //   profit: responseData.reports[0].profit,
        //   shopsCount: responseData.reports[0].active_shops,
        // });
        setTodayReportData(responseData.dailyReport);
        setIsWaitingForResponse(false);
        setTodayReportDataIsLoading(false);
        // }
      },
      onError: (e) => {
        setIsWaitingForResponse(false);
        toast(t("error.ticketshops"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      },
    });
  };

  function exportToCSv(week, eventType) {
    setIsWaitingForExport(true);
    if (!eventType) {
      toast("Please select an event type all , dogs6 or horses6", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
      setIsWaitingForExport(false);
    }
    requestExportReports({
      params: { week: week, eventType: eventType },
      onSuccess: (res) => {
        // setIsWaitingExportForResponse(false);
        setIsWaitingForExport(false);
      },
      onError: (e) => {
        setIsWaitingForExport(false);
      },
    });
  }

  if (isWaitingForResponse) return <Loader />;
  console.warn(todayReportData);
  return (
    <AppLayout asidePanel={asidePanel}>
      <Head>
        <title>{t("dashboard.title")}</title>
      </Head>
      <div
        className={"p-panel " + (isDarkMode ? "is-dark" : "")}
        id="dashboard"
      >
        <div className="p-panel__header u-align--center">
          <h4 className="p-panel__title targetTest">{t("dashboard.header")}</h4>
          <div className="p-panel__controls"></div>
        </div>
        <div className="p-panel__content ">
          {/* new  */}
          <Strip bordered element="section" className={"u-no-padding--top"}>
            <div className="l-fluid-breakout">
              <div className="l-fluid-breakout__main is-full-width u-equal-height">
                {/* card 1 */}
                <div className={"p-card" + (isDarkMode ? "is-dark" : "")}>
                  <h4 className="u-sv-1">
                    {t("dashboard.today_card.title")}{" "}
                    {t("dashboard.today_card.dogs6")}
                  </h4>

                  {todayReportDataIsLoading ? (
                    <div className="card-spinner">
                      <i class="p-icon--spinner u-animation--spin"></i>
                    </div>
                  ) : (
                    <div>
                      <MainTable
                        headers={[
                          {
                            content: t("dashboard.today_card.in"),
                          },
                          {
                            content: t("dashboard.today_card.out"),
                          },
                          {
                            content: t("dashboard.today_card.profit"),
                          },
                        ]}
                        rows={[
                          {
                            columns: [
                              {
                                content: todayReportData.dogs6.in,
                                role: "rowheader",
                              },
                              {
                                content: todayReportData.dogs6.out,
                              },
                              {
                                content: todayReportData.dogs6.profit,
                              },
                            ],
                          },
                        ]}
                      />

                      <footer
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <Link legacyBehavior href={"/tickets"}>
                          {/* <Chip
                        lead="Games"
                        value="Dogs6, Horses6"
                        className={isDarkMode ? "is-dark" : ""}
                      /> */}
                          <button
                            className={
                              isDarkMode ? "p-chip is-dark" : "p-chip "
                            }
                          >
                            <span className="p-chip__value">
                              {t("dashboard.today_card.dogs6")}
                            </span>
                          </button>
                        </Link>
                      </footer>
                    </div>
                  )}
                </div>
                {/* card 1 */}
                {/* card 2  */}
                <div className={"p-card" + (isDarkMode ? "is-dark" : "")}>
                  <h4 className="u-sv-1">
                    {t("dashboard.today_card.title")}{" "}
                    {t("dashboard.today_card.horses6")}
                  </h4>
                  {todayReportDataIsLoading ? (
                    <div className="card-spinner">
                      <i className="p-icon--spinner u-animation--spin"></i>
                    </div>
                  ) : (
                    <div>
                      <MainTable
                        headers={[
                          {
                            content: t("dashboard.today_card.in"),
                          },
                          {
                            content: t("dashboard.today_card.out"),
                          },
                          {
                            content: t("dashboard.today_card.profit"),
                          },
                        ]}
                        rows={[
                          {
                            columns: [
                              {
                                content: todayReportData.horses6.in,
                                role: "rowheader",
                              },
                              {
                                content: todayReportData.horses6.out,
                              },
                              {
                                content: todayReportData.horses6.profit,
                              },
                            ],
                          },
                        ]}
                      />
                      <footer
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <Link legacyBehavior href={"/tickets"}>
                          <button
                            className={
                              isDarkMode ? "p-chip is-dark" : "p-chip "
                            }
                          >
                            {/* <span className="p-chip__value">
                          {t("dashboard.today_card.dogs6")}
                        </span> */}
                            <span
                              className="p-chip__value"
                              style={{ marginLeft: "2px" }}
                            >
                              {t("dashboard.today_card.horses6")}
                            </span>
                          </button>
                        </Link>
                      </footer>
                    </div>
                  )}
                </div>
                {/* card 2 */}
                {/* card 3 */}
                <div className={"p-card" + (isDarkMode ? "is-dark" : "")}>
                  <h4 className="u-sv-1">
                    {t("dashboard.weekly_report.title")}
                  </h4>
                  <select
                    name="exampleSelect"
                    id="weeklyReportType"
                    onChange={(e) => {
                      setWeekReportType(e.target.value);
                    }}
                  >
                    <option value="">Select an event type</option>
                    <option value="1">All</option>
                    <option value="2">Dogs6</option>
                    <option value="3">Horses6</option>
                  </select>
                  <input
                    className={isDarkMode ? "is-dark " : ""}
                    type="week"
                    id="weekly-select"
                    min="2020-W18"
                    max={weeklyReportDate}
                    required
                    //   name="exportWeek"
                    defaultValue={weeklyReportDate}
                    onChange={(e) => {
                      setWeeklyReportDate(e.target.value);
                    }}
                    style={{ marginBottom: "1.5em" }}
                  />
                  <footer style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      className={isDarkMode ? "p-chip is-dark" : " p-chip "}
                      //   hasIcon={true}
                      id={"weeklyDownload"}
                      onClick={(e) => {
                        e.preventDefault();
                        exportToCSv(weeklyReportDate, weeklyReportType);
                      }}
                    >
                      <span
                        className="p-chip__value"
                        style={{ marginRight: "2px" }}
                      >
                        {isWaitingForExport ? (
                          <i className="p-icon--spinner u-animation--spin"></i>
                        ) : (
                          <i className="p-icon--begin-downloading"></i>
                        )}
                      </span>
                      <span className="p-chip__value">
                        {t("dashboard.weekly_report.button")}
                      </span>
                    </button>
                  </footer>
                </div>
                {/* card 3 */}
              </div>
            </div>
          </Strip>
          {/* end new */}
          {/* {tour} */}
          <Strip bordered element="section" includeCol={false} rowClassName="">
            <Col size={2}>
              <h3>{t("dashboard.chart.title")}</h3>
              <Form inline>
                <label>{t("dashboard.chart.start_date")}</label>
                <div>
                  <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    selected={Date.parse(reportChartData.fromDate)}
                    maxDate={Date.parse(todaysDate)}
                    onChange={(date: Date) => {
                      setWeeklyReportChartDates({
                        ...weeklyReportChartDates,
                        fromDate: date,
                      });
                      setReportChartData({
                        ...reportChartData,
                        fromDate: date,
                      });
                    }}
                    className={isDarkMode ? "is-dark" : ""}
                  />
                </div>
                <div>
                  <label>{t("dashboard.chart.end_date")}</label>
                  <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    selected={Date.parse(reportChartData.toDate)}
                    maxDate={Date.parse(todaysDate)}
                    onChange={(date: Date) => {
                      setWeeklyReportChartDates({
                        ...weeklyReportChartDates,
                        toDate: date,
                      });
                      setReportChartData({
                        ...reportChartData,
                        toDate: date,
                      });
                    }}
                    className={isDarkMode ? "is-dark" : ""}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    width: "100%",
                  }}
                >
                  <button
                    className={isDarkMode ? "p-chip is-dark" : "p-chip "}
                    // hasIcon={true}
                    onClick={(e) => {
                      e.preventDefault();
                      requestReportChartData(weeklyReportChartDates);
                    }}
                  >
                    <span
                      className="p-chip__value"
                      style={{ marginRight: "2px" }}
                    >
                      <i className="p-icon--change-version"></i>
                    </span>
                    <span className="p-chip__value">
                      <span>{t("dashboard.chart.button")}</span>
                    </span>
                  </button>
                </div>
              </Form>
            </Col>
            <Col
              size={10}
              className={"charts " + (isDarkMode ? "is-dark" : "")}
            >
              {reportChartData.chartData.length > 0 && (
                <Line chartData={reportChartData.chartData} />
              )}
            </Col>
          </Strip>

          {/* <Strip bordered includeCol={false} element="section">
            <Col size={2}>
              <h3>Active shops Report</h3>
              <Form inline>
                <label>Start Date</label>
                <div>
                  <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    selected={Date.parse(activeShopsData.fromDate)}
                    maxDate={Date.parse(maxDatePicker)}
                    onChange={(date: Date) => {
                      setActiveShopsChartDates({
                        ...weeklyReportChartDates,
                        fromDate: date,
                      });
                    }}
                    className={isDarkMode ? "is-dark" : ""}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    selected={Date.parse(activeShopsData.toDate)}
                    maxDate={Date.parse(maxDatePicker)}
                    onChange={(date: Date) => {
                      setActiveShopsChartDates({
                        ...weeklyReportChartDates,
                        toDate: date,
                      });
                    }}
                    className={isDarkMode ? "is-dark" : ""}
                  />
                </div>

                <Button
                  className={isDarkMode ? "is-dark" : ""}
                  hasIcon={true}
                  onClick={(e) => {
                    e.preventDefault();

                    requestActiveShopsData(activeShopsChartDates);
                  }}
                >
                  <i className="p-icon--change-version"></i>
                  <span>Update</span>
                </Button>
              </Form>
            </Col>
            <Col
              size={10}
              className={"charts " + (isDarkMode ? "is-dark" : "")}
            >
              {activeShopsData.chartData.length > 0 && (
                <Area chartData={activeShopsData.chartData} />
              )}
            </Col>
          </Strip> */}
        </div>
      </div>
    </AppLayout>
  );
};

export default dashboard;
