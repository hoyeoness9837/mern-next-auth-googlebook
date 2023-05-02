import { useRouter } from 'next/router';
import styles from '@/components/layout.module.css';

const ProtectedPage = () => {
  const router = useRouter();
  const { email } = router.query;
  return (
    <section className={styles.section}>
      <h1>{email}'s profile</h1>
    </section>
  );
};

export default ProtectedPage;
