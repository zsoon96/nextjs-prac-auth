// 게시글 작성 UI 컴포넌트
const BoardInsert = () => {

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
                    <input type="title" placeholder="제목을 입력해주세요." style={{padding: '10px', borderRadius: '8px', width:'100%'}}/>
                </div>
                <div style={{color: 'black', marginBottom: '20px'}}>
                    <div style={{ marginBottom: '10px'}}>내용</div>
                    <input type="content" placeholder="내용을 입력해주세요." style={{padding: '10px', borderRadius: '8px', width:'100%'}}/>
                </div>
                <div style={{color: 'black', marginBottom: '20px'}}>
                    <div style={{ marginBottom: '10px'}}>작성자</div>
                    <input type="author" placeholder="작성자를 입력해주세요." style={{padding: '10px', borderRadius: '8px', width:'100%'}}/>
                </div>
            </div>
        </form>
    )
}

export default BoardInsert