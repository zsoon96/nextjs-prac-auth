import axios from "axios";

const FileUpload = () => {

    const uploadFile = async(file: File) => {
        const formData = new FormData()
        formData.append('files', file)
        formData.append('type', 'file')

        const res = await axios.post('http://localhost:3001/file/upload', formData )
        console.log(res)
    }

    const handleChangeFile = (e:any) => {
        const [file] = [...e.target.files]
        uploadFile(file)
    }

    return (
        <div>
            <input id='file' type='file' onChange={handleChangeFile} />
            <label htmlFor='file'> 파일 탐색</label>
        </div>
    )
}

export default FileUpload