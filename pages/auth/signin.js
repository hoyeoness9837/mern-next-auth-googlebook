import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Input, InputLabel, Alert } from '@mui/material';
import styles from '../../components/layout.module.css';

export default function Signin() {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    try {
      const respond = await signIn('credentials', {
        redirect: false,
        email: emailInput,
        password: passwordInput,
      });
      respond.ok ? router.push('/landing') : setError(respond.error);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className={styles.container_col}>
      <h1>Already a user? Login</h1>
      <div>
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
          <hr />
          <Button type='submit'>Login</Button>
          <br />
          <Button onClick={() => router.push('/auth/new-user')}>
            No Account? Create One
          </Button>
        </form>
      </div>
      {error && <Alert severity='error'>{error}</Alert>}
    </div>
  );
}
