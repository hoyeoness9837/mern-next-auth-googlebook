import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '../components/layout.module.css';
import AuthForm from '../components/AuthForm';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <section className={styles.section}>
      {isLoading ? <h1>Loading...</h1> : <AuthForm />}
    </section>
  );
}
