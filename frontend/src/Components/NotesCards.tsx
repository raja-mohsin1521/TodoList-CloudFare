import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { Button, Form, Card } from "react-bootstrap";
import Deletebtn from "./DeleteBtn";
import useAlertStore from "../AlertStore";

interface NoteProps {
  id: string;
  title: string;
  disc: string;
  date: string;
  onUpdate: (
    id: string,
    updatedNote: { title: string; description: string; date: string }
  ) => void;
}

const NotesCards: React.FC<NoteProps> = React.memo(({ id, title, disc, date, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: title || "",
    description: disc || "",
    date: date || "",
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
      await onUpdate(id, formData);
      
      showAlert('Note updated successfully!', 'success');
    } catch (error) {
      showAlert('Error updating note', 'danger');
    }
    setIsEditing(false);
  }, [formData, id, onUpdate, showAlert]);

  const manageDiscLength = disc.length > 200 ? disc.substring(0, 200) + "..." : disc;

  return (
    <Card className="text-center">
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
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{ height: "150px" }}
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
            <Card.Title>{formData.title || "Untitled"}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {formData.date || "No date"}
            </Card.Subtitle>
            <Card.Text>
              {isExpanded ? formData.description : manageDiscLength}
              {formData.description.length > 200 && (
                <Button
                  variant="link"
                  onClick={handleReadMoreClick}
                  className="mt-2"
                >
                  {isExpanded ? "Read Less" : "Read More"}
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
    </Card>
  );
});

export default NotesCards;
