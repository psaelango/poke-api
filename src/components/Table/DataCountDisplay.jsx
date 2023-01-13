import React from "react";

const DataCountDisplay = ({ dataCount, filteredDataCount }) => (
  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
    Showing{" "}
    <span className="font-semibold text-gray-900 dark:text-white">
      {filteredDataCount}
    </span>{" "}
    of{" "}
    <span className="font-semibold text-gray-900 dark:text-white">
      {dataCount}
    </span>
  </span>
);

export default DataCountDisplay;
