import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"

function FolderBar({folders, currentFolder, refresh, newFolderParent, handleFolderChange}) {

  const ALLNOTES = "65b8b73e684f38e3adbe2675";
  const [error, setError] = useState(null);
  const [newFolder, setNewFolder] = useState('New Folder');
  let jsx = [];
  let jsx2 = [];

  useEffect(() => {
    console.log("ORDER",folders);
    if(newFolderParent){
      setNewFolder(folders[0]);
    }
  }, [folders])

  const handleTyping = (e) => {
    setNewFolder({...newFolder, text: e.target.value});
  }

  const handleFocusOut = async () => {
    const response = await fetch(`http://localhost:4000/notes/folder/${newFolder._id}`, {
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
      setNewFolder("New Folder");
      refresh({method: 'PATCH folder', id: json._id});
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
      refresh({method: 'POST folder', id: json._id});
      console.log('A folder has been created');
    }
  }

  // delete hiiher All Note ru ochdgin boliulaad suuld baisan folder dere baih. bur magadgu note bolon notepad d nuluugui baih
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
      refresh({method: `DELETE folder`, id: id});
    }
  }

  const handleFolderClick = (foda) => {
    handleFolderChange(foda);
  }

  if(folders){
    const copyFolders = folders.slice().sort(function(a, b) {
      var textA = a.text.toUpperCase();
      var textB = b.text.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    copyFolders.map((folder) => {
      if(newFolderParent && folder._id == newFolder._id){
          jsx.push(<input className="folder-rename" type="text" value={newFolder.text} onChange={(e) => handleTyping(e)} onBlur={() => handleFocusOut()} autoFocus/>); 
      }
      else if(folder._id == ALLNOTES){
        jsx.push(<button id={folder._id == currentFolder._id && "current"} className="folder" key={folder._id} onClick={() => handleFolderClick(folder)}>
          <div className="icon"></div>
          <div className="text">{folder.text}</div>
        </button>)
      } else {
      jsx.push(<button id={folder._id == currentFolder._id && "current"} className="folder" key={folder._id} onClick={() => handleFolderClick(folder)}>
          <div className="icon"></div>
          <div className="text">{folder.text}</div>
          <div className="delete" onClick={() => handleDelete(folder._id)}>delete</div>
        </button>)
      }
    }
    );
    if(newFolderParent) {
      jsx2.push(<button className="new-folder-button" onClick={() => createFolder()} disabled>
        <FontAwesomeIcon icon={faCirclePlus} className='circle-plus'/>
        <div style={{width: '2%'}}></div>
        <div>New Folder</div>
      </button>)
    } else {
      jsx2.push(<button className="new-folder-button" onClick={() => createFolder()}>
        <FontAwesomeIcon icon={faCirclePlus} className='circle-plus'/>
        <div style={{width: '2%'}}></div>
        <div>New Folder</div>
      </button>);
    }
  }

  return (
      <div className="folder-bar">
        <div>
          {jsx}
        </div>
        {jsx2}
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