import { useState } from 'react';
import apiClient from '../Api Client/api-client';
import { FormInterface } from '../Components/Form';


export function useCreate() {
  const [error, setError] = useState<string>('');

  const createNotes = async (payload: FormInterface) => {
    try {
      await apiClient.post('/add', payload);
     
  
    } catch (err) {
      setError('An error occurred while sending data');
    }
  };

  return { error, createNotes };
}
