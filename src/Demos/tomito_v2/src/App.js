import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './views/Home/index';
import Portfolio from './views/Portfolio/index';

function App() {
  return (
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
  );
}

export default App;
