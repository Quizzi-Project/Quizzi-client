import React from 'react';
import { Container, Button } from '@material-ui/core';
import styles from './GamePage.module.css';

function GamePage() {

    return(
        <div className={styles.page_background}>
            <Container maxWidth="sm" className={styles.container}>
        
            <div className={styles.title}><h1>Game #1</h1></div>
            <Button type="submit" variant="contained" color="secondary" id={styles.gameButton}>
                End Game
            </Button>
            </Container>
        </div>
    )
}

export default GamePage;