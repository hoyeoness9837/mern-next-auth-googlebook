import React, { useRef } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button, IconButton, InputBase, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useRouter } from 'next/router';
import styles from '@/components/layout.module.css';

export default function Landing() {
  const { data: session, status } = useSession();
  const searchInputRef = useRef();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the form from submitting
    const searchInput = searchInputRef.current.value;
    router.push(`/search/${searchInput}`); // redirect to the search results page with the search query in the URL
  };

  return (
    <section className={styles.section}>
      <div className={styles.container_col}>
        {status === 'authenticated' ? (
          <>
            <h1>Google Books Search</h1>
            <Paper
              component='form'
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: '2px 4px',
              }}
              onSubmit={handleSubmit}
            >
              <InputBase
                label='Search any books by title'
                name='search'
                sx={{ ml: 4, flex: 1 }}
                inputRef={searchInputRef}
                required
              />
              <IconButton
                variant='outlined'
                color='primary'
                type='submit'
                sx={{ p: '10px' }}
                aria-label='search'
              >
                <Search />
              </IconButton>
            </Paper>
          </>
        ) : (
          <>
            <h2>Welcome, Feel free to try!</h2>
            First time visit?
            <Link href='/auth/signup'>Sign up now!</Link>
          </>
        )}
      </div>
    </section>
  );
}
