import './Toolbar.css'
import FileIcon from './FileIcon'
import { useReducer, useEffect } from 'react'
import fileData from './FileData'

export default function Toolbar({ activeID, setActiveID }: {
  activeID: number,
  setActiveID: (id: number) => any
}) {

  const [fileIDs, updateFileIDs] = useReducer(() => fileData.getKeys(), fileData.getKeys())

  function AddFile() {
    fileData.addFile()
    updateFileIDs()
  }

  function RemoveFile(id: number) {
    fileData.removeFile(id)
    updateFileIDs()
  }

  useEffect(() => {
    if (!fileData.hasKey(activeID)) {
      if (fileData.getLength() == 0) {
        setActiveID(fileData.addFile())
        updateFileIDs()
      } else {
        setActiveID(fileData.getKeys()[0])
      }
    }
  }, [fileIDs])


  return <div id='toolbar' onWheel={(e) => {
    e.currentTarget.children[1].scrollBy(e.deltaY * 0.75, 0)
  }}>
    <button id='file-add' onClick={(_) => AddFile()}>+</button>
    <div id='files'>
      {fileIDs.map(id =>
        <FileIcon
          key={id}
          active={id == activeID}
          getName={() => fileData.getFileName(id)!}
          setName={(name: string) => {
            fileData.setFileName(id, name)
          }}
          myActivate={() => setActiveID(id)}
          myDelete={() => {
            RemoveFile(id)
          }} />
      )}
    </div>
  </div>
}