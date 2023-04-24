import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AuthForm from '../components/AuthForm';
import styles from '../components/layout.module.css';

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
  }, [router]);

  return <section>{isLoading ? <p>Signing In...</p> : <AuthForm />}</section>;
}
