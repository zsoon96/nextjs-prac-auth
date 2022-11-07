import Board, {removeBoard} from "../modules/board";
import Link from "next/link";
import {useDispatch} from "react-redux";
import axios from "axios";
import {useRouter} from "next/router";

interface Board {
    id: number,
    title: string,
    author: string,
    content: string,
    regDate: string
}

type BoardInfoProps = {
    board: Board
    no: any
}
const BoardInfo = ({board, no}: BoardInfoProps) => {
    // console.log('컴포넌트간 정보 전달', board)
    const dispatch = useDispatch()
    const router = useRouter()

    const handleRemove = () => {
        axios.delete(`http://localhost:3001/board/${board.id}`)
            .then( () => {
                dispatch(removeBoard(board));
                alert('게시글 삭제 성공')
                router.replace('/board')
            })
        console.log('리덕스 삭제 완료')
    }

    return (
        <div style={{width: '80%', margin: '36px auto', borderRadius: '10px', padding: '10px 24px'}}>
            <p>NO {no}</p>
            <hr style={{border: '0.25px solid gray'}}/>
            <p style={{fontSize: '36px', fontWeight: 'bold', marginTop: '24px', marginBottom: 0}}>{board.title}</p>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <p style={{fontSize: '16px', color: 'lightgray'}}>{board.author}</p>
                <p style={{fontSize: '16px', color: 'lightgray'}}>{board.regDate}</p>
            </div>
            <hr style={{border: '0.25px solid gray'}}/>
            <p style={{fontSize: '24px', height: '240px'}}>{board.content}</p>
            <hr style={{border: '0.25px solid gray'}}/>

            <Link href={`/board/edit/${board.id}`}>
                <button style={{padding: '12px', borderRadius: '8px', border: 'none', marginRight: '8px', marginTop: '4px'}}>수정</button>
            </Link>
            <button onClick={handleRemove} style={{padding: '12px', borderRadius: '8px', border: 'none'}}>삭제</button>
        </div>
    )
}

export default BoardInfo