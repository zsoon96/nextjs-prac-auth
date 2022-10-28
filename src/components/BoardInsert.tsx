
// 게시글 작성 UI 컴포넌트
import {useForm} from "react-hook-form";

const BoardInsert = () => {
    // 등록 & 검증을 위한 register()
    const { register } = useForm()

    return (
        <form>
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
                        {...register('title', { required: true })}
                        type="title" placeholder="제목을 입력해주세요."
                        style={{padding: '10px', borderRadius: '8px', width:'100%'}}
                    />
                </div>

                <div style={{color: 'black', marginBottom: '20px'}}>
                    <div style={{ marginBottom: '10px'}}>내용</div>
                    <input
                        {...register('content', { required: true })}
                        type="content" placeholder="내용을 입력해주세요."
                        style={{padding: '10px', borderRadius: '8px', width:'100%'}}
                    />
                </div>

                <div style={{color: 'black', marginBottom: '20px'}}>
                    <div style={{ marginBottom: '10px'}}>작성자</div>
                    <input
                        {...register('author', {
                            required: true,
                            maxLength: { value: 4, message: "4글자 이내로 입력해주세요."},
                            validate: {noAdmin: (value) => !value.includes('admin') || '해당 입력값은 허용되지 않습니다.'}
                        })}
                        type="author" placeholder="작성자를 입력해주세요."
                        style={{padding: '10px', borderRadius: '8px', width:'100%'}}
                    />
                </div>
                <input type="submit"/>
            </div>
        </form>
    )
}

export default BoardInsert