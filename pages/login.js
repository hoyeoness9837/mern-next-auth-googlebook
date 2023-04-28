import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '../components/layout.module.css';
import AuthForm from '../components/AuthForm';

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(async () => {
    try {
      const session = await getSession();
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <p>Loading...</p>
      </section>
    );
  }

  return <section className={styles.section}>{<AuthForm />}</section>;
}

export default AuthPage;
