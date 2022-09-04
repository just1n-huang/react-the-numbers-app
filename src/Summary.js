// React is always needed here, even if it is not directly used
import React from "react";

const Summary = ({ items, label }) => {
  const sum = items.reduce((accum, item) => {
    return accum + item.data;
  }, 0);
  return (
    <div>
      The sum of {label} numbers is {sum}.
    </div>
  );
};

export default Summary;
