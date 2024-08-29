import { useState, useEffect } from 'react';
import apiClient from '../Api Client/api-client';
import useDataStore from '../DataStore';

export interface Note {
  id: string;
  title: string;
  description: string;
  date: string;
}

export function useRead() {
  // const [data, setData] = useState<Note[]>([]);
  const [error, setError] = useState<string>('');
  const { data, setData } = useDataStore();

// useEffect(()=>{
//   fetchNotes();
// },[])
  const fetchNotes = async () => {
    try {
      const response = await apiClient.get('/read');
      const notes = response.data?.filter((item: { value: Note }) => item?.value).map((item: { value: Note }) => item?.value) || [];
    
      setData(notes);
      setError('');
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('An error occurred while fetching data');
    }
  };

  return { data, error, fetchNotes };
}
