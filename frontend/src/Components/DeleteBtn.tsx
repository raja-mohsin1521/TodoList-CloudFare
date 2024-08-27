import { Button } from "react-bootstrap";
import { useDelete } from "../Hooks/useDelete";
import useAlertStore from '../AlertStore'; 

interface DeletebtnProps {
  id: string;
}

function Deletebtn({ id }: DeletebtnProps) {
  const { deleteNote } = useDelete({ refreshData: () => {} });
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
