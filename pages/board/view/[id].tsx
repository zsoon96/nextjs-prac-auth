import {useEffect, useState} from "react";
import BoardInfo from "../../../src/components/BoardInfo";
import {useRouter} from "next/router";
import axios from "axios";

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

const BoardDetail = ({board} : BoardInfoProps) => {
    // const [data, setData] = useState()
    console.log('data',board)

    const router = useRouter()
    const { id } = router.query

    useEffect( () => {
        if ( id && id > 0 ) {
            axios.get(`http://loacalhost:3001/board/${id}`)
                .then((res) => {
                    console.log('게시글 정보', res.data)
                })
        }
    },[id])

    return (
        <>
            {board && (
                <>
                    <BoardInfo board={board}/>
                </>
            )}
        </>
    )
}

export default BoardDetail