import React from "react";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// install the following
// npm install @fortawesome/fontawesome-svg-core
// npm install  @fortawesome/free-solid-svg-icons
// npm install  @fortawesome/react-fontawesome

const Accordion = ({ title, content, isOpen, toggleAccordion }) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleAccordion = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div
      className="border-b-2 border-gray-200 py-2 cursor-pointer"
      onClick={toggleAccordion}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold">{title}</h3>
        <span className="text-blue-500">
          <FontAwesomeIcon icon={isOpen ? faAngleDown : faAngleRight} />
        </span>
      </div>
      <div
        className={`transition-all duration-300 ${
          isOpen ? "h-auto" : "h-0"
        } overflow-hidden`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
