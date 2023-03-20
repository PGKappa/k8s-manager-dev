import React, { useEffect } from "react";
import Loader from "./Loader";

const SplashScreen = () => {
  useEffect(() => {
    const propertiesToCache = [
        "backgroundImage",
        "backgroundColor",
        "color",
        "fontFamily",
        "fontWeight",
        "margin",
        "height",
      ],
      cacheProperties = {};

    propertiesToCache.map((x) => (cacheProperties[x] = document.body.style[x]));
    document.body.style.backgroundImage =
      "linear-gradient(to bottom, #102c4a, #2f6188 87%)";
    document.body.style.backgroundColor = "unset";
    document.body.style.color = "#15385e";
    document.body.style.fontFamily = "'Nunito', sans-serif";
    document.body.style.fontWeight = "200";
    document.body.style.height = "100%";
    document.body.style.margin = "0px";

    return () => {
      Object.entries(cacheProperties).map(
        (x) => (document.body.style[x[0]] = x[1])
      );
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: "10px" }}>
          {/* <Image style={{ maxWidth: '70%' }} src="https://marketing.pg.company/cdn1/pgvirtual-blue.png" /> */}
          <div style={{ color: "white" }}>PGVirtual manager</div>
        </div>
        <Loader />
      </div>
      <div
        style={{
          width: "100%",
          position: "absolute",
          top: "100%",
          backgroundColor: "#001a2d",
          fontSize: "14px",
          textAlign: "center",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a href="http://www.pg.company">www.pg.company</a>
      </div>
    </div>
  );
};

export default SplashScreen;
