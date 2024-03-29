// import "tailwindcss/tailwind.css";
import "../PageLogin.scss";

import "../_base_icon-definitions.scss";
import "../settings.scss";
import "../toast.scss";
import "../index.scss";
import "../Sidebar.custom.scss";
// import "../Pagination.scss";
// import "../Pagination.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
// import Tour from "@/components/Tour";
// import Intro from "@/components/Intro/Intro";
// import "intro.js/introjs.css";

import { ToastContainer } from "react-toastify";
import TOURS from "@/tours";

import React, {
  useEffect,
  useMemo,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";

import {
  // AuthContext,
  ThemeContext,
  AsidePanelContext,
  SidebarContext,
  TourContext,
} from "@/context";
import { DictionaryContext, Dict } from "@pg-ui/i18n";
import { enDict } from "@/locale/en";
import { itDict } from "@/locale/it";
import { useRouter } from "next/router";
// import { Steps } from "intro.js-react";
// import Tour from "reactour";
// import dynamic from "next/dynamic";
import { useTour, TourProvider } from "@reactour/tour";

// const TourNoSSR = dynamic(() => import("reactour"), { ssr: false });
function isDescendant(parent, child) {
  var node = child.parentNode;

  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
  // return parent.contains(child);
}
const App = ({ Component, pageProps }) => {
  const asidePanelCloseTimeout = useRef<NodeJS.Timeout>(),
    [themeDarkMode, setThemeDarkMode] = useState<boolean>(),
    themeId = "pg",
    [isLoading, setIsloading] = useState<boolean>(true),
    // { pathname, query } = useRouter(),
    sidePanelRef = useRef();
  const [language, setLanguage] = useState<string>("EN"),
    [tour, setTour] = useState({
      run: false,
      stepIndex: 0,
      steps: [],
      tourActive: false,
    });

  const router = useRouter();
  const [currentTour, setCurrentTour] = useState({
    name: "",
    pageId: "",
    steps: [],
    onCompleteCallback: () => {},
    onBeforeChangeCallback: () => {},
  });

  const [showLogo, setShowLogo] = useState<boolean>();

  //   const showLogo =
  //   query.show_logo !== undefined ? query.show_logo == "true" : true;

  const themeContextValue = useMemo(
    () => ({
      id: themeId,
      isDarkMode: themeDarkMode,
      setDarkMode: setThemeDarkMode,
      showLogo: showLogo,
      setShowLogo: setShowLogo,
    }),
    [themeDarkMode, themeId, showLogo]
  );
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarContextValue = useMemo(
    () => ({
      isCollapsed: isSidebarCollapsed,
      toggle: () => setSidebarCollapsed(!isSidebarCollapsed),
    }),
    [isSidebarCollapsed]
  );
  const [asidePanel, setAsidePanel] = useState({
      isOpen: false,
      title: "",
      // showHeader: true,
      content: null,
    }),
    closeAsidePanel = useCallback(() => {
      setAsidePanel({
        title: "",
        content: null,
        isOpen: false,
      });
    }, []),
    asidePanelContextValue = useMemo(
      () => ({
        isOpen: asidePanel.isOpen,
        openAsidePanel: ({ title, content }) => {
          setAsidePanel({
            title,
            content,
            isOpen: true,
          });
          //   if (tour.run) {
          //     setTimeout(() => {
          //       setTour({
          //         run: true,
          //         tourActive: true,
          //         stepIndex: tour.stepIndex + 1,
          //         steps: tour.steps,
          //       });
          //     }, 400);
          //   }
        },
        closeAsidePanel: closeAsidePanel,
      }),
      [asidePanel, closeAsidePanel]
    ),
    dictionaryContextValue = useMemo(
      () => ({
        dict:
          language == "EN"
            ? new Dict().setData(enDict)
            : new Dict().setData(itDict),
        language: language,
        setLanguage: setLanguage,
      }),
      [language, setLanguage]
    );

  //   const { isOpen, currentStep, steps } = useTour(); // not usable because its in parent

  //   console.warn("currentStep", currentStep);
  //   console.warn("asidePanel before handleSide", asidePanel);

  const handleSidePanelOutsideClick = useCallback(
    (e) => {
      //   console.warn(document.querySelector(".reactour__popover"));
      //   console.warn(
      //     "isDescendant",
      //     isDescendant(e.target, document.querySelector(".reactour__popover"))
      //   );
      //   console.warn("target", e.target);
      //   console.warn("asidePanel.isOpen", asidePanel.isOpen);

      if (!tour.run) {
        return true;
      }
      if (!isDescendant(sidePanelRef.current, e.target)) {
        console.warn("closeing AsidePanel");
        closeAsidePanel();
        // document.removeEventListener("click");
      }
    },
    [asidePanel, isSidebarCollapsed , tour] //tour
  );

  useEffect(() => {   
    if (asidePanel.isOpen) {
      clearTimeout(asidePanelCloseTimeout.current);
      asidePanelCloseTimeout.current = setTimeout(() => {
        document.addEventListener("click", handleSidePanelOutsideClick, true);
      }, 1000);
    } else {
    //   console.warn("removing listener");
      clearTimeout(asidePanelCloseTimeout.current);
      document.removeEventListener("click", handleSidePanelOutsideClick, true);
    }

    return () => {
      document.removeEventListener("click", handleSidePanelOutsideClick);
      clearTimeout(asidePanelCloseTimeout.current);
    };
  }, [asidePanel, closeAsidePanel]);

  //   const tourContextValue = useMemo(
  //     () => ({
  //       tour: tour,
  //       startTour: ({ run, steps, tourActive, stepIndex }) => {
  //         setTour({
  //           run,
  //           steps,
  //           tourActive,
  //           stepIndex,
  //         });
  //       },
  //       //   stepIndex: stepIndex,
  //     }),
  //     [tour]
  //   );

  useEffect(() => {
    setThemeDarkMode(JSON.parse(localStorage.getItem("theme")) || false);
    setLanguage(JSON.parse(localStorage.getItem("locale")) || "EN");
    // http://localhost:3000/manager/login?&show_logo=false

    if (showLogo === undefined) {
      setShowLogo(true);
    }
  }, []);

  //   const [isEnabled, setEnabled] = useState(tour.run);

  //   const isTourEnabledRef = useRef();
  //   useEffect(() => {
  //     return () => {
  //       clearTimeout(isTourEnabledRef);
  //     };
  //   }, []);

  //   const currentTourComponent = useMemo(() => {
  //     // console.log("currentTour: ", currentTour);

  //     if (currentTour && currentTour.steps && currentTour.steps.length > 0) {
  //       if (!isEnabled) {
  //         clearTimeout(isTourEnabledRef);
  //         isTourEnabledRef.current = setTimeout(() => {
  //           setEnabled(true);
  //         }, 800);
  //       }

  //       return (
  //         <Steps
  //           enabled={isEnabled}
  //           initialStep={0}
  //           steps={currentTour.steps}
  //           onComplete={currentTour.onCompleteCallback}
  //           onExit={() => {
  //             console.log("on exit");
  //             // currentTourData
  //             // console.log(currentTour.steps)
  //             // setCurrentTour({
  //             //     name: "",
  //             //     pageId: "",
  //             //     steps: [],
  //             //   });
  //             setEnabled(false);
  //           }}
  //           onBeforeChange={currentTour.onBeforeChangeCallback}
  //           onAfterChange={currentTour.onAfterChangeCallback}
  //           options={{
  //             showButtons: true,
  //             disableInteraction: false,
  //             showProgress: false,
  //           }}
  //         />
  //       );
  //     }

  //     return null;
  //   }, [currentTour, isEnabled]);

  //   const startTour = useCallback((tourName) => {
  //     console.log(TOURS);
  //     const currentTourData = TOURS[tourName];
  //     let steps = currentTourData[currentTourData.startPage];
  //     console.log("steps have been set: ", steps);
  //     setCurrentTour({
  //       name: tourName,
  //       pageId: currentTourData.startPage,
  //       steps: steps,
  //       onCompleteCallback: () => {
  //         const lastStep = steps[steps.length - 1];
  //         console.log("last step: ", lastStep);

  //         if (lastStep.goNextPage) {
  //           steps = currentTourData[lastStep.goNextPage];
  //           console.log("new steps have been set: ", steps);
  //           setCurrentTour((prevTour) => {
  //             console.log("new steps have been set 2: ", steps);

  //             return {
  //               ...prevTour,
  //               pageId: lastStep.goNextPage,
  //               steps: steps,
  //             };
  //           });
  //           router.push("/" + lastStep.goNextPage);
  //         } else {
  //           console.log("Resetting steps of current tour");
  //           setCurrentTour({
  //             name: "",
  //             pageId: "",
  //             steps: [],
  //           });
  //         }
  //       },
  //       onBeforeChangeCallback: (newStepIndex, newElement) => {
  //         // currentTourData, steps
  //         /*
  //             userpagewelcome -> next -> button -> next welcomeuserpage
  //            */
  //         console.log(
  //           "onBeforeChangeCallback::onBeforeChangeCallback::newStepIndex",
  //           newStepIndex
  //         );
  //         console.log(
  //           "onBeforeChangeCallback::onBeforeChangeCallback::newElement",
  //           newElement
  //         );
  //         //
  //         console.log("steps[newStepIndex]: ", steps[newStepIndex]);
  //         if (steps[newStepIndex] && steps[newStepIndex].shouldTriggerClick) {
  //           setCurrentTour((prevCurrentTour) => ({
  //             ...currentTour,
  //             pendingClick: true,
  //             pendingClickTarget: newElement,
  //           }));
  //         }
  //         return;
  //       },
  //       onAfterChangeCallback: (newStepIndex, newElement) => {
  //         console.log(
  //           "onAfterChangeCallback::onAfterChangeCallback::newStepIndex",
  //           newStepIndex
  //         );
  //         console.log(
  //           "onAfterChangeCallback::onAfterChangeCallback::newElement",
  //           newElement
  //         );

  //         setCurrentTour((prevCurrentTour) => {
  //           console.log(
  //             "onAfterChangeCallback::onAfterChangeCallback::prevCurrentTour"
  //           );
  //           if (prevCurrentTour.pendingClick) {
  //             console.log(
  //               "onAfterChangeCallback::i'm clicking on ",
  //               prevCurrentTour.pendingClickTarget
  //             );
  //             prevCurrentTour.pendingClickTarget.click();
  //           }
  //           return {
  //             ...prevCurrentTour,
  //             pendingClick: false,
  //             pendingClickTarget: null,
  //           };
  //         });
  //       },
  //     });
  //   }, []);
  const { setSteps, setCurrentStep, setIsOpen } = useTour();
  //   const dictionaring = { dict: new Dict().setData(language == "EN" ? enDict : itDict ) };
  //   console.log(tour);
  return (
    <DictionaryContext.Provider value={dictionaryContextValue}>
      {/* <AuthContext.Provider value={authContextValue}> */}
      <ThemeContext.Provider value={themeContextValue}>
        <AsidePanelContext.Provider value={asidePanelContextValue}>
          <SidebarContext.Provider value={sidebarContextValue}>
            {/* <TourContext.Provider value={tourContextValue}> */}
            <TourContext.Provider
              //   value={{ startTour, tour: currentTourComponent }}
              value={{ tour: tour , startTour:setTour }}
            >
            <TourProvider
              steps={[]}
              beforeClose={() => {
                setCurrentStep(0);
                // startTour("stepsCreateNewAccount");
                setIsOpen(false);
                setTour({run:false})
              }}
            >
              <>
                {/* reactour v1
                <TourNoSSR
                  getCurrentStep={(curr) =>
                    console.log(`The current step is ${curr + 1}`)
                  }
                  updateDelay={50}
                  steps={[
                    {
                      selector: "#sidemenu-dashboard-button",
                      content: "This is the first Step",
                      action: ()=> router.push("/manager")
                      ,
                    },
                    {
                      selector: ".p-panel__title",
                      content: "This is the first Step",
                    },
                  ]}
                  isOpen={tour.run}
                  onRequestClose={() => {
                   setTour({run:false});
                  }}
                /> */}
                {/* <Steps
                  enabled={true}
                  steps={[
                    {
                      element: "#sidemenu-dashboard-button",
                      position: "bottom",
                      intro: "Dashboard Page",
                      tooltipClass: "myTooltipClass",
                      highlightClass: "myHighlightClass",
                      //"goNextPage": "dashboard",
                    },
                  ]}
                  initialStep={0}
                  onExit={() => console.log("exit")}
                /> */}
                {/* <Tour
                // tour={tour} startTour={tourContextValue.startTour}
                />*/}

                {/* <JoyRideNoSSR
                  callback={handleJoyrideCallback}
                  continuous
                  hideCloseButton
                  run={tour.run}
                  scrollToFirstStep
                  showProgress
                  showSkipButton
                  steps={tour.steps}
                  stepIndex={tour.stepIndex}
                  styles={{
                    options: {
                      zIndex: 10000,
                    },
                  }}
                  debug
                /> */}
                <Component
                  {...pageProps}
                  asidePanel={{
                    ...asidePanel,
                    ...asidePanelContextValue,
                    ref: sidePanelRef,
                  }}
                  // loading={setIsloading}
                  // isLoading={isLoading}
                />
                <ToastContainer />
              </>
            </TourProvider>
            </TourContext.Provider>
          </SidebarContext.Provider>
        </AsidePanelContext.Provider>
      </ThemeContext.Provider>
      {/* </AuthContext.Provider> */}
    </DictionaryContext.Provider>
  );
};

export default App;
