import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import CustomLink from '@/components/CustomLink/CustomLink';
import { hasToken } from '../../utils/checkUser';
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CardHeader,
} from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import styles from '@/components/layout.module.css';

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

export default function Saved() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get('/api/book');
        if (isMounted) {
          setBooks(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUnsaveBook = async (id) => {
    try {
      await axios.delete(`/api/book/${id}`);
      const filteredBooks = books.filter((b) => b._id !== id);
      setBooks(filteredBooks);
    } catch (error) {
      console.error(error);
    }
  };

  const renderBooks = () => {
    return books.map((book) => (
      <Card key={book.bookId} sx={{ width: '25%', minWidth: 220 }}>
        <CardHeader title={book.title} subheader={book.author} />
        <CardMedia
          sx={{ height: 180, margin: 'auto' }}
          image={book.imageLinks}
          title={book.title}
        />
        <CardActions>
          <Button onClick={() => handleUnsaveBook(book._id)}>
            <FavoriteBorder />
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
      <div className={styles.container}>
        {books.length ? renderBooks() : <h1>No Saved Books</h1>}
      </div>
    </section>
  );
}
