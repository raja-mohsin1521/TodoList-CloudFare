import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import Deletebtn from './DeleteBtn';
import useAlertStore from '../AlertStore';
import { Note } from '../Hooks/useRead';
import styled from 'styled-components';
import noImg from '../../public/No_Image_Available.jpg';

interface NoteProps extends Omit<Note, 'id'> {
  imageUrl: string;
  id: string;
  onUpdate: (id: string, updatedNote: Omit<Note, 'id'>) => void;
}

const StyledCard = styled.div<{ imageurl: string }>`
  position: relative;
  background-size: cover;
  background-position: center;
  color: black;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  padding: 1.25rem;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.imageurl ? `https://pub-af18b9cede00452d9b653b4c02e4a224.r2.dev/${props.imageurl}` : noImg});
    background-size: cover;
    background-position: center;
    opacity: 0.3;
    z-index: -1;
    border-radius: 0.25rem;
  }
`;

const NotesCards: React.FC<NoteProps> = React.memo(({ id, title, message, date, imageUrl, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: title || '',
    message: message || '',
    date: date || '',
    imageUrl: imageUrl || '',
  });
  const showAlert = useAlertStore(state => state.showAlert);

  const handleReadMoreClick = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleEditClick = useCallback(() => {
    setIsEditing(prev => !prev);
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onUpdate(id, {
        title: formData.title,
        message: formData.message,
        date: formData.date,
        imageUrl: formData.imageUrl,
      });
      showAlert('Note updated successfully!', 'success');
    } catch (error) {
      showAlert('Error updating note', 'danger');
    }
    setIsEditing(false);
  }, [formData, id, onUpdate, showAlert]);

  const manageDescLength = message.length > 200 ? message.substring(0, 200) + '...' : message;

  return (
    <StyledCard imageurl={imageUrl}>
      <Card.Body>
        {isEditing ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                style={{ height: '150px' }}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={handleEditClick}
              className="mt-2 mx-2"
            >
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <Card.Title className="mb-2">{formData.title || 'Untitled'}</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
            {formData.date ? formData.date.split('T')[0] : 'No date'}
            </Card.Subtitle>
            <Card.Text className="mb-3">
              {isExpanded ? formData.message : manageDescLength}
              {formData.message.length > 200 && (
                <Button
                  variant="link"
                  onClick={handleReadMoreClick}
                  className="mt-2"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </Button>
              )}
            </Card.Text>
            <Button
              variant="warning"
              className="mx-2"
              onClick={handleEditClick}
            >
              Update
            </Button>
            <Deletebtn id={id} />
          </>
        )}
      </Card.Body>
    </StyledCard>
  );
});

export default NotesCards;
