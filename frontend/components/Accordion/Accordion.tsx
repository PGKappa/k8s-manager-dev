import React from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ content }) => {
  return (
    <aside className="p-accordion">
      <ul className="p-accordion__list">
        {content.map(({ title, content }, idx) => (
          <AccordionItem
            key={idx}
            title={title}
            content={content}
            contentId={idx}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Accordion;
