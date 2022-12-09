import { useState } from "react";
import './SearchBar.css'

const SearchBar = ({setSearchWord}) => {

    const [searchCriteria, setSearchCriteria] = useState("")

    const handleChange = (e) => setSearchCriteria(e.target.value)

    function handleSubmit(e) {
        e.preventDefault();
        setSearchWord(searchCriteria);
    }

    return (  
        <form className="search-bar" onSubmit={handleSubmit}>
        <input
          className="text-bar"
          type="text"
          placeholder="Search Artists..."
          value={searchCriteria}
          onChange={handleChange}
        />
        <button className="search-button">Search</button>
      </form>
  

    );
}
 
export default SearchBar;