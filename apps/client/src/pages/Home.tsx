import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:4000/api/health');
      return response.data;
    },
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to BFF POC</h1>
      <p className="text-gray-600 mb-4">
        This is a proof of concept application demonstrating the BFF (Backend for Frontend)
        architecture with React SPA and SSR capabilities.
      </p>
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <h2 className="text-lg font-semibold mb-2">API Health Check</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

export default Home;
