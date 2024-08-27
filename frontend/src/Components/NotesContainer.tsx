import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useRead } from "../Hooks/useRead";
import NotesCards from "./NotesCards";
import { useUpdate } from "../Hooks/useUpdate";
import SortSelector from "./SortSelector";
import useAlertStore from '../AlertStore'; 

export interface Note {
  id: string;
  title: string;
  description: string;
  date: string;
}

function NotesContainer() {
  const { data = [], error, refreshData } = useRead();
  const { updateNote } = useUpdate({ refreshData });
  const [sortedData, setSortedData] = useState<Note[]>([]);
  const showAlert = useAlertStore(state => state.showAlert);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleUpdate = async (id: string, updatedNote: Omit<Note, "id">) => {
    const noteToUpdate = {
      id,
      ...updatedNote,
    };
    try {
      await updateNote(noteToUpdate);
      showAlert('Note updated successfully!', 'success');
    } catch (error) {
      console.error("Error updating note:", error);
      showAlert('Error updating note', 'danger');
    }
  };

  const handleSort = (sortedNotes: Note[]) => {
    setSortedData(sortedNotes);
  };

  return (
    <div>
      <h1 className="text-center mt-5">Notes</h1>
      <Row className="text-end">
        <SortSelector data={data} onSort={handleSort} />
      </Row>
      {error && <p className="text-center mt-4">Error: {error}</p>}
      {sortedData.length === 0 && !error && (
        <p className="text-center mt-4">No notes available.</p>
      )}
      {sortedData.length > 0 && (
        <Row>
          {sortedData.map((note) => (
            <Col md={3} className="my-3" key={note.id}>
              <NotesCards
                id={note.id}
                title={note.title || "Untitled"}
                disc={note.description || "No description available"}
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
