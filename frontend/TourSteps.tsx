import React from "react";

// 1. "How can I download a Weekly Report into a file that I can open with Excel ? ",
export const stepsDownloadWeeklyReport = [
  {
    isRoute: true ,
    disableBeacon: true,
    spotlightClicks: true,
    hideCloseButton: true,
    hideFooter: true,
    placement: "bottom",
    target: "#sidemenu-dashboard-button",
    title: "Dashboard Page",
  },
  {
    placement: "center",
    // target: "#dashboard",
    target: "body",
  },
  {
    disableBeacon: true,
    placement: "left",
    target: ".weekly-report-container",
  },
  {
    disableBeacon: true,
    placement: "left",
    target: "#weekly-select",
  },
  {
    disableBeacon: true,
    placement: "left",
    styles: {
      options: {
        width: 300,
      },
    },
    target: "#weeklyDownload",
  },
  {
    disableBeacon: true,
    spotlightClicks: true,
    hideCloseButton: true,
    hideFooter: true,
    placement: "bottom",
    target: "#sidemenu-faq-button",
    title: "FAQ Page",
  },
  {
    disableBeacon: true,
    placement: "bottom",
    target: "#steps-download-weekly-report",
  },
];

// 2. "How can I create a new account for my colleague ? ",
export const stepsCreateNewAccount = [
  {
    //1 button from sidebar that goes to UserPage
    disableBeacon: true,
    spotlightClicks: true,
    hideCloseButton: true,
    hideFooter: true,
    placement: "bottom",
    target: "#sidemenu-user-button",
    title: "Users Page",
  },
  {
    //2 body that shows this is the userpage
    placement: "center",
    // target: "#dashboard",
    target: "body",
  },
  {
    //3 clicking on button that opens aside panel
    placement: "left",
    target: "#user-create-button",
    // disableBeacon: true,
    // disableOverlayClose: true,
    // spotlightClicks: true,
    hideCloseButton: true,
    hideFooter: true,
    disableOverlay:true ,
    // event: "click",
  },
  {
    //4
    placement: "left",
    target: "#user-create-form",
  },
  // {
  //   //5
  //   placement: "top",
  //   target: "#username-input",
  // },
  // {
  //   placement: "top",
  //   target: "#level-select",
  // },
  // {
  //   placement: "top",
  //   target: "#password-iput",
  // },
  // {
  //   placement: "top",
  //   target: "#confirm-password-input",
  // },
  // {
  //   placement: "top",
  //   target: "create-user-button",
  // },
  // {
  //   placement: "top",
  //   target: "create-user-button",
  // },
];

export const STEPS = {
  // Note 14/09/2022:
  // The values of this object contain the
  // keys of the dictionary.
  // Example: guide.tours.downloadWeeklyReport.question
  DOWNLOAD_WEEKLY_REPORT: "downloadWeeklyReport",
  CREATE_NEW_ACCOUNT: "createNewAccount",
};

export function getTranslatedSteps(id: string, t) {
  var steps;
  switch (id) {
    case "downloadWeeklyReport":
      steps = stepsDownloadWeeklyReport;
      break;
    case "createNewAccount":
      steps = stepsCreateNewAccount;
      break;

    default:
      steps = [];
      break;
  }
  return steps.map((x, idx) => ({
    ...x,
    content: (
      <>
        <h2>{t("guide.tours." + id + ".steps." + idx + ".title")}</h2>
        <div>{t("guide.tours." + id + ".steps." + idx + ".content")}</div>
        <p className="u-align-text--small-to-default p-text--small">
          {t("guide.tours." + id + ".question")}
        </p>
      </>
    ),
  }));
}
