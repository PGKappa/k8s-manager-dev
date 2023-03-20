import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "@canonical/react-components";
import { ThemeContext } from "../context";

const Loader = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={
        "p-panel u-align--center u-vertically-center " +
        (isDarkMode ? "is-dark" : "is-none")
      }
    >
      <div className={"p-strip" + (isDarkMode ? "is-dark" : "")}>
        <Spinner text="Loading..." />
      </div>
    </div>
  );
};

export default Loader;
