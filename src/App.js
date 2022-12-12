
import './App.css';
import {Container , Button , Card , InputGroup , Row, FormControl} from 'react-bootstrap'

function App() {
  return (
    <div className="App">
        <Container>
          <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder='Search Artist'
            type='input'
            onKeyPress={event => {
              if (event.key == "Enter") {
                console.log("Pressed Enter")
              }
            }} ></FormControl>            

          </InputGroup>
        </Container>
    </div>
  );
}

export default App;
