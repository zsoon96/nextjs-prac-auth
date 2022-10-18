// 리덕스와 관련된 비즈니스 로직 작성
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import { increase, decrease, increaseBy} from "../modules/counter";
import Counter from "../components/Couter";

const CounterContainer = () => {
    const count = useSelector((state:RootState) => state.counter.count)
    console.log('count-redux', count)
    const dispatch = useDispatch()

    const onIncrease = () => {
        dispatch(increase())
    }

    const onDecrease = () => {
        dispatch(decrease())
    }

    const onIncreaseBy = () => {
        dispatch(increaseBy(4))
    }

    return (
        <Counter count={count} increase={onIncrease} decrease={onDecrease} increaseBy={onIncreaseBy} />
    )
}

export default CounterContainer