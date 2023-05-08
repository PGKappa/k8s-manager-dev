import React, { useCallback, useContext } from "react";
import { Accordion } from "@/components/Accordion";
// import { STEPS, getTranslatedSteps } from "@/TourSteps";
import { TourContext, ThemeContext } from "@/context";
// import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useTranslation } from "@pg-ui/i18n";
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
// import { useRouter } from "next/router";
import { useTour } from "@reactour/tour";

import stepsCreateNewAccount from "@/tours/createNewAccount";
import { useRouter } from "next/router";

const PageFAQ = () => {
  const { setSteps, setCurrentStep, setIsOpen } = useTour();
  const { startTour, tour } = useContext(TourContext);
  const { t } = useTranslation(""),
    { isDarkMode } = useContext(ThemeContext);
  //   const router = useRouter(),
  //   const handleTour = useCallback(
  //     (steps) => {
  //       if (!startTour) return;
  //       startTour({
  //         tourActive: true,
  //         run: true,
  //         steps: steps,
  //         stepIndex: 0,
  //       });
  //     },
  //     [startTour]
  //   );
  const router = useRouter();

  const contentData = [
    {
      title: "1. " + t("guide.tours.downloadWeeklyReport.question"),
      content: (
        <div className="row col-12">
          <div className="u-sv3">
            {t("guide.tours.downloadWeeklyReport.answer")}
          </div>
          <div>
            <button
            //   onClick={() => {
            //     setIsOpen(true);
            //     setSteps([
            //         {
            //           selector: "#sidemenu-users-button",
            //           content: "This is the first Step .1 download weekpy report ",
            //           actionAfter: () => {
            //             router.push("/manager");
            //           },
            //           stepInteraction: false,
            //         },
            //         {
            //           selector: ".p-panel__title",
            //           content: "This is the second Step",
            //         },
            //       ]);
            //     // startTour({run:true , steps:stepsCreateNewAccount });
            //   }}
            >
              Tour
            </button>
          </div>
        </div>
      ),
      contentId: "steps-download-weekly-report",
    },
    {
      title: "2. " + t("guide.tours.createNewAccount.question"),
      content: (
        <div className="row col-12">
          <div className="u-sv3">
            {t("guide.tours.createNewAccount.answer")}
          </div>
          <div>
            <button
              onClick={() => {
                setCurrentStep(0);
                //     startTour("stepsCreateNewAccount");
                setIsOpen(true);
                startTour({ run: true });
                setSteps([
                  {
                    selector: "#sidemenu-user-button",
                    content: (
                      <>
                        <p>This is the button that goes to user page. </p>
                      </>
                    ),
                    // stepInteraction: false,
                  },
                  {
                    selector: ".l-application",
                    position: "center",
                    content: (
                      <>
                        <p>Welcome to the user page</p>
                        <p>
                          {" "}
                          After page loads please click, right arrow to continue
                        </p>
                      </>
                    ),
                    action: () => {
                      console.warn("ACTIONAFTER");
                      // setTimeout(() => {
                      router.push("/manager/users");
                      // }, 500);
                    },
                  },
                  {
                    selector: "#user-create-button",
                    content: (
                      <>
                        <p>Button that opens user create panel from aside </p>
                        <p>Click the (+) button,then click the next arrow</p>
                      </>
                    ),
                    action: () => {
                      console.warn("create-buttton");
                    },
                  },
                  {
                    selector: "#user-create-form",
                    content: (
                      <>
                        <p>This is the user create panel form</p>
                        <p>Click arrow button to continue</p>
                      </>
                    ),
                    action: () => {
                      console.warn("create form");
                    },
                    // stepInteraction: false,
                  },
                  {
                    selector: "#sidemenu-faq-button",
                    content: (
                      <>
                        <p>Go back to faq page</p>
                        {/* <p>Click {"(->)"}arrow button to continue</p> */}
                      </>
                    ),
                  },
                  {
                    selector: ".l-application",
                    position: "center",
                    content: (
                      <>
                        <p>
                          You have finished tour : 2.
                          {t("guide.tours.createNewAccount.question")}
                        </p>
                        <p>Click {"(X)"}arrow button to close the tour</p>
                      </>
                    ),
                  },
                ]);
              }}
            >
              Tour
            </button>
          </div>
        </div>
      ),
      contentId: "steps-create-new-account",
    },
    {
      title:
        "3. " +
        "Where can I find the list of all the tickets placed by a shop?",
      content: (
        <div className="row col-12">
          <div className="u-sv3">under construction</div>
          <div>
            <button
              onClick={() => {
                alert("Under construction please excuse us");
              }}
            >
              Tour
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "4. " + "How can I check the status of a ticket? ",
      content: (
        <div className="row col-12">
          <div className="u-sv3">Under construction</div>
          <div>
            <button
              onClick={() => {
                alert("Under construction please excuse us");
              }}
            >
              Tour
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "5. " + "Where can I check if a viewer is properly working? ",
      content: (
        <div className="row col-12">
          <div className="u-sv3">under construction </div>
          <div>
            <button
              onClick={() => {
                alert("Under construction please excuse us");
              }}
            >
              Tour
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "6. " + "How can i change the language of a viewer ?",
      content: (
        <div className="row col-12">
          <div className="u-sv3">
            Viewer page you have to click on a viewer , it will open viewer edit
            as a side pannel then you can edit the language by slececting from
            Language drop down menu.
          </div>
          <div>
            <button
              onClick={() => {
                alert("Under construction please excuse us");
              }}
            >
              Tour
            </button>
          </div>
        </div>
      ),
    },
    {
      title:
        "7. " + "My colleague lost his password. How can he sign in again ?",
      content: (
        <div className="row col-12">
          <div className="u-sv3">
            Navigating through the user page, shows where you can find your
            colleague and how you could change his data.
          </div>
          <div>
            <button
              onClick={() => {
                alert("Under construction please excuse us");
              }}
            >
              Tour
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "8. " + "How to see the Report chart for in date range?",
      content: (
        <div className="row col-12">
          <div className="u-sv3">
            Report chart displays the income , outcome and profit in selected
            date range
          </div>
          <div>
            <button onClick={() => {}}>Tour</button>
          </div>
        </div>
      ),
    },
    {
      title: "9. " + "How to see the Report of today?",
      content: (
        <div className="row col-12">
          <div className="u-sv3">Turnover, profit, active users</div>
          <div>
            <button
              onClick={() => {
                alert("Under construction please excuse us");
              }}
            >
              Tour
            </button>
          </div>
        </div>
      ),
    },
    {
      title:
        "10. " + "How can I see the active users in a specified timeframe ?",
      content: (
        <div className="row col-12">
          <div className="u-sv3">
            Set a start date and an end date to see how many users played each
            day.
          </div>
          <div>
            <button
              onClick={() => {
                alert("Under construction please excuse us");
              }}
            >
              Tour
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "11. " + "Active shops chart",
      content: (
        <div className="row col-12">
          <div className="u-sv3">
            end to end explanation of Active shops chart
          </div>
          <div>
            <button
              onClick={() => {
                alert("Under construction please excuse us");
              }}
            >
              Tour
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <Head>
        <title>Manager - Frequently Asked Questions</title>
      </Head>
      <div className={"p-panel " + (isDarkMode ? "is-dark" : "")}>
        <div className="p-panel__header">
          <h4 className="p-panel__title targetTest">
            Frequently Asked Questions
          </h4>
          <div className="p-panel__controls"></div>
        </div>

        <div className="p-panel__content ">
          {/* {tour} */}
          <Accordion content={contentData} />
        </div>
      </div>
    </AppLayout>
  );
};

export default PageFAQ;
