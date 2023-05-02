import { hasToken } from '../../utils/checkUser';
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

export async function getServerSideProps(context) {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
