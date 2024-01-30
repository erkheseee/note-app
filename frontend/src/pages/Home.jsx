import { useEffect, useState } from 'react'

import FolderBar from '../components/FolderBar'
import NotesBar from '../components/NotesBar'
import Note from '../components/Note'

const Home = () => {

    const [refresh, setRefresh] = useState(null);
    const [note, setNote] = useState(null);
    const [notes, setNotes] = useState(null);
    const [folders, setFolders] = useState(null);
    const [currentFolder, setCurrentFolder] = useState(null);
    const jsx = [];

    const handleRefresh = (e) => {
        console.log('REFRESHING - changing parent state');
        setRefresh(e);
    }
    
    //fetching folders
    useEffect(() => {
        const fetchFolders = async () => {
            const response = await fetch('http://localhost:4000/notes/folder');
            const json = await response.json();

            if(response.ok) {
                setFolders(json);
                setCurrentFolder(json[0]);
            }
        };

        fetchFolders();
    }, [refresh])

    //fetching notes
    useEffect(() => {
        const fetchNotes = async () => {
            if(currentFolder) {
                if(currentFolder.text == "All Notes") {
                    const response = await fetch('http://localhost:4000/notes/note');
                    const json = await response.json();
    
                    if(response.ok) {
                        setNotes(json);
                        setNote(json[0]);
                    }
                } else {
                    console.log(currentFolder);
                    const response = await fetch(`http://localhost:4000/notes/folder/${currentFolder._id}`);
                    const json = await response.json();
    
                    if(response.ok) {
                        console.log(json);
                        setNotes(json);
                        setNote(json[0]);
                    }       
                }
            }
            }
        fetchNotes();
    }, [currentFolder])

    if(folders) {
        refresh == "POST folder" ?
            jsx.push(<FolderBar folders={folders} currentFolder={currentFolder} handleFolderChange={setCurrentFolder} refresh={handleRefresh} newFolder={true}/>)
            :
            jsx.push(<FolderBar folders={folders} currentFolder={currentFolder} handleFolderChange={setCurrentFolder} refresh={handleRefresh} newFolder={false}/>)
    }
    if(notes) {
        if(notes.length == 0 ){
            console.log('11111111111111111');
            jsx.push(<><NotesBar refresh={handleRefresh}/><Note refresh={handleRefresh} /></>);
        } else {
            console.log('22222222222222222');
            jsx.push(<><NotesBar notes={notes} refresh={handleRefresh} /><Note note={note} refresh={handleRefresh} /></>)
        } 
    }

    return(
        <div className="home">
            {jsx}
        </div>
    )
}

export default Home