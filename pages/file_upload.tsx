import axios from "axios";
import {useState} from "react";

const FileUpload = () => {

    const [files, setFiles] = useState<any[]>([]);

    const uploadFile = async(files: any[]) => {
        console.log(files)
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

    // 사이즈 단위 변환 (byte > kb/mb/gb)
    const getByteSize = (size :number) => {
        // 각 데이터의 크기는 1024의 제곱
        // 1,024byte == 1kb / 1,024kb == 1mb / 1,024mb == 1gb
        const byteUnits = ['KB','MB','GB']

        for (let i = 0; i < byteUnits.length; i++) {
            // math.floor: 소수점 이하 버림
            size = Math.floor(size / 1024)

            if (size < 1024) {
                // toFixed: 소수점 이하 자리수 설정
                return size.toFixed(1) + byteUnits[i]
            }
        }
    }

    return (
        <div>
            <input id='file' type='file' multiple={true} onChange={handleChangeFile} />
            <label htmlFor='file'> 파일 탐색</label>

            <hr style={{ 'marginTop' : '14px', 'marginBottom': '14px'}}/>

            {files.length !== 0 ? files.map((file) => <div style={{ marginTop: '10px'}}>
                {file.name} - {getByteSize(file.size)}
            </div>) : null}
        </div>
    )
}

export default FileUpload