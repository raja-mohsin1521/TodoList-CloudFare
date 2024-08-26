import { Button } from "react-bootstrap";
import { useDelete } from "../Hooks/useDelete"; 

interface DeletebtnProps {
  id: string;  
}

function Deletebtn({ id }: DeletebtnProps) {
  const { deleteNote, data, error } = useDelete(); 

  const handleDelete = () => {
    deleteNote(id); 
  };
console.log(id)
  return (
    <>
      <Button 
        variant="danger" 
        className='mx-2' 
        onClick={handleDelete} 
      >
        Delete
      </Button>
      {error && <p>Error: {error}</p>} 
      {data && <p>Note deleted successfully</p>}
    </>
  );
}

export default Deletebtn;
