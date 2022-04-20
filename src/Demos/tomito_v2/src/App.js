import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './views/Home/index';
import Portfolio from './views/Portfolio/index';
import { UserContext } from './components/Context/UserContext';

function App() {
  const [currentUser, setUser] = useState(null);
  const [loggedIn, setLoggedStatus] = useState(false)
  return (
    <UserContext.Provider value={{ currentUser, setUser,loggedIn, setLoggedStatus }}>
      <div className="App">
        <Helmet>
          <script
            src={process.env.REACT_APP_SLIDEOUT_SCRIPT_URL}
            type="text/javascript"
          />
          <script
            src={process.env.REACT_APP_MODAL_SCRIPT_URL}
            type="text/javascript"
          />
          <script
            src={process.env.REACT_APP_ACCORDION_SCRIPT_URL}
            type="text/javascript"
          />
        </Helmet>
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
