import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

function Note({note, changeParentState}) {
  const [noteObject, setNoteObject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setNoteObject({id: note._id, text: note.text});
  }, [])

  useEffect(() => {
    noteObject && handleChange();
  }, [noteObject])

  const handleChange = async () => {
    const testObject = {text: noteObject.text};

    const response = await fetch(`http://localhost:4000/notes/note/${noteObject.id}`, {
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
      changeParentState(noteObject.text);
      console.log('Note has been updated');
    }
  }

  if(!noteObject){
    return (<></>)
  } else {
  return (
    <div className="note">
      {note ? (
        <input className="notepad" type="text" value={noteObject.text} onChange={(e) => setNoteObject((noteObject) => ({...noteObject, text: e.target.value}))}></input>
      ):(<div>No notes selected</div>)}
    </div>
  )
  }
}

Note.propTypes = {
  note: PropTypes.object,
  changeParentState: PropTypes.func,
}

export default Note