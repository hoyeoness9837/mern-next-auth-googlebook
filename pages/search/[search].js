import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import CustomLink from '@/components/CustomLink/CustomLink';
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CardHeader,
} from '@mui/material';
import { Favorite } from '@mui/icons-material';
import styles from '@/components/layout.module.css';

export async function getServerSideProps(context) {
  const { search } = context.query;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&printType=books&maxResults=30&key=${process.env.GOOGLE_API_KEY}`
    );
    return {
      props: {
        books: response.data.items,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default function SearchResults({ books }) {
  const trimString = (string, length) => {
    return string.length > length
      ? string.substring(0, length) + '...'
      : string;
  };

  const handleSaveBook = async (book) => {
    const { title, authors, description, imageLinks, previewLink } =
      book.volumeInfo;
    try {
      await axios.post('/api/book', {
        title: trimString(title, 30),
        author: trimString(`Written by ${authors?.join(', ')}`, 30),
        description: description,
        imageLinks: imageLinks?.smallThumbnail,
        previewLink: previewLink,
        bookId: book.id,
        isSaved: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderBooks = () => {
    return books.map((book) => (
      <Card
        key={book.id}
        sx={{ width: '25%', minWidth: 220 }}
        className={styles.card}
      >
        <CardHeader
          title={trimString(book.volumeInfo.title, 30)}
          subheader={trimString(
            `Written by ${book.volumeInfo.authors?.join(', ')}`,
            30
          )}
        />
        <CardMedia
          key={book.etag}
          sx={{ height: 180, margin: 'auto' }}
          image={book.volumeInfo.imageLinks?.smallThumbnail}
          title={book.volumeInfo.title}
          src='img'
        />
        <CardActions>
          <Button onClick={() => handleSaveBook(book)}>
            <Favorite />
            Save
          </Button>
          <Link href={book.volumeInfo.previewLink} passHref legacyBehavior>
            <CustomLink name='Preview' />
          </Link>
        </CardActions>
      </Card>
    ));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>{renderBooks()}</div>
    </section>
  );
}
