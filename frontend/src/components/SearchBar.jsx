
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import PropTypes from 'prop-types';

function SearchBar({setSearch}) {
  return (
    <div className="search-bar">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <div style={{width: '3%'}}></div>
      <input type="text" placeholder="Search notes..." onChange={(e) => setSearch(e.target.value)}/>
    </div>
  )
}

SearchBar.propTypes = {
  setSearch: PropTypes.func,
}


export default SearchBar