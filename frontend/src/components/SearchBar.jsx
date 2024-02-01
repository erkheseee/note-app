
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function SearchBar() {
  return (
    <div className="search-bar">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <div style={{width: '3%'}}></div>
      <input type="text" placeholder="Search notes..." />
    </div>
  )
}

export default SearchBar