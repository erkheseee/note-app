import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import ContextMenu from "./ContextMenu";

function FolderBar({folders, currentFolder, refresh, newFolderParent, handleFolderChange}) {

  const ALLNOTES = "65b8b73e684f38e3adbe2675";
  const contextMenuRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
    id: null,
  })
  const [clickedOptions, setClickedOptions] = useState(null);
  const [error, setError] = useState(null);
  const [newFolder, setNewFolder] = useState('New Folder');
  let jsx = [];
  let jsx2 = [];

  useEffect(() => {
    const handler = e => {
      if (contextMenuRef.current) {
        if (!contextMenuRef.current.contains(e.target)) {
          setContextMenu({
            position: {
              x: 0,
              y: 0,
            },
            toggled: false,
            id: null,
          });
          setClickedOptions(null);
        }
      }
    }

    // document.addEventListener('', handler);
    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    }
  })

  useEffect(() => {
    if(newFolderParent){
      folders.map((folder) => folder._id == newFolderParent && setNewFolder(folder));
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

  const handleRename = (id) => {
    refresh({method: 'RENAME folder', id: id});

    setContextMenu({
      position: {
        x: 0,
        y: 0,
      },
      toggled: false,
      id: null,
    });
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
      currentFolder._id == id ? refresh({method: `DELETE current folder`, id: id}) : refresh({method: 'DELETE folder', id: id})
    }

    setContextMenu({
      position: {
        x: 0,
        y: 0,
      },
      toggled: false,
      id: null,
    });
  }

  const handleFolderClick = (foda) => {
    handleFolderChange(foda);
  }

  const handleContextMenu = (e, item) => {
    e.preventDefault();

    const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();

    const isLeft = e.clientX < window?.innerWidth / 2

    let x;
    let y = e.clientY;

    if (isLeft) {
      x = e.clientX
    } else {
      x = e.clientX - contextMenuAttr.width
    }

    setContextMenu({
      position: {
        x,
        y
      },
      toggled: true,
      id: item._id,
    });

    setClickedOptions(item);
  } 

  const selectText = () => {
    const input = document.getElementById('input');
    input.select();
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("hovering-over-folder");

  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("hovering-over-folder");
    e.currentTarget.classList.add("folder");

  }

  const handleOnDrop = async (e, folderId) => {
    e.preventDefault();
    e.currentTarget.classList.remove("hovering-over-folder");
    e.currentTarget.classList.add("folder");
    const noteId = e.dataTransfer.getData("text");
    // note patch HERE
    const response = await fetch(`http://localhost:4000/notes/note/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify({folder: folderId}),
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
        refresh({method: 'PATCH NOTE', id: Math.random()});
      }
  }

  if(folders){
    let copyFolders = folders.slice();

    const allNotes = copyFolders.splice(copyFolders.findIndex(object => {
      return object._id === ALLNOTES;
    }), 1);

    copyFolders = copyFolders.sort(function(a, b) {
      var textA = a.text.toUpperCase();
      var textB = b.text.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    if(allNotes){
      jsx.push(<button id={allNotes[0]._id == currentFolder._id ? "current" : undefined} className="folder" key={allNotes[0]._id} onClick={() => handleFolderClick(allNotes[0])}>
      <FontAwesomeIcon icon={faFolderOpen} className='folder-open'/>
      <div style={{width: '3%'}}></div>
      <div className="text">{allNotes[0].text}</div>
    </button>)
    }

    copyFolders.map((folder) => {
      if(newFolderParent && folder._id == newFolder._id){
          jsx.push(<input id="input" className="folder-rename" type="text" value={newFolder.text} onChange={(e) => handleTyping(e)} onBlur={() => handleFocusOut()} autoFocus onFocus={() => selectText()} onKeyDown={(e) => {e.key === "Enter" && document.getElementById('input').blur()}}/>); 
      }
      else {
      jsx.push(
        <button id={folder._id == currentFolder._id ? "current" : undefined} className="folder" key={folder._id} onClick={() => handleFolderClick(folder)} onDragOver={handleDragOver} onDrop={(e) => handleOnDrop(e, folder._id)} onDragLeave={handleDragLeave}>
          <FontAwesomeIcon icon={faFolderOpen} className='folder-open'/>
          <div style={{width: '3%'}}></div>
          <div className="text">{folder.text}</div>
          <div className='menu'>
            <div id={clickedOptions && clickedOptions._id == folder._id ? 'clicked' : undefined} className='folder-options' onContextMenu={(e) => handleContextMenu(e, folder)}>
              <FontAwesomeIcon icon={faEllipsis} className='folder-open' />
            </div>
          </div>
        </button>
      )
    }
  }
  );

  jsx.push(<ContextMenu 
          contextMenuRef = {contextMenuRef}
          isToggled={contextMenu.toggled}
          positionX = {contextMenu.position.x}
          positionY = {contextMenu.position.y}
          id = {contextMenu.id}
          buttons={[
            {
              text: "Rename",
              icon: <FontAwesomeIcon icon={faPen}/>,
              onClick: handleRename,
              isSpacer: false,
            },
            {
              text: "",
              icon: "",
              onClick: () => null,
              isSpacer: true,
            },
            {
              text: "Delete",
              icon: <FontAwesomeIcon icon={faTrashCan}/>,
              onClick: handleDelete,
              isSpacer: false
            }
          ]}
        />)

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
        <div className="folder-scroll">
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