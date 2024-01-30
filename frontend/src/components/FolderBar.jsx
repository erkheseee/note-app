function FolderBar({folders}) {
  return (
      <div className="folder-bar">
        {folders && folders.map((folder) => (
            <div className="folder" key={folder._id}>
              <div className="icon"></div>
              <div className="text">{folder.text}</div>
              <div className="options"></div>
            </div>
        ))}
      </div>
  )
}

export default FolderBar