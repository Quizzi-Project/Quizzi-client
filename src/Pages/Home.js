import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <h3><Link to='/dashboard'>Dashboard</Link></h3>
            <h3><Link to='/settings'>Settings</Link></h3>
            <a href="./login">login</a>
        </>
    );
}

export default Home;