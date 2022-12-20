import { useState } from "react";
import './SearchBar.css'

const SearchBar = ({setSearchWord}) => {

    const [searchCriteria, setSearchCriteria] = useState("")

    const handleChange = (e) => setSearchCriteria(e.target.value)

    function handleSubmit(e) {
        e.preventDefault();
        setSearchWord(searchCriteria);
        setSearchCriteria("")
    }

    return (  
      <div>
        <form className="search-bar" onSubmit={handleSubmit}>
        <input
          className="text-bar"
          type="text"
          placeholder="Search Artists/Songs..."
          value={searchCriteria}
          onChange={handleChange}
          />
          <button className="button-64">Search</button>
        </form>
      </div>
    );
}
 
export default SearchBar;