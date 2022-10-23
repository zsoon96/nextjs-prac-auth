import { useDispatch, useSelector } from "react-redux";
import {RootState} from "../src/modules/store";
import {useEffect} from "react";
import {loadUser} from "../src/modules/user";
import styles from '../styles/Home.module.css';

function UserProfile() {

    const dispatch = useDispatch()
    const { user } = useSelector( (state:RootState) => state.user)
    console.log('user', user)

    useEffect(() => {
        // createAsuncThunk로 만든 비동기 액션 함수를 컴포넌트 렌더링 될 때 실행
        dispatch(loadUser(2))
    },[])

    return (
        <div className={styles.loadUser}>
            <div>
                <p>성: </p>
                <span>{user?.first_name}</span>
            </div>
            <div>
                <p>이름: </p>
                <span>{user?.last_name}</span>
            </div>
            <div>
                <p>이메일: </p>
                <span>{user?.email}</span>
            </div>
        </div>
    )
}

export default UserProfile