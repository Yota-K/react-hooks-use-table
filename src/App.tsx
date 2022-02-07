import { useState, useEffect, useMemo } from 'react';
import { useTable } from './useTable';
import DataTable from './Table';

function App() {
  type Data = { userId: string; id: string; title: string };

  const [data, setData] = useState<Data[]>([]);
  const [mounted, setMounted] = useState(false);

  const columns = useMemo(
    () => [
      {
        name: 'userId',
      },
      {
        name: 'id',
      },
      {
        name: 'title',
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data: Data[] = await res.json();
      setTableData({ columns, data });
      setData(data);
      if (data) setMounted(true);
    };

    if (!mounted) fetchData();
  }, []);

  const { tableData, generateTableRow, setTableData, filterTableItems } = useTable<Data>(columns, data);
  const tableRow = generateTableRow(tableData.data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterTableItems(e.target.value);
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ paddingRight: '10px' }}>Search</span>
        <input type="text" onChange={handleChange} />
      </div>
      {mounted && (
        <table>
          <thead>
            <tr>
              {tableData.columns.map((e, i) => (
                <th key={i}>{e.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRow.map((tds, i) => (
              <tr key={i}>
                {tds.map((e, i) => (
                  <td key={i}>{e}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
