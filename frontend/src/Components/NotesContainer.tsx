import { Col, Row } from "react-bootstrap";
import { useRead } from "../Hooks/useRead";
import NotesCards from "./NotesCards";
import { useUpdate } from "../Hooks/useUpdate"; 

function NotesContainer() {
  const { data = [], error } = useRead();
  const { updateNote } = useUpdate({ refreshData: () => {} }); 

  const handleUpdate = async (id: string, updatedNote: { title: string; description: string; date: string }) => {
    const noteToUpdate = {
      id,
      ...updatedNote,
    };
    try {
      await updateNote(noteToUpdate); 
      console.log("Updating note:", noteToUpdate);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const sortedData = (data || [])
    .filter(note => note && note.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
    <h1 className="text-center">Notes</h1>
      {error && <p>Error: {error}</p>}
      {sortedData.length === 0 && !error && <p className="text-center mt-4">No notes available.</p>}
      {sortedData.length > 0 && (
        <Row>
          {sortedData.map(note => (
            <Col md={3} className="my-3" key={note.id}>
              <NotesCards
                id={note.id}
                title={note.title || 'Untitled'}
                disc={note.description || 'No description available'}
                date={note.date}
                onUpdate={handleUpdate}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default NotesContainer;
