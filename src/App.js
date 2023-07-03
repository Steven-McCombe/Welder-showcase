// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import UserRegister from './components/UserRegister'
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
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
        <Route path="/userregister" element={<UserRegister isScriptLoadSucceed={true} />} />
        <Route path="/userlist" element={<UserList />}/>
        <Route path="/userprofile/:id" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
