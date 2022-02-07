import React from 'react';
import { TableState as TableProps } from './type';

const DataTable: React.FC<TableProps> = ({ columns, data }) => {
  const trs = data.map((e) => Object.values(e));

  return (
    <table>
      <thead>
        <tr>
          {columns.map((e, i) => (
            <th key={i}>{e.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {trs.map((tds, i) => (
          <tr key={i}>
            {tds.map((e, i) => (
              <td key={i}>{e}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
