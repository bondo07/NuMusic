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
        console.log(response)
        setTopTracks(response.data.tracks)
    }

    useEffect(() => {
        getTopTracks()
    }, [])



    return ( 
        <div>
            <h6 className="text-muted">{artistInfo.name} Top Songs</h6>
            <TableContainer component={Paper} sx={{maxHeight: '425px'}}>
                <Table aria-label="simple-table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>{null}</TableCell>
                            <TableCell>Song Name</TableCell>
                            <TableCell align="center">Album</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topTracks.map((track) => (
                            <TableRow key={track.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell>1</TableCell>
                                <TableCell>{track.name}</TableCell>
                                <TableCell align="center">{track.album.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
     );
}
 
export default ArtistTopTracks;