import { useState, useEffect } from "react";
import apiClient from "../Api Client/api-client";

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
    try {
      console.log('Fetching notes...'); 
      const response = await apiClient.get('/read');
      console.log('Fetched data:', response.data); 
      const notes = response.data.map((item: { key: string; value: Note }) => item.value);
      setData(notes);
      setError('');
    } catch (err) {
      console.error('Error fetching notes:', err); 
      setError('An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { data, error, fetchNotes };
}
