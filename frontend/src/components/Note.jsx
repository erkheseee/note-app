import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"

function Note({note, refresh, currentFolder}) {
  const [noteObject, setNoteObject] = useState(null);
  const [error, setError] = useState(null);
  const [typed, setTyped] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNoteObject(note);
  }, [note])

  const handleTyping = async (e) => {
    setNoteObject((noteObject) => ({...noteObject, text: e.target.value}));
    setTyped(noteObject.text);
  }

  useEffect(() => {
    
    setSaving(true);
    const timeoutId = setTimeout(() => {
      handleChange();
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [typed])

  const handleChange = async () => {
    //handleChange is running without me editing the notepad for some reason
    if(noteObject) {
      const testObject = {"text": noteObject.text};

      const response = await fetch(`https://note-app-ycdm.onrender.com/notes/note/${noteObject._id}`, {
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
        setSaving(false);
        refresh({method: 'PATCH NOTE', id: Math.random()});
      }
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`https://note-app-ycdm.onrender.com/notes/note/${id}`, {
      method: 'DELETE',
    });
    const json = await response.json();

    if(!response.ok) {
      setError(json.error);
    }
    if(response.ok) {
      setError(null);
      console.log('Note has been deleted');
      refresh({method: 'DELETE note', id: id});
    }
  }

  const handleCreate = async (obj) => {
    const response = await fetch(`https://note-app-ycdm.onrender.com/notes/note/`, {
      method: 'POST',
      body: JSON.stringify({text: " ", folder: obj._id}),
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
      refresh({method: 'POST note', id: json._id});
      console.log('A note has been created');
    }
  }

  const handleOnDrop =(e) => {
    e.preventDefault();
  }

  return (
    <div className="note">
      {noteObject ? (
        <>
          <div className="note-header">
            <button className="delete-note" onClick={() => handleDelete(noteObject._id)}><FontAwesomeIcon icon={faTrashCan} className='trash-can'/></button>
            <div>{saving && 'saving...'}</div>
            <button className="create-note" onClick={() => handleCreate(currentFolder)}><FontAwesomeIcon icon={faPenToSquare} className='pen-to-square'/></button>
          </div>
          <textarea id="notepad" className="notepad" type="text" value={noteObject.text} onChange={(e) => handleTyping(e)} autoFocus onDrop={(e) => handleOnDrop(e)}></textarea>
        </>
      ):(
      <>
        <div className="note-header">
          <div></div>
          <button className="create-note" onClick={() => handleCreate(currentFolder)}><FontAwesomeIcon icon={faPenToSquare} className='pen-to-square'/></button>
        </div>
        <textarea className="notepad" type="text" value="No notes selected..." readOnly></textarea>
      </>
      )}
    </div>
  )
}

Note.propTypes = {
  note: PropTypes.object,
  refresh: PropTypes.func,
  currentFolder: PropTypes.object,
}

export default Note