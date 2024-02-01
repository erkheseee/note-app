import { useEffect, useState } from 'react'
import SearchBar from "./SearchBar";
import PropTypes from 'prop-types';

function NotesBar({notes, handleNoteChange}) {
  const [currentNote, setCurrentNote] = useState(notes[0]);

  //format date
  const formatDate = (date) => {
    const test = new Date(date);
    return test.toLocaleDateString(); // 5/12/2020
  }

  useEffect(() => {
    notes.length == 0 ? setCurrentNote([]) : setCurrentNote(notes[0]);
  }, [notes])

  const handleNoteClick = (nootaa) => {
    setCurrentNote(nootaa);
    handleNoteChange(nootaa);
  }

  const lineLogic = (a ,index) => {
    if(a[index]._id == currentNote._id){
      return "invisible-line";
    } else {
      if(a.length > index+1){
        if(a[index + 1]._id == currentNote._id) {
          return "invisible=line";
        } else {
          return "line";
        }
      }
    }
  }

  if(notes.length != 0){
    return (
      <div className="notes-bar">
            <SearchBar />
            {notes && notes.map((note, index, self) => (
              <div key={note._id}>
                <div id={note._id == currentNote._id && "current"} className="note-button" key={note._id} onClick={() => handleNoteClick(note)}>
                    <div style={{maxWidth: 'inherit'}}>
                      <h3 className="noteTitle">{note.text.split('\n')[0]}</h3>
                    </div>
                    <div style={{display: 'flex'}}>
                      <div className="note-details">{formatDate(note.updatedAt)}</div>
                      <div style={{width: '15px'}}></div>
                      <div className="noteText">{note.text.split('\n')[1]}</div>
                    </div>
                </div>
                <div className={lineLogic(self, index)}></div>
              </div>
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
  folders: PropTypes.array,
}

export default NotesBar