
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container , Button , Card , InputGroup , Row, FormControl} from 'react-bootstrap'
import {useState , useEffect} from 'react'

const CLIENT_ID = "9ff5f8ee6cd343178409e3808eeff759"
const CLIENT_SECRET = "a5592a57425840d6a96340b85bdf8c56"

function App() {
  const [searchInput, setSearchInput] = useState("")
  const [accessToken, setAccessToken] = useState("")
   const [albums, setAlbums] = useState([])


  useEffect(() => {
    var auth = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token' , auth)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  //Search
  async function search() {
    console.log("Search: " + searchInput) // Mohsen EbrahimZadeh

    var artistParams = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
      },
    }
    var artistID = await fetch ('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist' , artistParams)
    .then(response => response.json())
    .then( data => {return data.artists.items[0].id})

    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' , artistParams)
    .then(response => response.json())
    .then (data => {
      console.log(data)
      setAlbums(data.items)
    })
  }

  return (
    <div className="App">
        <Container>
          <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder='Search Artist'
            type='input'
            onKeyPress={event => {
              if (event.key == "Enter") {
                search()
              }
            }} 
            onChange={event => setSearchInput(event.target.value)}
            >
            </FormControl> 

            <Button onClick={search}>
              Search
            </Button>
          </InputGroup>
        </Container>
        <Container>
          <Row className='mx-2 row row-cols-4'>
            {albums.map((album , i) => {
              return (
             <Card>
              <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
            </Card>
            )})
            }
            
            </Row>
        </Container>
    </div>
  );
}

export default App;
