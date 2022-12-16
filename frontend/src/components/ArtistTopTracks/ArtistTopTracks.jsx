import { useState, useEffect } from "react"
import axios from "axios"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material"



const ArtistTopTracks = ({artistInfo, authToken}) => {

    const [topTracks, setTopTracks] = useState([])

    async function getTopTracks() {
        let response = await axios.get(`https://api.spotify.com/v1/artists/${artistInfo.id}/top-tracks?include_groups=tracks&market=US&limit=30`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        // console.log(response)
        setTopTracks(response.data.tracks)
    }

    useEffect(() => {
        getTopTracks()
    }, [])

    // while(topTracks.length >= 0) {
    //     let i = topTracks.lenth + 1
    // }
    
    // const trackNum = 0
    // for(let i = 0; i < topTracks.length; i++) {
    //     trackNum ++;
    // }
    // console.log(trackNum)

    return ( 
        <div>
            <h6 className="text-muted">{artistInfo.name} Top Songs</h6>
            <TableContainer component={Paper} sx={{maxHeight: '425px', width: '600px'}}>
                <Table aria-label="simple-table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Song Name</TableCell>
                            <TableCell align="center">Album</TableCell>
                            <TableCell>{null}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topTracks.map((track) => (
                            <TableRow key={track.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell>{track.name}</TableCell>
                                <TableCell align="center">{track.album.name}</TableCell>
                                <TableCell><img src={track.album.images[2].url} alt="track album img"/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
     );
}
 
export default ArtistTopTracks;