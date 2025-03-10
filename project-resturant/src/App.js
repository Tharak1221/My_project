import { useState } from 'react';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';

const App = () => {
  const [page, setPage] = useState('signup'); // Start with Signup

  const renderPage = () => {
    switch (page) {
      case 'signup':
        return <Signup setPage={setPage} />;
      case 'login':
        return <Login setPage={setPage} />;
      case 'home':
        return <Home setPage={setPage} />;
      default:
        return <Signup setPage={setPage} />;
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {renderPage()}
    </div>
  );
};

export default App;
