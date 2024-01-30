import SearchBar from "./SearchBar";
import PropTypes from 'prop-types';

function NotesBar({notes, refresh}) {
  if(!notes){
    return (
        <div className="notes-bar">
            <SearchBar />
            There are no notes in this folder.
        </div>
  )
  } else {
    return (
        <div className="notes-bar">
            <SearchBar />
            {notes && notes.map((note) => (
                <div className="note-button" key={note._id}>
                    <p className="title">{note.text}</p>
                    <div className="note-details">{note.updatedAt}</div>
                    <div className="parent-folder">{note.folder}</div>
                </div>
            ))}
        </div>
  )
  }
}

NotesBar.propTypes = {
  notes: PropTypes.array,
  refresh: PropTypes.func,
}

export default NotesBar