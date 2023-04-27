import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import CustomLink from '@/components/CustomLink';
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CardHeader,
} from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import styles from '@/components/layout.module.css';

export default function SearchResults({ searchQuery }) {
  const [bookState, setBookState] = useState([]);
  const { data: session } = useSession();

  const userId = session?.user?._id;
  const trimString = (string, length) => {
    return string.length > length
      ? string.substring(0, length) + '...'
      : string;
  };

  const handleSearchBook = async () => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/books/${searchQuery}`
      );
      setBookState(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveBook = async (book) => {
    const { title, authors, description, imageLinks, previewLink } =
      book.volumeInfo;

    try {
      await axios.post(`/api/book/save?&userId=${userId}`, {
        title: trimString(title, 30),
        author: trimString(`Written by ${authors?.join(', ')}`, 30),
        description: description,
        imageLinks: imageLinks?.smallThumbnail,
        previewLink: previewLink,
        bookId: book.id,
        ownerId: userId,
        isSaved: true,
      });

      const booksNotSaved = bookState.filter(
        (allBook) => allBook.id !== book.id
      );
      setBookState(booksNotSaved);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearchBook();
    }
  }, []);

  const renderBooks = () => {
    return bookState.map((book) => (
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
            <FavoriteBorder />
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
      <div className={styles.container_row}>{renderBooks()}</div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const { search } = context.query;
  const key = process.env.GOOGLE_API_KEY;
  const searchQuery = `v1/volumes?q=${search}&printType=books&maxResults=32&key=${key}`;
  return {
    props: {
      searchQuery,
    },
  };
}
