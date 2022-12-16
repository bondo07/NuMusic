const FavoritesPage = ({user, token}) => {

    //use user.id in a get request for favorites and pull the artist_id data from that request and use in another get request for spotify artist data and use THAT data in a table
    console.log(user.id)
    return ( 
        <div> Favorites </div>
     );
};
 
export default FavoritesPage;