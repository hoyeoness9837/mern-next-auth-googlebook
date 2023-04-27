import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Input, InputLabel, Alert } from '@mui/material';
import styles from './layout.module.css';
import axios from 'axios';

const AuthForm = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const router = useRouter();

  const [isLoggedin, setIsLoggedin] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const switchAuthModeHandler = () => {
    setIsLoggedin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    if (isLoggedin) {
      try {
        await signIn('credentials', {
          redirect: '/',
          email: emailInput,
          password: passwordInput,
        });
      } catch (error) {
        setError('Invalid Email or password!');
      }
    } else {
      try {
        await axios.post('/api/auth/signup', {
          email: emailInput,
          password: passwordInput,
        });
        setRegistered(true);
      } catch (error) {
        setError(error.response.data.message);
      }
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
            onClick={() => router.reload()}
          >
            Login Now
          </Button>
        </div>
      ) : (
        <div className={styles.container_col}>
          <h1>{isLoggedin ? 'Login' : 'Sign Up'}</h1>
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
              <Button type='submit'>
                {isLoggedin ? 'Login' : 'Create Account'}
              </Button>
              <br />
              <Button
                variant='outlined'
                color='primary'
                onClick={switchAuthModeHandler}
              >
                {isLoggedin
                  ? 'No Account? Create One'
                  : 'Already a user? Login'}
              </Button>
            </form>
          </div>
          {error && <Alert severity='error'>{error}</Alert>}
        </div>
      )}
    </>
  );
};

export default AuthForm;
