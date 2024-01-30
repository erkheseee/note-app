import { useEffect, useState } from 'react'

import FolderBar from '../components/FolderBar'
import NotesBar from '../components/NotesBar'
import Note from '../components/Note'

const Home = () => {

    const [updated, setUpdated] = useState(null);
    const [note, setNote] = useState(null);
    const [notes, setNotes] = useState(null);
    const [folders, setFolders] = useState(null);

    const handleUpdate = (e) => {
        console.log('changing parent state');
        setUpdated(e);
    }
    
    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch('http://localhost:4000/notes/folder');
            const response2 = await fetch('http://localhost:4000/notes/note');
            const json = await response.json();
            const json2 = await response2.json();

            if(response.ok) {
                setFolders(json);
            }
            if(response2.ok) {
                setNotes(json2);
                setNote(json2[0]);
            }
        };

        fetchNotes();
    }, [updated])
    if(folders && notes && note) {
        return(
            <div className="home">
                <FolderBar folders={folders} />
                <NotesBar notes={notes} />
                <Note note={note} changeParentState={handleUpdate}/>
            </div>
        )
    } else{
        return (
            <></>
        )
    }
}

export default Home