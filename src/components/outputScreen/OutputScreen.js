import React from "react";

export const OutputScreen = ({ value }) => {
  return (
    <div className="flex display">
      <input type="text" tabIndex="-1" value={value} />
    </div>
  );
};
