import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Link, Typography } from '@material-ui/core';
import styles from './EditProfilePage.module.css';
import axios from 'axios';

const EditProfilePage = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        setName(localStorage.getItem('name'));
        setPassword(localStorage.getItem('password'))
}, []);

const putData = () => {
    axios.put(`http://localhost:3000/api/players/${localStorage.getItem('id')}`, {
    name: name,
    password: password
  })
}

    

    return(
        <Container maxWidth="xl" className={styles.container}>
        <Typography id={styles.title} variant='h4'>Edit Profile</Typography>
        <form onSubmit={() => navigate('./', { replace: true })} style={{ textAlign: 'center' }}>
        
                <TextField color="secondary" label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required fullWidth margin="normal" autoComplete="name" autoFocus />
                <TextField color="secondary" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth margin="normal" />
                <Link to="/" variant="h6" id={styles.link}>
                <Button type="submit" id={styles.updateButton} variant="contained" color="secondary" onClick={putData}>
                   Update Account
                </Button>
                </Link>
        </form>
    </Container>
    )
}

export default EditProfilePage;