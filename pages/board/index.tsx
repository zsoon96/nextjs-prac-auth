import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../src/modules/store";
import {useContext, useEffect} from "react";
import {loadBoard} from "../../src/modules/board";
import BoardList from "../../src/components/BoardList";
import AuthContext from "../../src/context/AuthContext";


const BoardApp = () => {
    const dispatch = useDispatch()
    const {board} = useSelector((state: RootState) => state.board)
    const ctx = useContext(AuthContext);

    useEffect(() => {
        // 로그인한 유저의 접근일 때만 데이터 페칭
        if (ctx.isAuth) {
            // @ts-ignore
            dispatch(loadBoard())
        }
        console.log('board', board)
    }, [])

    return (
        <div>
            {/* 불러온 board 데이터 전달 */}
            <BoardList boards={board}/>
        </div>
    )
}

export default BoardApp