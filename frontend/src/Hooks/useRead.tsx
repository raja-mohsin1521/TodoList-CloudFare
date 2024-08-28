import { useState, useEffect, useCallback } from 'react';
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

  const fetchNotes = useCallback(async () => {
    try {
      console.log('Fetching notes...');
      const response = await apiClient.get('/read');
      
      const notes = response.data.map((item: { key: string; value: Note }) => item.value);
      setData(notes);
      console.log('Fetched data:', data);
      setError('');
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('An error occurred while fetching data');
    }
  }, []); 

  useEffect(() => {
    console.log('useEffect called');
    fetchNotes();
  }, [fetchNotes]); 

  return { data, error, fetchNotes };
}
