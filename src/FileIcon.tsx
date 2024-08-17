import './FileIcon.css'
import { useState, useEffect } from 'react'

interface fileIconProps {
  active: boolean,
  getName: () => string,
  setName: (name: string) => void,
  myActivate: () => void,
  myDelete: () => void
}

export default function FileIcon({ active, getName, setName, myActivate, myDelete }: fileIconProps) {
  const [filenameDisplay, setFilenameDisplay] = useState(getName())
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    setName(filenameDisplay)
  }, [filenameDisplay])

  const showContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditable(true)
  }

  return <div className={active ? 'active-file file' : 'file'} onContextMenu={showContextMenu} onClick={myActivate}>
    <div className='file-content'>
      {
        editable
          ? <input autoFocus value={filenameDisplay} className='file-name-edit' type="text" placeholder='Note' onChange={(e) => setFilenameDisplay(e.target.value)} onBlur={(_) => setEditable(false)} />
          : <p className='file-name-display'>{filenameDisplay}</p>
      }
      <button className='file-close' onClick={(_) => myDelete()}>x</button>
    </div>
    <div className='file-outline'></div>
  </div>
}