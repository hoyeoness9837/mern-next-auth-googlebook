import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import styles from '@/components/layout.module.css';

export default function Landing() {
  return (
    <main>
      <section className={styles.section}>
        <div>
          First time visit?
          <Link href='/auth/new-user'>
            <Button>
              <h1>Sign up</h1>
            </Button>
          </Link>
          now!
        </div>
      </section>
    </main>
  );
}
