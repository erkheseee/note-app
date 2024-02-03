import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import FolderBar from '../components/FolderBar'
import NotesBar from '../components/NotesBar'
import Note from '../components/Note'

const Home = ({initial}) => {
    const ALLNOTES = "65b8b73e684f38e3adbe2675";
    const [refresh, setRefresh] = useState(null);
    const [note, setNote] = useState(null);
    const [notes, setNotes] = useState(null);
    const [folders, setFolders] = useState(null);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [folderSwitch, setFolderSwitch] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const jsx = [];
    
    //fetching folders
    useEffect(() => {
        const fetchFolders = async () => {
            const response = await fetch('http://localhost:4000/notes/folder');
            const json = await response.json();

            if(response.ok) {
                setFolders(json);
                if(currentFolder == null || refresh.method == "DELETE current folder") {
                    json.map((folder) => {
                        folder._id == ALLNOTES ? setCurrentFolder(folder) : console.log("Error, All Notes folder has been removed");
                    })
                } else {
                    currentFolder ? setFolderSwitch(!folderSwitch): setCurrentFolder(json[0]);
                }
            }
        };

        fetchFolders();
    }, [refresh, initial])

    //fetching notes
    useEffect(() => {
        const fetchNotes = async () => {
            if(currentFolder._id == ALLNOTES) {
                const response = await fetch('http://localhost:4000/notes/note');
                const json = await response.json();

                if(response.ok) {
                    setNotes(json);
                    setNote(json[0]);
                }
            } else {
                const response = await fetch(`http://localhost:4000/notes/folder/${currentFolder._id}`);
                const json = await response.json();

                if(response.ok) {
                    setNotes(json);
                    json.length == 0 ? setNote(null) : setNote(json[0]);
                }       
            }
        } 
        console.log("HEEEEEEEEEERRRRREEEEEEEEE", note   );
        if(currentFolder) fetchNotes();

        loadJsx();
    }, [currentFolder, folderSwitch])

    //switching current note on notepad
    useEffect(() => {
        setNote(currentNote);
        loadJsx();
        console.log("DEBUG");
    }, [currentNote])

    function loadJsx() {
        if(folders) {
            if(refresh){
                refresh.method == "POST folder" ? jsx.push(<FolderBar folders={folders} currentFolder={currentFolder} handleFolderChange={setCurrentFolder} refresh={setRefresh} newFolderParent={true}/>)
                : jsx.push(<FolderBar folders={folders} currentFolder={currentFolder} handleFolderChange={setCurrentFolder} refresh={setRefresh} newFolderParent={false}/>);
            } else jsx.push(<FolderBar folders={folders} currentFolder={currentFolder} handleFolderChange={setCurrentFolder} refresh={setRefresh} newFolderParent={false}/>)
            if(notes) {
                if(notes.length == 0 ){
                    console.log('11111111111111111');
                    jsx.push(<NotesBar handleNoteChange={setCurrentNote} notes={[]} refresh={setRefresh} curNote={currentNote} />);
                    jsx.push(<Note note={note} refresh={setRefresh} handleFolderChange={setCurrentFolder} currentFolder={currentFolder} />);
                } else {
                    console.log('22222222222222222');
                    jsx.push(<NotesBar handleNoteChange={setCurrentNote} notes={notes} refresh={setRefresh} curNote={currentNote} />);
                    jsx.push(<Note note={note} refresh={setRefresh} handleFolderChange={setCurrentFolder} currentFolder={currentFolder} />)
                } 
            }
        }
    }

    //loadJsx when something happens. For some reason Home is loading again after Note has been mounted.
    loadJsx();

    return(
        <div className="home">
            {jsx}
        </div>
    )
}

FolderBar.propTypes = {
  initial: PropTypes.bool,
}

export default Home