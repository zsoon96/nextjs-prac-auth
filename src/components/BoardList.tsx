import Link from "next/link";

interface Board {
    id: number,
    title: string,
    author: string,
    content: string,
    regDate: string
}

type BoardInfoProps = {
    boards: Board[]
}

const BoardList = ({boards}: BoardInfoProps) => {
    return (
        <div>
            {boards && boards.map((board, idx) => (
                <div key={board.id} style={{
                    backgroundColor: 'white',
                    width: '80%',
                    margin: '36px auto',
                    borderRadius: '10px',
                    padding: '10px 24px'
                }}>
                    <Link href={{pathname: `board/view/${board.id}`, query: {no: idx + 1}}}>
                        <a>
                            <p style={{color: 'black'}}>NO {idx + 1}</p>
                            <p style={{color: 'black', fontSize: '24px'}}>{board.title}</p>
                            <hr/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <p style={{color: 'black'}}>{board.author}</p>
                                <p style={{color: 'black'}}>{board.regDate}</p>
                            </div>
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default BoardList