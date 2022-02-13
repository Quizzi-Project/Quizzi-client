import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header/Header";
import Statistics from "../Components/Statistics/Statistics";

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
            <Statistics />
        </>
    );
}

export default Dashboard;