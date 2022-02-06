import React from 'react';
import { TableState as TableProps } from './type';

const Table: React.FC<TableProps> = ({ columns, data }) => {
  // console.log(data);
  const ary = data.map((e) => Object.values(e));

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
        {ary.map((trs, i) => (
          <tr key={i}>
            {trs.map((e, i) => (
              <td key={i}>{e}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
