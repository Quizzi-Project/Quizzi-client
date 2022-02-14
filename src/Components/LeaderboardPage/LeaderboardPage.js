import { Container, Typography } from '@material-ui/core';
import { useState } from 'react';
import styles from './LeaderboardPage.module.css';
// import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';

const LeaderboardPage = () => {
    // const Information = () => {
    //     const [details, setDetails] = useState('');
    // }

    return(
        <Container fixed className={styles.container}>
            <Typography variant="h4" component="h4" align='center' className={styles.title}>LEADERBOARD </Typography>
            {/* <Typography variant="h4" component="h4" align='center' className={styles.title}>LEADERBOARD </Typography> */}
        </Container>
    )
}

export default LeaderboardPage;