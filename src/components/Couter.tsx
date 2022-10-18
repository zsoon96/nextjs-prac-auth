import React from 'react';

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
            <button onClick={() => {increaseBy(5)}}>increaseBy</button>
        </>
    )
}

export default Counter;