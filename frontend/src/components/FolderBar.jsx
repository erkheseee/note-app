import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

function FolderBar({folders, currentFolder, refresh, newFolderParent, handleFolderChange}) {

  const [error, setError] = useState(null);
  const [newFolder, setNewFolder] = useState('New Folder');
  let jsx = [];

  // useEffect(() => {
  //   if(newFolderParent){
  //     setNewFolder(folders[0]);
  //   }
  // }, [newFolderParent])

  const handleTyping = (e) => {
    setNewFolder((newFolder) => ({...newFolder, "text": e.target.value}));
  }

  const handleFocusOut = async () => {
    const response = await fetch(`http://localhost:4000/notes/folder/${currentFolder._id}`, {
      method: 'PATCH',
      body: JSON.stringify({text: newFolder.text}),
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
      setNewFolder(null);
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
      console.log('The folder has been deleted');
      refresh(`DELETE folder`);
    }
  }

  const handleFolderClick = (foda) => {
    handleFolderChange(foda);
  }

  if(newFolderParent){
    jsx.push(<input key={newFolder._id} className="folder-rename" type="text" value={newFolder} onChange={(e) => handleTyping(e)} onBlur={() => handleFocusOut()} autoFocus/>);
    folders.map((folder, index) => {
      if(folder._id == newFolder._id) {
        folders.splice(index, 1);
      }
    })
  }
  if(folders){
    folders.sort(function(a, b) {
      var textA = a.text.toUpperCase();
      var textB = b.text.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
      folders.map((folder) => {jsx.push(<button className={folder._id == currentFolder._id ? "current-folder" : "folder"} key={folder._id} onClick={() => handleFolderClick(folder)}>
      <div className="icon"></div>
      <div className="text">{folder.text}</div>
      <div className="delete" onClick={() => handleDelete(folder._id)}>delete</div>
    </button>)}
    );
  }

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
  newFolderParent: PropTypes.bool,
  handleFolderChange: PropTypes.func,
}

export default FolderBar