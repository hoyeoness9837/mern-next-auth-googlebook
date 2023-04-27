import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import styles from './layout.module.css';

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            <Link href='/'>Google Books Search</Link>
          </Typography>
          <div className={styles.navlinks}>
            {status === 'authenticated' && (
              <>
                <Link href='/mypage/saved'>
                  <Button
                    color='inherit'
                    size='medium'
                    sx={{
                      height: '40px',
                    }}
                  >
                    <Favorite />
                    Saved
                  </Button>
                </Link>
                <Link href={`/mypage/${session.user.email}/`}>
                  <Avatar>{session.user.email[0]}</Avatar>
                </Link>
                <Button color='inherit' size='medium' onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            )}
            {status !== 'authenticated' && (
              <>
                <Link href='/login'>
                  <Button
                    color='inherit'
                    size='medium'
                    sx={{
                      lineHeight: '8px',
                      textAlign: 'center',
                    }}
                    onClick={() => signIn()}
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
