import axios from "axios";
import {useState} from "react";

const FileUpload = () => {

    const [files, setFiles] = useState<any[]>([]);
    // const [thumbnail, setThumbnail] = useState<string[]>([])

    const uploadFile = async(files: any[]) => {
        console.log(files)
        const formData = new FormData()

        files.map((file) => {
            formData.append('files', file)
        })

        formData.append('type', 'file')

        const res = await axios.post('http://localhost:3001/file/upload', formData )
        console.log(res)

        alert('파입 업로드 성공!')
        window.location.reload()
    }

    // 파일 선택 시 실행하는 함수
    const handleChangeFile = ({target} :any) => {
        const files = Array.from(target.files)
        setFiles(files)

        // files.map((file : any) => {
        //     let url = URL.createObjectURL(file)
        //     setThumbnail([url, ...thumbnail])
        // })
    }

    // 파일 등록 버튼 클릭 시 실행하는 함수
    const handleUploadFile = () => {
        if ( files.length !== 0 ) {
            uploadFile(files)
        } else {
            alert('업로드할 파일이 없습니다!')
        }
    }

    // 파일 삭제 버튼 클릭 시 실행하는 함수
    const handleRemoveFile = (idx: number) => {
        // filter(조건, 인덱스): 조건에 true인 것만 다시 담아서 반환
        // 조건이 없을 경우에 아래와 같이 '_' 사용
        setFiles(files.filter((_, index) => index !== idx))
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

            {files.length !== 0 ? files.map((file, idx) => <div style={{ marginTop: '10px', display: 'flex'}}>
                {/* createObjectURL(): 파일 객체를 url로 바꿔주는 함수 (단, 브라우저에서만 사용 가능) */}
                <img alt="test" src={URL.createObjectURL(file)} style={{ width: '50px', margin: '0 10px'}}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '45vw'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px'}}>
                        <div>{file.name}</div>
                        <div style={{ marginTop: '4px'}}>{getByteSize(file.size)}</div>
                    </div>
                    <button onClick={() => handleRemoveFile(idx)}>삭제</button>
                </div>

            </div>) : null}

            <button style={{ marginTop: '16px'}} onClick={handleUploadFile}>이미지 등록</button>
        </div>
    )
}

export default FileUpload