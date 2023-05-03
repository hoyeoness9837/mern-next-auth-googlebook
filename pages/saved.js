import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import CustomLink from '@/components/CustomLink';
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

  const fetchBooks = async (user) => {
    const response = await fetch(`/api/book/${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonData = await response.json();
    setBooks(jsonData);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && userId) {
      fetchBooks(userId);
    }
    return () => {
      isMounted = false;
    };
  }, []);

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
        {books.length > 0 ? renderBooks() : <h1>No Saved Books</h1>}
      </div>
    </section>
  );
}
