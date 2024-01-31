import { useEffect, useState } from 'react'
import SearchBar from "./SearchBar";
import PropTypes from 'prop-types';

function NotesBar({notes, handleNoteChange, refresh}) {
  const [currentNote, setCurrentNote] = useState(notes[0]);

  useEffect(() => {
    setCurrentNote(notes[0]);
  }, [notes])

  const handleNoteClick = (nootaa) => {
    setCurrentNote(nootaa);
    handleNoteChange(nootaa);
  }

  if(notes.length != 0){
    return (
      <div className="notes-bar">
            <SearchBar />
            {notes && notes.map((note) => (
                <button className={note._id == currentNote._id ? "current-note-button" : "note-button"} key={note._id} onClick={() => handleNoteClick(note)}>
                    <p className="title">{note.text}</p>
                    <div className="note-details">{note.updatedAt}</div>
                    <div className="parent-folder">{note.folder}</div>
                </button>
            ))}
        </div>
  )
  } else {
    return (
      <div className="notes-bar">
        <SearchBar />
        There are no notes in this folder.
      </div>
    )
  }
}

NotesBar.propTypes = {
  notes: PropTypes.array,
  handleNoteChange: PropTypes.func,
  refresh: PropTypes.func,
}

export default NotesBar