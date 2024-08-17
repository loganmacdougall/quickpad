import { useState, useEffect, useTransition } from 'react'
import './App.css'
import Notepad from './Notepad'
import Toolbar from './Toolbar'
import fileData from './FileData'
import { getCookie, setCookie } from './Cookies'

export default function App() {
  const [activeID, setActiveID] = useState(Number.parseInt(getCookie("active") ?? "") ?? 0)
  const [pendingDataSave, saveDataCookies] = useTransition()
  const [_, saveActiveCookies] = useTransition()

  useEffect(() => {
    setInterval(async () => {
      if (!fileData.getSaved() && !pendingDataSave) {
        await saveToCookies()
      }
    }, 2000)
  }, [])

  useEffect(() => {
    saveActiveCookies(() => {
      setCookie("active", activeID.toString())
    })
  }, [activeID])

  const saveToCookies = async () => {
    if (!fileData.getSaved()) {
      await saveDataCookies(() => {
        fileData.setSaved()
        const data = fileData.getData()
        let expiryDate = new Date(Date.now() + 399 * 86400000)
        setCookie("data", JSON.stringify(data), expiryDate)
      })
    }
  }

  return (
    <>
      <Toolbar activeID={activeID} setActiveID={setActiveID} />
      <Notepad activeID={activeID} />
    </>
  )
}
