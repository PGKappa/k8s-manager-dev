import React, { useState } from "react";

const AccordionItem = ({ title, content, contentId }) => {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <li
      className="p-accordion__group"
      id={contentId == 0 ? "steps-download-weekly-report" : ""}
    >
      <div role="heading" aria-level="3" className="p-accordion__heading">
        <button
          type="button"
          className="p-accordion__tab"
          id={"tab" + contentId}
          aria-controls={contentId + "-section"}
          aria-hidden={isClosed}
          onClick={() => {
            setIsClosed(!isClosed);
          }}
        >
          {title}
        </button>
      </div>
      <section
        // key={contentId}
        className="p-accordion__panel"
        id="tab1-section"
        aria-hidden={!isClosed}
        aria-labelledby={contentId}
      >
        <div>{content}</div>
      </section>
    </li>
  );
};
export default AccordionItem;
