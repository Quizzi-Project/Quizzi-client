import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header/Header";

const Dashboard = () => {
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token);
            if (!user) {
                localStorage.removeItem('token');
                navigate('/login')
            }
        } else {
            navigate('/login')
        }
    }, []);
    return (
        <>
            <Header />
            <h1>Dashboard</h1>
        </>
    );
}

export default Dashboard;