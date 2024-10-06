import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./Dropdown.css";

const Dropdown = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    const iconMarginClass =
        selectedOption === "Location" || selectedOption === "Status"
            ? "icon-margin-large"
            : "icon-margin-small";

    return (
        <div className={`dropdown ${isOpen ? "open" : ""}`}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                <span className="dropdown-text">{selectedOption}</span>
                {isOpen ? (
                    <ChevronUp
                        size={18}
                        className={`dropdown-icon ${iconMarginClass}`}
                    />
                ) : (
                    <ChevronDown
                        size={18}
                        className={`dropdown-icon ${iconMarginClass}`}
                    />
                )}
            </button>
            {isOpen && (
                <div className="dropdown-menu menu-width">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="dropdown-option"
                            onClick={() => handleOptionClick(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
