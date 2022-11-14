import axios from "axios";

const FileUpload = () => {

    const uploadFile = async(files: any[]) => {

        const formData = new FormData()

        files.map((file) => {
            formData.append('files', file)
        })

        formData.append('type', 'file')

        const res = await axios.post('http://localhost:3001/file/upload', formData )
        console.log(res)
    }

    const handleChangeFile = ({target} :any) => {
        const files = Array.from(target.files)
        uploadFile(files)
    }

    return (
        <div>
            <input id='file' type='file' multiple={true} onChange={handleChangeFile} />
            <label htmlFor='file'> 파일 탐색</label>
        </div>
    )
}

export default FileUpload