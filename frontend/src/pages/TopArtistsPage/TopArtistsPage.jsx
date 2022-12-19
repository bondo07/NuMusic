import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


const TopArtistsPage = ({user, token}) => {
    //get user favorites artists from backend => 
    const [top10artists, setTop10Artists] = useState([])
    async function getTopArtists() {
        const response = await axios.get(`http://127.0.0.1:8000/api/artists/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
    }
    useEffect(() => {
        getTopArtists();
    }) 
    return ( 
        <div> Top 10 Weekly Artists</div>
     );
}
 
export default TopArtistsPage;