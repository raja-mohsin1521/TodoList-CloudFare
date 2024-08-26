import './App.css';
import FormLayout from './Components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotesContainer from './Components/NotesContainer';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRead } from './Hooks/useRead'; 

function App() {
  const { data } = useRead(); 
  const [hasNotes, setHasNotes] = useState(false);

  useEffect(() => {
    setHasNotes(data.length > 0); 
  }, [data]); 

  return (
    <>
      <Container fluid>
        {!hasNotes ? (
          <Row className='justify-content-center my-4'>
            <FormLayout setHasNotes={setHasNotes} />
          </Row>
        ) : (
          <Row className='text-end bg-dark py-2'>
            <Col>
              <Button variant="primary" className='mx-2' onClick={() => setHasNotes(false)}>Create Notes</Button>
            </Col>
          </Row>
        )}
        
        <Row>
          <NotesContainer />
        </Row>
      </Container>
    </>
  );
}

export default App;
