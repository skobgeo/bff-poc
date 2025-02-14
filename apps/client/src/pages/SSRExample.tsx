import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function SSRExample() {
  const { data, isLoading } = useQuery({
    queryKey: ['ssr-data'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:4000/api/ssr-data');
      return response.data;
    },
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">SSR Example Page</h1>
      <p className="text-gray-600 mb-4">
        This page demonstrates server-side rendering capabilities. When accessed directly through
        http://localhost:4000/ssr-example, it will be rendered on the server first.
      </p>
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Server Data</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

export default SSRExample;
