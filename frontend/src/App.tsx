import './App.css';
import FormLayout from './Components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotesContainer from './Components/NotesContainer';
import { Button, Col, Container, Row, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRead } from './Hooks/useRead'; 
import useAlertStore from './AlertStore';

function App() {
  const { data } = useRead(); 
  const [hasNotes, setHasNotes] = useState(false);
  const { alert, hideAlert } = useAlertStore(state => ({
    alert: state.alert,
    hideAlert: state.hideAlert
  }));

  useEffect(() => {
    setHasNotes(data.length > 0); 
  }, [data]); 

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 2000);

      return () => clearTimeout(timer); 
    }
  }, [alert, hideAlert]);

  return (
    <>
      <Container fluid>
        {alert && (
          <Alert className='sticky-top' variant={alert.variant} onClose={hideAlert} dismissible>
            {alert.message}
          </Alert>
        )}
        {!hasNotes ? (
          <Row className='justify-content-center my-4'>
            <FormLayout setHasNotes={setHasNotes} />
          </Row>
        ) : (
          <Row className='text-end bg-dark py-2'>
            <Col>
              <Button variant="success" className='mx-2' onClick={() => setHasNotes(false)}>Create Notes</Button>
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
