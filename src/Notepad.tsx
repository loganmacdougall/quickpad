import './Notepad.css'
import fileData from './FileData'
import { useEffect, useState, useTransition } from 'react'

export default function Notepad({ activeID }: {
  activeID: number
}) {
  const [_, saveTransition] = useTransition()
  const [content, setContent] = useState(fileData.getFileContent(activeID)!)

  useEffect(() => {
    setContent(fileData.getFileContent(activeID)!)
  }, [activeID])

  useEffect(() => {
    saveTransition(() => {
      fileData.setFileContent(activeID, content)
    })
  }, [content])


  return <textarea
    id='notepad'
    value={content || ""}
    onChange={(e) => setContent(e.target.value)} />
}