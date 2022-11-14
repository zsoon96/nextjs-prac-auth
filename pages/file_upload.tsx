import axios from "axios";
import {useState} from "react";

const FileUpload = () => {

    const [files, setFiles] = useState<any[]>([]);

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
        setFiles(files)
    }

    return (
        <div>
            <input id='file' type='file' multiple={true} onChange={handleChangeFile} />
            <label htmlFor='file'> 파일 탐색</label>

            <hr style={{ 'marginTop' : '14px', 'marginBottom': '14px'}}/>

            {files.length !== 0 ? files.map((file) => <div style={{ marginTop: '10px'}}>
                {file.name} - {file.size}
            </div>) : null}
        </div>
    )
}

export default FileUpload