import React from 'react';

// 실질적인 카운터 UI 화면

interface TypeProps {
    count: number
    increase: () => void
    decrease: () => void
    increaseBy: (diff:number) => void
}

const Counter = ({count, increase, decrease, increaseBy} : TypeProps) => {
    return (
        <>
            <h1 style={{color: 'white'}}>{count}</h1>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
            <button onClick={() => {increaseBy(5)}}>increaseBy +5</button>
        </>
    )
}

export default Counter;