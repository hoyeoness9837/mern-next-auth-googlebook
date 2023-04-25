import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import CustomLink from '@/components/CustomLink/CustomLink';
import { IconButton, InputBase, Paper, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

import styles from '@/components/layout.module.css';
export default function Home() {
  const { data: session } = useSession();
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
    <section className={styles.section}>
      <h1>Google Books Search</h1>
      <h1>
        {session?.user?.email
          ? `Welcome back ${session?.user?.email}`
          : 'Sign up now!'}
      </h1>
      {session?.user?.email ? (
        <>
          <Paper
            component='form'
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
            }}
            onSubmit={handleSubmit}
          >
            <InputBase
              label='Search any books by title'
              name='search'
              sx={{ ml: 1, flex: 1 }}
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
        </>
      ) : (
        <Link href='/login'>
          <Button onClick={() => signIn()}>Sign In</Button>
        </Link>
      )}
    </section>
  );
}
