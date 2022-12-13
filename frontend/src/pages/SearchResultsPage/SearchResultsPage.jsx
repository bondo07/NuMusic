import Avatar from '@mui/material/Avatar';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ConstructionOutlined } from '@mui/icons-material';



const SearchResultsPage = ({artistInfo, setArtistInfo, authToken}) => {

    const [albums, setAlbums] = useState([])

    async function getAlbums() {
        let response = await axios.get(`https://api.spotify.com/v1/artists/${artistInfo.id}/albums?include_groups=album&market=US&limit=30`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        console.log(response)
        setAlbums(response.data.items.map((album) => {
            return {
                id: album.id,
                name: album.name,
                albumImage: album.images[0].url,
                artists: album.artists[0].name
            }
        }
        ))
    }
    console.log(albums)
    useEffect(() => {
        getAlbums()
    }, [])
    // console.log(artistInfo)
    return ( 
        <div>
            <Container fluid="md">
                <Avatar alt={artistInfo.name} src={artistInfo.artistImg} style={{width: "25rem", height: "25rem"}}/>
            </Container>

        </div>
     );
}
 
export default SearchResultsPage;