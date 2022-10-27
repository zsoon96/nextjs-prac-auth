import Board from "../modules/board";

interface Board {
    id: number,
    title: string,
    author: string,
    content: string,
    regDate: string
}

type BoardInfoProps = {
    board: Board
}
const BoardInfo = ({board} : BoardInfoProps) => {
    console.log('컴포넌트간 정보 전달', board)
    return (
        <div style={{ width: '80%', margin: '36px auto', borderRadius: '10px', padding: '10px 24px'}}>
            <p>NO {board.id}</p>
            <hr style={{ border: '0.25px solid gray' }} />
            <p style={{ fontSize: '36px', fontWeight: 'bold', marginTop:'24px',marginBottom: 0}}>{board.title}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{fontSize: '16px', color: 'lightgray'}}>{board.author}</p>
                <p style={{fontSize: '16px', color: 'lightgray'}}>{board.regDate}</p>
            </div>
            <hr style={{ border: '0.25px solid gray' }} />
            <p style={{ fontSize: '24px', height: '240px'}}>{board.content}</p>
            <hr style={{ border: '0.25px solid gray' }} />

       </div>
    )
}

export default BoardInfo