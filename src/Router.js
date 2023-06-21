import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WelderProfilePage from './pages/WelderProfilePage';
import EmployerProfilePage from './pages/EmployerProfilePage';
import JobPage from './pages/JobPage';
import ChatPage from './pages/ChatPage';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/welder/:id" component={WelderProfilePage} />
                <Route path="/employer/:id" component={EmployerProfilePage} />
                <Route path="/job/:id" component={JobPage} />
                <Route path="/chat" component={ChatPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
