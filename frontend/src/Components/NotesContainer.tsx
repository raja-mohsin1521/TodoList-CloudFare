import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useRead } from "../Hooks/useRead";
import NotesCards from "./NotesCards";
import { useUpdate } from "../Hooks/useUpdate";
import SortSelector from "./SortSelector";
import useAlertStore from '../AlertStore'; 
import SearchBar from "./SearchBar";

export interface Note {
  id: string;
  title: string;
  description: string;
  date: string;
}

function NotesContainer() {
  const { data = [], error, fetchNotes } = useRead(); 
  const { updateNote } = useUpdate({ fetchNotes });
  const [sortedData, setSortedData] = useState<Note[]>([]);
  const [filteredData, setFilteredData] = useState<Note[]>([]);
  const showAlert = useAlertStore(state => state.showAlert);

  useEffect(() => {
    setFilteredData(data);
    setSortedData(data);
  }, [data]);

  const handleUpdate = async (id: string, updatedNote: Omit<Note, "id">) => {
    const noteToUpdate = { id, ...updatedNote };
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

  const handleUpdateFilteredNotes = (filteredNotes: Note[]) => {
    console.log("Filtered Notes:", filteredNotes); 
    setFilteredData(filteredNotes);
    setSortedData(filteredNotes);
  };

  return (
    <div>
      <h1 className="text-center mt-5">Notes</h1>
      
      <Row className="text-end">
        <Col className="mt-2" xs={7}>
          <SearchBar data={data} onUpdateFilteredNotes={handleUpdateFilteredNotes} />
        </Col>
        <Col xs={4}>
          <SortSelector data={filteredData} onSort={handleSort} />
        </Col>
      </Row>

      {error && <p className="text-center mt-4">Error: {error}</p>}

      {sortedData.length === 0 && !error && (
        <p className="text-center mt-4">No notes available.</p>
      )}

      {sortedData.length > 0 && (
        <Row>
          {sortedData.map((note) => {
            if (!note || !note.id) {
              return null; 
            }
            return (
              <Col md={3} className="my-3" key={note.id}>
                <NotesCards
                  id={note.id}
                  title={note.title || "Untitled"}
                  disc={note.description || "No description available"}
                  date={note.date}
                  onUpdate={handleUpdate}
                />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default NotesContainer;
