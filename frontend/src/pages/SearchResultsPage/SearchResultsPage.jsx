import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Avatar, Stack } from '@mui/material';
import ArtistAlbums from '../../components/ArtistAlbums/ArtistAlbums';
import ArtistTopTracks from '../../components/ArtistTopTracks/ArtistTopTracks';
import './SearchResultsPage.css'


const SearchResultsPage = ({artistInfo, setArtistInfo, authToken}) => {
    console.log(artistInfo.genre)
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
        </div>
     );
}
 
export default SearchResultsPage;