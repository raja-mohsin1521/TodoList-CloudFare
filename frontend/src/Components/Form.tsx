import { useState, ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCreate } from '../Hooks/useCreate';
import { useRead } from '../Hooks/useRead'; 

export interface FormInterface {
  title: string;
  description: string;
  date: string;
}

interface FormLayoutProps {
  setHasNotes: (hasNotes: boolean) => void;
}

function FormLayout({ setHasNotes }: FormLayoutProps) {
  const { refreshData } = useRead(); 
  const { createNotes } = useCreate({ refreshData }); 

  const currentDate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState<FormInterface>({
    title: "",
    description: "",
    date: currentDate,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    await createNotes(formData);
    setFormData({
      title: "",
      description: "",
      date: currentDate,
    });
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
          value={formData.title || ""}
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
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Leave a comment here"
          style={{ height: "150px" }}
          required
        />
      </Form.Group>

      <Button variant="primary" className="mt-3" type="submit">
        Create
      </Button>
      <hr className='my-4 ' />
    </Form>
  );
}

export default FormLayout;
