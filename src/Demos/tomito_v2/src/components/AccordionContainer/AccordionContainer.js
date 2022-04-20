import { useEffect } from 'react';

const AccordionContainer = ({ currentUser }) => {
  useEffect(() => {
    var element = document.querySelector('#bestow-accordion-iframe');
    var accordionClass = document.querySelector(
      '#life-insurance-accordion-content',
    );
    if (element) {
      element.parentNode.removeChild(element);
      accordionClass.classList.remove('accordionClose');
    }
    window.BestowAccordion.setup(
      'life-insurance-accordion-content',
      'life-insurance-button',
      process.env.REACT_APP_AGENT_URL,
      currentUser,
    );
  }, [currentUser]);

  return (
    <div
      id="life-insurance-accordion-content"
      className="bg-white"
      style={{ height: '500px' }}
    ></div>
  );
};

export default AccordionContainer;
