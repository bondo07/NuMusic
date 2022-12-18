import axios from "axios"
import { useEffect, useState } from "react"
import { ImageList, ImageListItem, ImageListItemBar, ListSubheader, IconButton } from "@mui/material"


const ArtistAlbums = ({artistInfo, authToken}) => {

    const [albums, setAlbums] = useState([])

    async function getAlbums() {
        let response = await axios.get(`https://api.spotify.com/v1/artists/${artistInfo.id}/albums?include_groups=album&market=US&limit=30`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        setAlbums(response.data.items) 
    }
    useEffect(() => {
        getAlbums()
    }, [artistInfo])


    return ( 
        <div>
            <ImageList sx={{ width: 600, height: 450}}>
                <ImageListItem key="SubHeader" cols={2}>
                    <ListSubheader component="div">{artistInfo.name} Albums</ListSubheader>
                </ImageListItem>
                {albums.map((album) => (
                    <ImageListItem key={album.images[0].url}>
                        <img src={`${album.images[0].url}?w=248&fit=crop&auto=format`}
                            srcSet={`${album.images[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={album.name}
                            loading="lazy" />
                        <ImageListItemBar
                            title={album.name}
                            actionIcon={<IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${album.name}`}></IconButton>}>
                            </ImageListItemBar>
                    </ImageListItem>
                )
                )}
            </ImageList>
        </div>
     );
}
 
export default ArtistAlbums;