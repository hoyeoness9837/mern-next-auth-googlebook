import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { IconButton, InputBase, Paper, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import styles from '@/components/layout.module.css';

export default function Home() {
  const { data: session, status } = useSession();
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
        {status === 'authenticated' ? (
          <>
            <h1>Google Books Search</h1>
            <h2>Welcome back {session.user.email}</h2>
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
          </>
        ) : (
          <>
            <div>
              First time visit?
              <Link href='/auth/new-user'>
                <Button>
                  <h1>Sign up</h1>
                </Button>
              </Link>
              now!
            </div>
          </>
        )}
      </section>
    </main>
  );
}
