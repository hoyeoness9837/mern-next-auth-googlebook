import { useState } from 'react';
import { useRouter } from 'next/router';
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from submitting
    router.push(`/search/${searchQuery}`); // redirect to the search results page with the search query in the URL
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <h1>Google Books Search</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={searchQuery} onChange={handleChange} />
        <button type='submit'>Search</button>
      </form>
    </>
  );
}
