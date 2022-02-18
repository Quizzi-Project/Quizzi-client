import { useEffect, useState } from "react";
import { Link, Container, Button, Typography } from '@material-ui/core';
import styles from './Statistics.module.css';

const Statistics = () => {
    const [details, setDetails] = useState('');
    useEffect(() => {
        // fetch(`https://meadaysofcode.herokuapp.com/api/players/${localStorage.getItem('id')}`)
        fetch(`http://localhost:3001/api/players/${localStorage.getItem('id')}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setDetails(data[0]);
            })
    }, []);
    
    return (
        <Container maxWidth="xs" className={styles.container}>
            <Typography className={styles.typo} variant='h5'>Welcome, {details.name}!</Typography>
            <Typography className={styles.typo} variant='h5'>Games Won: {details.gamesWins}</Typography>
            <Typography className={styles.typo} variant='h5'>Games Lost: {details.gamesLosses}</Typography>
            <Typography className={styles.typo} variant='h5'>Total Points: {details.pointsEarned}</Typography>
            <Typography align='center'>
                {/* id={styles.link} */}
            <Link href='./edit'>
                <Button id={styles.editButton} href='./edit' variant="contained" color="secondary">
                Edit Account
            </Button>
            </Link>
            <Button id={styles.gameButt} href='./game' variant="contained" color="secondary">
                PLAY GAME
            </Button>
            </Typography>

        </Container>
    );
}

export default Statistics;