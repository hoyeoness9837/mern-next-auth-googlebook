import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, InputLabel, Alert } from '@mui/material';
import styles from '../../components/layout.module.css';
import axios from 'axios';

export default function NewUser() {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const router = useRouter();
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    try {
      await axios.post('/api/auth/signup', {
        email: emailInput,
        password: passwordInput,
      });
      setRegistered(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {registered ? (
        <div className={styles.container_col}>
          <Alert severity='success'>You have successfully registered!</Alert>
          <br />
          <Button
            variant='outlined'
            color='primary'
            onClick={() => router.push('/auth/signin')}
          >
            Login Now
          </Button>
        </div>
      ) : (
        <div className={styles.container_col}>
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={submitHandler}>
              <InputLabel htmlFor='email'>Your Email</InputLabel>
              <Input
                type='email'
                id='email'
                required
                inputRef={emailInputRef}
              />

              <InputLabel htmlFor='password'>Your Password</InputLabel>
              <Input
                type='password'
                id='password'
                required
                inputRef={passwordInputRef}
              />
              <hr />
              <Button type='submit'>Create Account</Button>
            </form>
          </div>
          {error && <Alert severity='error'>{error}</Alert>}
        </div>
      )}
    </>
  );
}
