import React, { Profiler } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Leaderboard from '../Pages/Leaderboard';
import Profile from '../Pages/Profile';
import Header from '../Components/Header/Header';


const ReactRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>

    )
}
export default ReactRouter;