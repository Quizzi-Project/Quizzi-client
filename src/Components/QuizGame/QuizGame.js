import { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import styles from './QuizGame.module.css';
import axios from 'axios'

const QuizGame = () => {
    const [quiz, setQuiz] = useState(['']);
    const [number, setNumber] = useState(0);
    const [pts, setPts] = useState(0);
    const [hideScore, setHideScore] = useState(true);
    const [hideQuiz, setHideQuiz] = useState(false);
    const [details, setDetails] = useState('');
    const [win, setWin] = useState(0);
    const [lose, setLose] = useState(0);

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
    const pickAnswer = (e) => {

        let userAnswer = e.target.outerText;
        const res = userAnswer.split(' ').map(item =>
            item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');


        if (quiz[number].answer === res) setPts(pts + 1);
        setNumber(number + 1);
        if (number === 9) {
            setHideQuiz(true);
            setHideScore(false);

            if (pts > 5) {
                setWin(1);
            }
            else setLose(1);
        }
    }

    const confirmScore = async () => {
        const response = await fetch(`http://localhost:3001/api/players/${localStorage.getItem('id')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'pointsEarned': pts + details.pointsEarned,
                'gamesWins': details.gamesWins + win,
                'gamesLosses': details.gamesLosses + lose

            }),
        })
    }

    useEffect(() => {
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

        axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple')
            .then(res => {
                setQuiz(res.data.results.map(item => (

                    {
                        question: item.question,
                        options: shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer: item.correct_answer
                    }

                )));
            })
            .catch(err => console.error(err))

    }, []);

    return (
        <>
            <section hidden={hideScore}>
                <Container maxWidth="sm" style={{ marginTop: '33vh' }} >
                    <Typography variant="h5" align='center' id={styles.score}>  You scored {pts} out of {10}</Typography>
                    <Typography align='center'> <Button variant="contained" color="primary" href="./" id={styles.homeButton} onClick={confirmScore}>Back To Homepage</Button></Typography>
                </Container>
            </section>
            <section hidden={hideQuiz}>
                < Container maxWidth="sm" className={styles.container}>
                <div className={styles.circleMeasures}><div className={styles.innerCircle}><div className={styles.bar}><Typography id={styles.curr} align='center' variant='subtitle2'>{number + 1}/{quiz.length}</Typography></div></div></div>
                    <Typography variant="h4" align='left' id={styles.title}>Question {number + 1}</Typography>
                    {quiz[number] &&
                        <>
                            <h2 className={styles.quest} dangerouslySetInnerHTML={{ __html: quiz[number].question }}></h2>

                            <section>
                                {quiz[number].options.map((item, index) => (
                                    <Button variant="contained" color="secondary" id={styles.answerButton} key={index} onClick={pickAnswer}><section dangerouslySetInnerHTML={{ __html: item }} ></section></Button>

                                ))}
                            </section>
                        </>
                    }
                </Container>
            </section>

        </>
    )
}
export default QuizGame;