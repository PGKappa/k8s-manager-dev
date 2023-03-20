import { useAuth } from "@/hooks/auth";

import React, {
  useEffect,
  useContext,
} from "react";
import { ThemeContext, TourContext } from "@/context";
import Sidebar from "@/components/Sidebar";
// import Tour from "@/components/Tour";
// import Joyride, { CallBackProps, STATUS, Step, ACTIONS } from "react-joyride";
type AppLayoutProps = {
    children,
    asidePanel?
}
const AppLayout = ({ children, asidePanel }:AppLayoutProps) => {
  const { user } = useAuth({ middleware: "auth" }),
    { isDarkMode, showLogo, setShowLogo } = useContext(ThemeContext),
    { tour } = useContext(TourContext);

  useEffect(() => {
    // console.log("render");
    var url = window.location.search.substring(1); //get rid of "?" in querystring
    var qArray = url.split("&"); //get key-value pairs

    console.log(qArray);
    for (var i = 0; i < qArray.length; i++) {
      var pArr = qArray[i].split("="); //split key and value

      if (pArr[0] == "show_logo") {
        console.log("showLogo is ", pArr[1]);
        setShowLogo(pArr[1]);
        // tempShowLogo = pArr[1]
      }
    }

    // if(tempShowLogo){
    //     tempShowLogo = true;
    //     setShowLogo(true);
    // }
    console.log("showLog after useEffect", showLogo);
  }, []);

  if (!user) return null;

  return (
    <div className="l-application" role="presentation">
      <Sidebar showLogo={showLogo} />

      <main className="l-main">{children}</main>
      {asidePanel && (
        <aside
          ref={asidePanel.ref}
          className={`l-aside is-jaas ${
            !asidePanel.isOpen ? "is-collapsed" : ""
          } ${isDarkMode ? "is-dark" : ""}`}
          id="aside-panel"
        >
          <div className={`p-panel ${isDarkMode ? "is-dark" : ""}`}>
            <div className="p-panel__header">
              <h4 className="p-panel__title">{asidePanel.title}</h4>
              <div className="p-panel__controls">
                <button
                  className="p-button--base js-aside-close u-no-margin--bottom has-icon"
                  onClick={asidePanel.closeAsidePanel}
                >
                  <i className="p-icon--close"></i>
                </button>
              </div>
            </div>

            <div className="p-panel__content">{asidePanel.content}</div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default AppLayout;
