import { useState, useEffect, useMemo } from 'react';
import { useTable } from './use-table';
import Table from './Table';

function App() {
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
      if (data) setTableLoading(false);
    };

    if (tableLoading) fetchData();
  }, []);

  const { tableData, setTableData, tableLoading, setTableLoading, filterTableItems } = useTable<Data>(columns, data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterTableItems(e.target.value);
  };

  return (
    <div className="App">
      <input type="text" onChange={handleChange} />
      {tableLoading ? <p>Loading Please wait...</p> : <Table columns={tableData.columns} data={tableData.data} />}
    </div>
  );
}

export default App;
