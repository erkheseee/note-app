import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

function FolderBar({folders, currentFolder, refresh, newFolder, handleFolderChange}) {

  const [error, setError] = useState(null);
  const [newFolderName, setNewFolderName] = useState(currentFolder.text);
  let jsx = [];

  const handleFocusOut = async () => {
    const response = await fetch(`http://localhost:4000/notes/folder/${currentFolder._id}`, {
      method: 'PATCH',
      body: JSON.stringify({text: newFolderName}),
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
      refresh('POST folder');
      console.log('The folder has been renamed');
    }
  }

  const createFolder = async () => {
    const response = await fetch(`http://localhost:4000/notes/folder/`, {
      method: 'POST',
      body: JSON.stringify({text: 'New Folder'}),
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
      refresh('POST folder');
      console.log('A folder has been created');
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/notes/folder/${id}`, {
      method: 'DELETE',
    });
    const json = await response.json();

    if(!response.ok) {
      setError(json.error);
    }
    if(response.ok) {
      setError(null);
      refresh(`DELETE folder ${id}`);
      console.log('The folder has been deleted');
    }
  }

  const handleFolderClick = async (foda) => {
    handleFolderChange(foda)
  }

  if(newFolder){
    jsx.push(<input key={currentFolder._id} className="folder-rename" type="text" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} onBlur={() => handleFocusOut()} autoFocus/>);
    folders.shift();
  }
  folders && folders.map((folder) => {jsx.push(<button className={folder._id == currentFolder._id ? "current-folder" : "folder"} key={folder._id} onClick={() => handleFolderClick(folder)}>
      <div className="icon"></div>
      <div className="text">{folder.text}</div>
      <div className="delete" onClick={() => handleDelete(folder._id)}>delete</div>
    </button>)}
  );

  return (
      <div className="folder-bar">
        {jsx}
        <button className="new-folder-button" onClick={() => createFolder()}>+ New Folder</button>
      </div>
  )
}

FolderBar.propTypes = {
  currentFolder: PropTypes.object,
  folders: PropTypes.array,
  refresh: PropTypes.func,
  newFolder: PropTypes.bool,
  handleFolderChange: PropTypes.func,
}

export default FolderBar