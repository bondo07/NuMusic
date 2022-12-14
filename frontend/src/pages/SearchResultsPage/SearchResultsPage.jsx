import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Avatar, Stack } from '@mui/material';
import ArtistAlbums from '../../components/ArtistAlbums/ArtistAlbums';
import ArtistTopTracks from '../../components/ArtistTopTracks/ArtistTopTracks';


const SearchResultsPage = ({artistInfo, setArtistInfo, authToken}) => {

    return ( 
        <div>
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