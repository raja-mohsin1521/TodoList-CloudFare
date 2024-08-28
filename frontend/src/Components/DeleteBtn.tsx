import { Button } from "react-bootstrap";
import { useDelete } from "../Hooks/useDelete";
import { useRead } from "../Hooks/useRead"; 
import useAlertStore from '../AlertStore'; 

interface DeletebtnProps {
  id: string;
}

function Deletebtn({ id }: DeletebtnProps) {
  const { fetchNotes } = useRead(); 
  const { deleteNote } = useDelete({fetchNotes }); 
  const showAlert = useAlertStore(state => state.showAlert);

  const handleDelete = async () => {
    try {
      await deleteNote(id);
      showAlert('Note deleted successfully!', 'success');
    } catch (error) {
      console.error("Error deleting note:", error);
      showAlert('Error deleting note', 'danger');
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default Deletebtn;
