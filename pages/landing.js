import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { hasToken } from '../utils/checkUser';
import { IconButton, InputBase, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import styles from '@/components/layout.module.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from submitting
    router.push(`/search/${searchQuery}`); // redirect to the search results page with the search query in the URL
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <main>
      <section className={styles.section}>
        <h1>Google Books Search</h1>
        <div className={styles.container_col}>
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
              value={searchQuery}
              onChange={handleChange}
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
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
