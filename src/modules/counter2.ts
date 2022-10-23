import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// slice 생성 ( 액선 + 슬라이스 통합본 )

// 타입 정의
export type StateType = {
    value: number
}

// 초기값 설정
const initialState: StateType = {value: 0}

// 슬라이스 생성
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        plusCounter: (state: StateType, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        minusCounter: (state: StateType, action: PayloadAction<number>) => {
            state.value -= action.payload
        }
    }
})

// 액션 export
export const { plusCounter, minusCounter } = counterSlice.actions

// 슬라이스 export
export default counterSlice