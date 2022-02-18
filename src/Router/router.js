
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Leaderboard from '../Pages/Leaderboard';
import Profile from '../Pages/Profile';



const ReactRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/edit" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>

    )
}
export default ReactRouter;