import React from "react";
import DataCountDisplay from "./DataCountDisplay";
import Pagination from "./Pagination";

const TableFooter = ({ dataCount, filteredDataCount }) => (
  <nav
    className="flex items-center justify-between pt-4"
    aria-label="Table navigation"
  >
    <DataCountDisplay
      dataCount={dataCount}
      filteredDataCount={filteredDataCount}
    />
    <Pagination />
  </nav>
);

export default TableFooter;
