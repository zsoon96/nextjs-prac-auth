const BoardInfo = () => {
    return (
        <div style={{ backgroundColor: 'white', width: '80%', margin: '36px auto', borderRadius: '10px', padding: '10px 24px'}}>
            <p style={{ color: 'black' }}>NO</p>
            <p style={{ color: 'black', fontSize: '24px' }}>제목</p>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ color: 'black' }}>작성자</p>
                <p style={{ color: 'black' }}>등록일</p>
            </div>
       </div>
    )
}

export default BoardInfo