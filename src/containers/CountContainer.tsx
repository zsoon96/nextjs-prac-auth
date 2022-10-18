import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import { increase, decrease, increaseBy} from "../modules/counter";
import Counter from "../components/Couter";

// 리덕스와 관련된 비즈니스 로직 작성
const CounterContainer = () => {
    // 상태 조회 > 상태 조회 시 state 타입을 RootSta†e로 지정
    const count = useSelector((state:RootState) => state.counter.count)
    console.log('count-redux', count)
    const dispatch = useDispatch()

    // 각 액션들을 디스패치하는 함수
    const onIncrease = () => {
        dispatch(increase())
    }

    const onDecrease = () => {
        dispatch(decrease())
    }

    const onIncreaseBy = (diff: number) => {
        dispatch(increaseBy(diff))
    }

    return (
        <Counter count={count} increase={onIncrease} decrease={onDecrease} increaseBy={onIncreaseBy} />
    )
}

export default CounterContainer