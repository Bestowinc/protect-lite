import { useEffect } from 'react';

const AccordionContainer = ({ currentUser, loaded }) => {
  useEffect(() => {
    window.BestowAccordion?.setup(
      'life-insurance-accordion-content',
      'life-insurance-button',
      process.env.REACT_APP_AGENT_URL,
      currentUser,
    );
  }, [currentUser, loaded]);

  return (
    <div
      id="life-insurance-accordion-content"
      className="bg-white"
      style={{ height: '500px' }}
    ></div>
  );
};

export default AccordionContainer;
