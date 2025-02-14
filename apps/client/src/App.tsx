import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SSRExample from './pages/SSRExample';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ssr-example" element={<SSRExample />} />
      </Routes>
    </Layout>
  );
}

export default App;
