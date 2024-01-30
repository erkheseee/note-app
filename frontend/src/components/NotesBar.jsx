import SearchBar from "./SearchBar"

function NotesBar({notes}) {
  return (
        <div className="notes-bar">
            <SearchBar />
            {notes && notes.map((note) => (
                <div className="note-button" key={note._id}>
                    <p className="title">{note.text}</p>
                    <div className="note-details">{note.updatedAt}</div>
                    <div className="parent-folder">{note.folder}</div>
                </div>
            ))}
        </div>
  )
}

export default NotesBar