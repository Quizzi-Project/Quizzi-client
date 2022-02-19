import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Link,
  Typography,
} from '@material-ui/core';
import styles from './EditProfilePage.module.css';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [requestMessage, setRequestMessage] = useState('');
  const [name, setName] = useState(localStorage.getItem('userName'));
  const [password, setPassword] = useState('');

  const updateData = (ev) => {
    if (ev) {
      ev.preventDefault();
    }
    setRequestMessage('');
    fetch(`http://localhost:3001/api/players/${localStorage.getItem('id')}`, {
    // fetch(`https://quizzi-app.herokuapp.com/api/players/${localStorage.getItem('id')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response);
        setRequestMessage('User successfully updated!');
      })
      .catch((err) => {
        setRequestMessage('Failed to update user.');
        throw err;
      })
      .finally(() => {
        console.log('finally');
      });
  };

  return (
    <Container maxWidth='xl' className={styles.container}>
      <Typography id={styles.title} variant='h4'>
        Edit Profile
      </Typography>
      <form onSubmit={updateData} style={{ textAlign: 'center' }}>
        <TextField id={styles.entry} color='secondary' label='Full Name' type='text'
          value={name} onChange={(e) => setName(e.target.value)} fullWidth margin='normal' autoComplete='name' autoFocus />
        <TextField id={styles.entry1} color='secondary' label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}
          fullWidth margin='normal' />
        <Button type='submit' id={styles.updateButton} variant='contained' color='secondary' >
          Update Account
        </Button>
      </form>
      {!!requestMessage && (
        <Typography id={styles.req} variant='h6'>{requestMessage}</Typography>
      )}
    </Container>
  );
};

export default EditProfilePage;
