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
useEffect(()=>{
  fetchNotes();
},[])
  const fetchNotes = async () => {
    try {
      const response = await apiClient.get('/read');
      const notes = response.data?.filter((item: { value: Note }) => item?.value).map((item: { value: Note }) => item?.value) || [];
      console.log('notes', notes)
      setData(notes);
      setError('');
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('An error occurred while fetching data');
    }
  };
console.log('data<<<<', data)
  return { data, error, fetchNotes };
}
