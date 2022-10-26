import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../src/modules/store";
import {useEffect} from "react";
import {loadBoard} from "../../src/modules/board";
import BoardList from "../../src/components/BoardList";


const BoardApp = () => {
    const dispatch = useDispatch()
    const {board} = useSelector((state:RootState) => state.board)

    useEffect(() => {
        // @ts-ignore
        dispatch(loadBoard())
        console.log('board', board)
    },[])

    return (
        <div>
            {/* 불러온 board 데이터 전달 */}
            <BoardList boards={board} />
        </div>
    )
}

export default BoardApp