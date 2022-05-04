import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home/index';
import Portfolio from './views/Portfolio/index';
import { UserContext } from './components/Context/UserContext';

function App() {
  const [currentUser, setUser] = useState(null);
  const [loggedIn, setLoggedStatus] = useState(false);
  const [version, setVersion] = useState(null);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setUser,
        loggedIn,
        setLoggedStatus,
        version,
        setVersion,
      }}
    >
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/portfolio" element={<Portfolio />} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
