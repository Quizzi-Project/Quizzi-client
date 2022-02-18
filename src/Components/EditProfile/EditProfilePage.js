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

  //     useEffect(() => {
  //         setName(localStorage.getItem('name'));
  //         setPassword(localStorage.getItem('password'))
  // }, []);

  // const updateData = () => {
  //     axios.put(`http://localhost:3000/api/players/${localStorage.getItem('id')}`, {
  //     name: name,
  //     password: password
  //   })
  // }
  // useEffect(() => {
  //     updateData();
  // })

  const updateData = (ev) => {
    if (ev) {
      ev.preventDefault();
    }
    setRequestMessage('');
    fetch(`http://localhost:3001/api/players/${localStorage.getItem('id')}`, {
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
        // if (response.status === 'ok') {
        console.log(response);
        // navigate('/');
        setRequestMessage('Success User Update!');
        // }
      })
      .catch((err) => {
        setRequestMessage('Failed to update!');
        throw err;
      })
      .finally(() => {
        console.log('finally'); // TODO: remove log
      });

    // try{
    //     const response = await fetch(`http://localhost:3001/api/players/${localStorage.getItem('id')}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             'name': name,
    //             'password': password
    //         }),
    //     })
    //     console.log(response);
    //     navigate('/');
    // }catch(err){
    //     throw err;
    // } finally{
    //     console.log('finally'); // TODO: remove log
    // }
  };

  return (
    <Container maxWidth='xl' className={styles.container}>
      <Typography id={styles.title} variant='h4'>
        Edit Profile
      </Typography>
      <form onSubmit={updateData} style={{ textAlign: 'center' }}>
        <TextField
          color='secondary'
          label='Full Name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin='normal'
          autoComplete='name'
          autoFocus
        />
        <TextField
          color='secondary'
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin='normal'
        />
        {/* <Link href="/" variant="h6" id={styles.link}> */}
        {/* <Button type="submit" id={styles.updateButton} variant="contained" color="secondary" onClick={updateData}> */}
        <Button
          type='submit'
          id={styles.updateButton}
          variant='contained'
          color='secondary'
        >
          Update Account
        </Button>
        {/* </Link> */}
      </form>
      {!!requestMessage && (
        <Typography variant='h6'>{requestMessage}</Typography>
      )}
    </Container>
  );
};

export default EditProfilePage;
