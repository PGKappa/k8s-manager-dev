import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import SplashScreen from "./components/SplashScreen";
import { BrowserRouter } from "react-router-dom";
const App = lazy(() => import("./App"));

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const appProps = Object.assign({}, rootElement.dataset);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense
        fallback={
          //   <div>
          <SplashScreen />
          //   </div>
        }
      >
        <App props={appProps} />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
