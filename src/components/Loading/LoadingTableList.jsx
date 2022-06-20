import React from "react";
import LoadingText from "./LoadingText";
import "./LoadingTableList.scss";

function LoadingTableList() {
  const tableRows = [];
  const numberOfRows = 4;

  for (let i = 0; i < numberOfRows; i++) {
    tableRows.push(
      <tr key={i} className="loading-table-list-row">
        <td className="poster-name">
          <div className="poster" />
          <LoadingText type="long" />
        </td>
        <td>
          <LoadingText type="word" />
        </td>
        <td>
          <LoadingText type="word" />
        </td>
        <td>
          <LoadingText type="long" />
        </td>
        <td>
          <LoadingText type="long" />
        </td>
      </tr>,
    );
  }

  return tableRows;
}

export default LoadingTableList;
