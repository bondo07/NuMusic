import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Avatar, Stack } from '@mui/material';
import ArtistAlbums from '../../components/ArtistAlbums/ArtistAlbums';
import ArtistTopTracks from '../../components/ArtistTopTracks/ArtistTopTracks';
import './SearchResultsPage.css'
import RelatedArtists from '../../components/RelatedArtists/RelatedArtists';


const SearchResultsPage = ({artistInfo, setArtistInfo, authToken, setArtistResults, artistResults}) => {
    const [relatedArtists, setRelatedArtists] = useState([])

    async function getRelatedArtists() {
        let response = await axios.get(`https://api.spotify.com/v1/artists/${artistInfo.id}/related-artists/`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        setRelatedArtists(response.data.artists.filter(el => el.images.length > 0).map(el => el).map(artist => {
            return {
                id: artist.id,
                name: artist.name,
                artistImage: artist.images[0].url,
                genre: artist.genres[0]
            }
        }
        ))
    }
    useEffect(() => {
        getRelatedArtists();
        }, [artistInfo]);
    

    return ( 
        <div>
            <Stack>
            <h6 data-text={artistInfo.name} className="artist-name">{artistInfo.name}</h6>
            <div data-text={artistInfo.genre} className="artist-genre">{artistInfo.genre}</div>
            </Stack>
            <Stack direction="row" style={{margin: "5rem"}} spacing={10}>
                <Avatar alt={artistInfo.name} src={artistInfo.artistImg} style={{width: "25rem", height: "25rem"}}/>
                <ArtistTopTracks artistInfo={artistInfo} authToken={authToken}/>
                <ArtistAlbums artistInfo={artistInfo}
                authToken={authToken}/>
            </Stack>
            <span className="card-spacing">
                {
                    relatedArtists.map((result, i) => {
                        return (
                            <RelatedArtists artistInfo={artistInfo}
                            setArtistInfo={setArtistInfo}
                            setArtistResults={setArtistResults}
                            artistResults={artistResults}
                            key={i}
                            result={result}/>
                        )
                    })
                }
            </span>
        </div>
     );
}
 
export default SearchResultsPage;