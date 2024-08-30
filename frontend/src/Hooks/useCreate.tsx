import { useState } from 'react';
import apiClient from '../Api Client/api-client';
import { FormInterface } from '../Components/Form';

export function useCreate() {
  const [error, setError] = useState<string>('');

  const createNotes = async (payload: FormInterface, imageFile: File | null) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile as Blob); // Append the image file
      formData.append('message', payload.description); // Use description as message
      formData.append('title', payload.title); 
      await apiClient.post('/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (err) {
      setError('An error occurred while sending data');
    }
  };

  return { error, createNotes };
}
