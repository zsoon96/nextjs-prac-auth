import {useDispatch, useSelector } from "react-redux";
import {RootState} from "../src/modules/store";
import {minusCounter, plusCounter} from "../src/modules/counter2";

// 실제로 리덕스를 사용하는 페이지 컴포넌트

export default function Counter2Page() {
    const counterValue = useSelector((state:RootState) => state.counter.value)

    const dispatch = useDispatch()

    const handlePlusCounter = () => {
        dispatch(plusCounter(10))
    }

    const handleMinusCounter = () => {
        dispatch(minusCounter(10))
    }

    return (
        <div>
            <p>counterValue: {counterValue}</p>
            <button onClick={handlePlusCounter}> counter 증가</button>
            <button onClick={handleMinusCounter}> counter 감소</button>
        </div>
    )
}