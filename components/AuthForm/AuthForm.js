import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Input, InputLabel, Alert } from '@mui/material';
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
        setError(error.message);
        console.error(error);
      }
    } else {
      try {
        await axios.post('/api/auth/signup', {
          email: emailInput,
          password: passwordInput,
        });
        setRegistered(true);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }
  };

  return (
    <>
      {registered ? (
        <>
          <Alert severity='success'>You have successfully registered!</Alert>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => router.reload()}
          >
            Login Now
          </Button>
        </>
      ) : (
        <>
          <h1>{isLoggedin ? 'Login' : 'Sign Up'}</h1>
          <form onSubmit={submitHandler}>
            <InputLabel htmlFor='email'>Your Email</InputLabel>
            <Input type='email' id='email' required inputRef={emailInputRef} />

            <InputLabel htmlFor='password'>Your Password</InputLabel>
            <Input
              type='password'
              id='password'
              required
              inputRef={passwordInputRef}
            />

            <Button type='submit'>
              {isLoggedin ? 'Login' : 'Create Account'}
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={switchAuthModeHandler}
            >
              {isLoggedin ? 'No Account? Create One' : 'Already a user? Login'}
            </Button>
          </form>
          {error && <Alert severity='error'>{error}</Alert>}
        </>
      )}
    </>
  );
};

export default AuthForm;
