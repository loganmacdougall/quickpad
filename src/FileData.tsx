import { getCookie } from "./Cookies"

interface FileDataEntry {
  name: string,
  content: string
}

class FileData {
  private _data: Map<number, FileDataEntry>
  private _saved = true

  public constructor(useCookies: boolean = true) {
    const dataString = getCookie("data")
    if (dataString && useCookies) {
      try {
        const data = JSON.parse(dataString)
        this._data = new Map(data)
      } catch (_) {
        this._data = new Map()
      }
    } else {
      this._data = new Map()
    }
  }

  public setFileName(id: number, name: string): boolean {
    let file = this._data.get(id)
    if (file) {
      file.name = name
      this._saved = false
      return true
    } else {
      return false
    }
  }

  public setFileContent(id: number, content: string): boolean {
    let file = this._data.get(id)
    if (file) {
      file.content = content
      this._saved = false
      return true
    } else {
      return false
    }
  }

  public getFileName(id: number): string | null {
    let file = this._data.get(id)
    if (file) {
      return file.name
    } else {
      return null
    }
  }

  public getFileContent(id: number): string | null {
    let file = this._data.get(id)
    if (file) {
      return file.content
    } else {
      return null
    }
  }

  public removeFile(id: number): boolean {
    let success = this._data.delete(id)
    this._saved = false
    return success
  }

  public addFile(fileDataEntry?: Partial<FileDataEntry>): number {
    let id = Date.now()
    let entry: FileDataEntry = {
      name: fileDataEntry?.name ?? "Note",
      content: fileDataEntry?.content ?? ""
    }
    this._data.set(id, entry)
    this._saved = false
    return id
  }

  public getKeys() {
    return [...this._data.keys()]
  }

  public hasKey(id: number) {
    return this._data.has(id)
  }

  public getLength() {
    return this._data.size
  }

  public getData() {
    let data = Array.from(this._data.entries())
    return data
  }

  public getSaved() {
    return this._saved
  }

  public setSaved() {
    this._saved = true
  }
}


export default new FileData()