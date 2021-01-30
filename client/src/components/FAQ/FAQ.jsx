import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";

const FAQ = ({ values }) => {
  return (
    <div className="section-lg">
      <div className="container">
        <div className="row col-spacing-50">
          <div className="col-12 col-lg-6">
            {values.length ? (
              <Accordion>
                {values.map((item, key) => (
                  <AccordionItem key={key}>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        {item.Question}?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>{item.Answer}</p>
                    </AccordionItemPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;