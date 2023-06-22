// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import UserProfile from './components/UserProfile'
import WelderList from './components/WelderList';
import WelderProfile from './components/WelderProfile';
import HomePage from './pages/HomePage';
import SignIn from './SignIn';
import SignUp from './SignUp';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/welder-list" element={<WelderList />}/>
        <Route path="/welder-profile/:id" element={<WelderProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
