import {FieldErrors, useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

// 게시글 작성 UI 컴포넌트

// 입력 데이터 속성 타입 정의
interface FormType {
    title: string
    content: string
    author: string
}

const BoardEdit = (id:any) => {
    // 등록 & 검증을 위한 register()
    // 입력값 동작을 위한 handleSubmit()
    // 입력값 초기화를 위한 reset()
    // 입력값 별도 설정을 위한 setValue()
    // 손쉬운 에러처리를 위한 formState
    const { register, handleSubmit, reset, setValue, formState: {errors} } = useForm<FormType>()
    const [board, setBoard] = useState<FormType>({
        title: '',
        content: '',
        author: ''
    })

    useEffect(() => {
        axios.get(`http://localhost:3001/board/${id.id}`)
            .then((res) => {
                console.log('상세 응답', res)
                setBoard(res.data)
            })
    },[id])

    // 입력된 데이터가 유효하다면 실행될 함수
    const onValid = (data: FormType) => {
    }
    // 입력된 데이터가 유효하지 않다면 실행될 에러 함수
    const onInvalid = (errors:FieldErrors) => console.log(errors)

    return (
        // 최종 호출 시, 데이터 처리 함수
        // handleSubmit (유효한 입력 값일 때 실행할 함수, 유효하지 않은 값일 때 실행할 에러 함수)
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <div style={{
                backgroundColor: 'white',
                width: '80%',
                margin: '100px auto',
                borderRadius: '10px',
                padding: '36px 36px',
            }}>
                <div style={{color: 'black', marginBottom: '20px'}}>
                    <div style={{ marginBottom: '10px'}}>제목</div>
                    <input
                        {...register('title', { required: {value: true, message: '필수 입력값입니다.'} })}
                        type="title" placeholder="제목을 입력해주세요."
                        value={board.title}
                        style={{padding: '10px', borderRadius: '8px', width:'100%'}}
                    />
                    <span style={{ color: 'red', fontSize: '14px'}}>{errors.title?.message}</span>
                </div>

                <div style={{color: 'black', marginBottom: '20px'}}>
                    <div style={{ marginBottom: '10px'}}>내용</div>
                    <input
                        {...register('content', { required: {value: true, message: '필수 입력값입니다.'} })}
                        type="content" placeholder="내용을 입력해주세요."
                        value={board.content}
                        style={{padding: '10px', borderRadius: '8px', width:'100%'}}
                    />
                    <span style={{ color: 'red', fontSize: '14px'}}>{errors.content?.message}</span>
                </div>

                <div style={{color: 'black', marginBottom: '20px'}}>
                    <div style={{ marginBottom: '10px'}}>작성자</div>
                    <input
                        {...register('author', {
                            required: { value: true, message: '필수 입력값입니다.' },
                            maxLength: { value: 4, message: "4글자 이내로 입력해주세요."},
                            validate: { noAdmin: (value) => !value.includes('ad') || '해당 입력값은 허용되지 않습니다.' }
                        })}
                        type="author" placeholder="작성자를 입력해주세요."
                        value={board.author}
                        style={{padding: '10px', borderRadius: '8px', width:'100%'}}
                    />
                    <span style={{ color: 'red', fontSize: '14px'}}>{errors.author?.message}</span>
                </div>
                <input type="submit" style={{padding: '10px', borderRadius: '8px'}} />
            </div>
        </form>
    )
}

export default BoardEdit