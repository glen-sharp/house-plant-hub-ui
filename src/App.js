import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from "react";

import HeaderBar from "./HeaderBar/HeaderBar";
import Dashboard from "./PlantDashboard/PlantDashboard";
import UserInfoInput from './Register/Register';
import UserLoginInput from './Login/Login';
import ReadingHistory from './ReadingHistory/ReadingHistory';
import "./App.css"

function App() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  return (
    <Router>
      <div
        className={isSticky ? 'sticky' : ''}
        style={{ zIndex: "1" }}
      >
        <HeaderBar />
      </div>
      <div style={{ marginTop: isSticky ? '56px' : '0' }}>
        <Routes>
          <Route exact path="/register" element={<UserInfoInput />}></Route>
          <Route exact path="/login" element={<UserLoginInput />}></Route>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route exact path="/history/:plantId" element={<ReadingHistory />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
