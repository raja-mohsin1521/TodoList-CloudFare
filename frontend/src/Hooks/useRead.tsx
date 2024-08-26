import { useState, useEffect } from 'react';
import apiClient from '../Api Client/api-client';

interface Note {
  id: string;
  title: string;
  description: string;
  date: string;
}

export function useRead() {
  const [data, setData] = useState<Note[]>([]);
  const [error, setError] = useState<string>('');

  const fetchNotes = async () => {
    console.log('fetched')
    try {
      const response = await apiClient.get('/read');
      const notes = response.data.map((item: { key: string; value: Note }) => item.value);
      setData(notes);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching data');
    }
  };

  const refreshData = async () => {
    await fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { data, error, refreshData };
}
