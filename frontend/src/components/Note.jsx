import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

function Note({note, refresh}) {
  const [noteObject, setNoteObject] = useState(null);
  const [error, setError] = useState(null);
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    setNoteObject(note);
  }, [note])

  const handleTyping = async (e) => {
    setNoteObject((noteObject) => ({...noteObject, text: e.target.value}));
    setTyped(!typed);
  }

  useEffect(() => {
    handleChange();
  }, [typed])

  const handleChange = async () => {
    console.log('this is handle chagne')
    //handleChange is running without me editing the notepad for some reason
    if(noteObject) {
      const testObject = {"text": noteObject.text};

      const response = await fetch(`http://localhost:4000/notes/note/${noteObject._id}`, {
        method: 'PATCH',
        body: JSON.stringify(testObject),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json();

      if(!response.ok) {
        setError(json.error);
      }
      if(response.ok) {
        setError(null);
        console.log('Note has been updated');
        refresh(Math.random());
      }
    }
  }

  return (
    <div className="note">
      {noteObject ? (
        <input className="notepad" type="text" value={noteObject.text} onChange={(e) => handleTyping(e)}></input>
      ):(<div>No notes selected</div>)}
    </div>
  )
}

Note.propTypes = {
  note: PropTypes.object,
  refresh: PropTypes.func,
}

export default Note