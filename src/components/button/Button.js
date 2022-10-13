import React from "react";

export const Button = (props) => {
  const { value, type, buttonStyle, label, onClick } = props;

  const handleButtonClick = () => {
    onClick(value, type);
  };
  return (
    <button name={value} className={buttonStyle} onClick={handleButtonClick}>
      {label}
    </button>
  );
};
