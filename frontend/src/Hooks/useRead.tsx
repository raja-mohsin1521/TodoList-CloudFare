import { useState } from 'react';
import apiClient from '../Api Client/api-client';
import useDataStore from '../DataStore';

export interface Note {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  message: string;
}

export function useRead() {
  const [error, setError] = useState<string>('');
  const { data, setData } = useDataStore();

  const fetchNotes = async () => {
    try {
      const response = await apiClient.get('/read');
      const notes = response.data?.map((item: any) => item.note) || [];

      // Filter out null or undefined notes
      const filteredNotes = notes.filter((note: any) => note !== null && note !== undefined);

      const formattedNotes = filteredNotes.map((note: any) => ({
        id: note.id,
        imageUrl: note.imageUrl,
        message: note.message,
        title: note.title,
        date: note.date, // Added date to the formatted notes
      }));

      console.log(formattedNotes);
      setData(formattedNotes); // Set the filtered and formatted notes to the state
      setError('');
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('An error occurred while fetching data');
    }
  };

  return { data, error, fetchNotes };
}
