import { ThemeContext } from "../context";
import React, { useContext, useState } from "react";

export type TableExpandProps = {
  panelContext: string;
  panelHeader: string;
  buttonText: string;
  ariaControlls: string;
};

const TableExpandItem = ({
  panelContext,
  panelHeader,
  buttonText,
  ariaControlls,
}: TableExpandProps) => {
  const [expandRow, setExpandRow] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <td className="u-align--left">
        <button
          className={
            "u-toggle is-dense p-button " + (isDarkMode ? "is-dark" : "")
          }
          aria-controls={ariaControlls}
          aria-expanded="true"
          onClick={() => setExpandRow(!expandRow)}
        >
          {buttonText}
        </button>
      </td>
      <td
        id={ariaControlls}
        className="p-table__expanding-panel "
        aria-hidden={expandRow}
      >
        <div className="row">
          <div className="col-8">
            <h4>{panelHeader}</h4>
            <p>{panelContext}</p>
          </div>
        </div>
      </td>
    </>
  );
};

export default TableExpandItem;
