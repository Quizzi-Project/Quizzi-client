import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

const ReactRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Dashboard />} />
        </Routes>
    )
}
export default ReactRouter;