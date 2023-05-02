import Link from '../src/Link';
import { AppBar, Toolbar, Button, Avatar } from '@mui/material';
import { useSession } from 'next-auth/react';
import styles from './layout.module.css';

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Link href='/'>
            <Button color='white'>Google Book Search</Button>
          </Link>
          <div className={styles.navlinks}>
            {status === 'authenticated' && (
              <>
                <Link href={`/${session.user.email}`}>
                  <Avatar sx={{ marginRight: '2px' }}>
                    {session.user.email[0]}
                  </Avatar>
                  
                </Link>
                <Link href={`/${session.user.email}/saved`}>
                  <Button color='white'>My Books</Button>
                </Link>
                <Link href='/api/auth/signout'>
                  <Button color='white'>Sign Out</Button>
                </Link>
              </>
            )}
            {status !== 'authenticated' && (
              <>
                <Link href='/auth/signin'>
                  <Button color='white'>Sign In</Button>
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
