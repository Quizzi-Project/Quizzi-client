import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Link, Typography } from '@material-ui/core';
import styles from './RegisterForm.module.css';


const RegisterForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(false);
    const [errorText, setErrorText] = useState('');

    async function registerUser(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:3001/api/players', {
        // const response = await fetch('https://quizzifinal.herokuapp.com/api/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
        const data = await response.json();
        setErrorText(data.message);
        setErr(true);


        if (data.status === 'ok') {
            navigate('/login')
        }
    }

    return (
        <Container fixed className={styles.container}>
            <Typography variant="h4" align='center' id={styles.title_colors}><b>Welcome to Quizzi!</b><br/><span className={styles.subtitle}>where Learning is FUN</span></Typography>
            <Typography variant="h3" align='center' id={styles.reg_styling}>Register</Typography>

            <form onSubmit={registerUser} style={{ textAlign: 'center' }}>
                <TextField color="secondary" label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required fullWidth margin="normal" autoComplete="name" autoFocus />
                <TextField color="secondary" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth margin="normal" autoComplete="email" error={err} helperText={errorText} />
                <TextField color="secondary" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth margin="normal" />

                <Button type="submit" id={styles.registerButton} variant="contained" color="secondary">
                    Create Account
                </Button>
                <Typography style={{ marginTop: '6vh' }} display="block" variant="subtitle2" align='center' >Already have an account?</Typography>
                <Link id={styles.regLink} href="/login" variant="body2" >Login</Link>
            </form>
        </Container>
    );
}
export default RegisterForm;