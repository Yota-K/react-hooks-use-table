import { useState, useEffect, useMemo } from 'react';
import { useTable } from './useTable';
import DataTable from './Table';

function App() {
  const [mounted, setMounted] = useState(false);

  type Data = { userId: string; id: string; title: string };
  const [data, setData] = useState<Data[]>([]);

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

  const { tableData, setTableData, filterTableItems } = useTable<Data>(columns, data);

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
        <>
          <DataTable columns={tableData.columns} data={tableData.data} />
        </>
      )}
    </div>
  );
}

export default App;
