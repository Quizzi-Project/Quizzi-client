import { useEffect, useRef } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const tempNavigate = useRef();
    tempNavigate.current = navigate('/login');


    const logoutUser = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token);
            if (!user) {
                localStorage.removeItem('token');
                navigate('/login')
            } else {
                console.log('accepted');
            }
        } else {
            navigate('/login')
        }
    }, []);
    return (
        <>
            <h1>Dashboard</h1>
            <div onClick={logoutUser}>logout</div>
        </>
    );
}

export default Dashboard;