import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import CustomLink from '@/components/CustomLink';
import { hasToken } from '@/utils/checkUser';
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CardHeader,
} from '@mui/material';
import { Favorite } from '@mui/icons-material';
import styles from '@/components/layout.module.css';

export default function Saved() {
  const { data: session } = useSession();
  const [books, setBooks] = useState([]);
  const userId = session?.user?._id;

  useEffect(() => {
    let isMounted = true;
    if (isMounted && userId) {
      const fetchBooks = async () => {
        try {
          const { data } = await axios.get(`/api/book/${userId}`);
          setBooks(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchBooks();
    }
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleUnsaveBook = async (bookId) => {
    try {
      await axios.delete(`/api/book/${userId}/${bookId}`);
      const filteredBooks = books.filter((b) => b._id !== bookId);
      setBooks(filteredBooks);
    } catch (error) {
      console.error(error);
    }
  };

  const renderBooks = () => {
    return books.map((book) => (
      <Card
        key={book.bookId}
        sx={{ width: '25%', minWidth: 220 }}
        className={styles.card}
      >
        <CardHeader title={book.title} subheader={book.author} />
        <CardMedia
          sx={{ height: 180, margin: 'auto' }}
          image={book.imageLinks}
          title={book.title}
          src='img'
        />
        <CardActions>
          <Button onClick={() => handleUnsaveBook(book._id)}>
            <Favorite />
            UnSave
          </Button>
          <Link href={book.previewLink} passHref legacyBehavior>
            <CustomLink name='Read' />
          </Link>
        </CardActions>
      </Card>
    ));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container_row}>
        {books?.length ? renderBooks() : <h1>No Saved Books</h1>}
      </div>
    </section>
  );
}

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
