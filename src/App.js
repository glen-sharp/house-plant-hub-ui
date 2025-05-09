import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import HeaderBar from "./HeaderBar/HeaderBar";
import Dashboard from "./PlantDashboard/PlantDashboard";
import UserInfoInput from './Register/Register';
import UserLoginInput from './Login/Login';
import LogOut from './Logout/Logout';
import ReadingHistory from './ReadingHistory/ReadingHistory';

function App() {
  return (
    <Router>
      <HeaderBar />
      <Routes>
        <Route exact path="/register" element={<UserInfoInput />}></Route>
        <Route exact path="/login" element={<UserLoginInput />}></Route>
        <Route exact path="/logout" element={<LogOut />}></Route>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/history/:plantId" element={<ReadingHistory />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
