import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            <Link href='/'>Google Books Search</Link>
          </Typography>
          {status === 'authenticated' && (
            <>
              <Link href='/saved'>
                <Button color='inherit'>
                  <Favorite />
                  Saved
                </Button>
              </Link>
              <Button color='inherit' onClick={() => signOut()}>
                Sign Out
              </Button>
              <Button color='inherit' onClick={() => signOut()}>
                {session?.user?.email}
              </Button>
            </>
          )}
          {status !== 'authenticated' && (
            <Link href='/login'>
              <Button color='inherit' onClick={() => signIn()}>
                Sign In
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
