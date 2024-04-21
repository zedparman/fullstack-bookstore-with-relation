'use client'

import React, { useState, useEffect } from 'react';
// import './index.module.css'
import styles from './index.module.css'

const Posts = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorNationality, setNewAuthorNationality] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing authors (client-side)
  useEffect(() => {
    const fetchData = async () => { // Can use async/await here for better readability (optional)
      setIsLoading(true); // Set loading state
      setError(null); // Clear any previous errors

      try {
        const response = await fetch('http://localhost:3000/api/authors');
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
        setError('Failed to fetch authors'); // Display error message
      } finally {
        setIsLoading(false); // Clear loading state
      }
    };

    if (typeof window !== 'undefined') { // Check for client-side
      fetchData();
    }
  }, []);  // Empty dependency array to fetch data only once

  // Handle form submission for adding a new author (client-side)
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newAuthorName || !newAuthorNationality) {
      return; // Prevent empty submissions
    }

    setIsLoading(true); // Set loading state
    setError(null); // Clear any previous errors

    fetch('http://localhost:3000/api/authors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newAuthorName, nationality: newAuthorNationality }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error adding author');
        }
        return response.json();
      })
      .then((newAuthor) => {
        setAuthors([...authors, newAuthor]); // Update state with new author
        setNewAuthorName(''); // Clear name input field
        setNewAuthorNationality(''); // Clear nationality input field
      })
      .catch((error) => {
        console.error('Error adding author:', error);
        setError('Failed to add author'); // Display error message
      })
      .finally(() => setIsLoading(false)); // Clear loading state
  };

  return (
    <div className={styles.container}>
      <h2>Authors</h2>
      {isLoading ? (
        <p>Loading authors...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul className={styles.content}>
          {authors.map((author) => (
            <li className={styles.list} key={author._id}>
              {author.name}<br />
              {author.nationality}
            </li>
          ))}
        </ul>
      )}

      <h2>Add New Author</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="newAuthorName">Name:</label>
        <input
          className={styles.eachinput}
          type="text"
          id="newAuthorName"
          value={newAuthorName}
          onChange={(e) => setNewAuthorName(e.target.value)}
        />
        <label htmlFor="newAuthorNationality">Nationality:</label>
        <input
          className={styles.eachinput}
          type="text"
          id="newAuthorNationality"
          value={newAuthorNationality}
          onChange={(e) => setNewAuthorNationality(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Author'}
        </button>
      </form>
    </div>
  );
};

export default Posts;