import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
// import { Settings, Questions, FinalPage } from '../Pages';
import QuizQuestions from '../Pages/QuizQuestions';
import Settings from '../Pages/Settings';
import FinalPage from '../Pages/FinalPage';

const ReactRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            {/* <Route exact path="/game" element={<Game />} /> */}
            <Route exact path="/settings" element={<Settings />} />
            <Route exact path="/questions" element={<QuizQuestions />} />
            <Route exact path="/score" element={<FinalPage />}/>
        </Routes>
    )
}
export default ReactRouter;