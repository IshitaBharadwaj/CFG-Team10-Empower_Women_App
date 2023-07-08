import Login from "./components/Login";
import Register from "./components/Register";
import MenteeRegister from './components/MenteeRegister'
import LandingPage from "./components/LandingPage";
import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./components/HomePage";
import MentorRegister from "./components/MentorRegister";
import Calenderscreen from "./components/screen/Calenderscreen"
import MenteeMaindashboard from "./components/menteedashboard/Maindashboard";
import MentorMaindashboard from "./components/mentordashboard/MaindashboardAA";


import MyCalender from "./components/Calender";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import PersonalProfile from "./components/PIC/PIC_dashboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/mentee-registration" element={<MenteeRegister/>} />
            <Route path="/mentor-registration" element={<MentorRegister/>} />
            <Route path="/dashboard-mentee" element={<MenteeMaindashboard/>} />
            <Route path="/dashboard-mentor" element={<MentorMaindashboard/>} />
            <Route path="/dashboard-pic" element={<PersonalProfile/>} />
            <Route path="/calender/:id" element={<MyCalender/>}/>
          </Routes>
        </div>
      </header>

    </div>
  );
}

export default App;
