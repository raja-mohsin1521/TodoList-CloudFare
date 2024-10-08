import { useState, ChangeEvent, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCreate } from '../Hooks/useCreate';
import { useRead } from '../Hooks/useRead'; 
import useAlertStore from '../AlertStore';

export interface FormInterface {
  title: string;
  description: string;
  date: string;
}

interface FormLayoutProps {
  setHasNotes: (hasNotes: boolean) => void;
}

function FormLayout({ setHasNotes }: FormLayoutProps) {
  const { fetchNotes } = useRead(); 
  const { createNotes } = useCreate(); 
  const showAlert = useAlertStore(state => state.showAlert);

  const currentDate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState<FormInterface>({
    title: "",
    description: "",
    date: currentDate,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createNotes(formData, imageFile);
      await fetchNotes();
      showAlert('Note created successfully!', 'success');
    } catch (error) {
      showAlert('Error creating note', 'danger');
    }
    setFormData({
      title: "",
      description: "",
      date: currentDate,
    });
    setImageFile(null);
    setHasNotes(true);
  };

  return (
    <Form className="text-center w-75" onSubmit={onSubmit}>
      <h1 className='mb-5'>Create Notes</h1>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label className="text-center">Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title..."
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label className="text-center">Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Leave a comment here"
          style={{ height: "150px" }}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label className="text-center">Image</Form.Label>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          required
        />
      </Form.Group>

      <Button variant="primary" className="mt-3" type="submit">
        Create
      </Button>
      <Button variant="secondary" className="mt-3 mx-2" onClick={() => setHasNotes(true)}>
        Cancel
      </Button>
      <hr className='my-4 ' />
    </Form>
  );
}

export default FormLayout;
