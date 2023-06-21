import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WelderProfilePage from './pages/WelderProfilePage';
import EmployerProfilePage from './pages/EmployerProfilePage';
import JobPage from './pages/JobPage';
import ChatPage from './pages/ChatPage';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/welder/:id" element={<WelderProfilePage />} />
                <Route path="/employer/:id" element={<EmployerProfilePage />} />
                <Route path="/job/:id" element={<JobPage />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
