import {deprecated, ActionType, createReducer} from 'typesafe-actions';
const {createStandardAction} = deprecated

// action type 정의
// <const>는 타입을 추론 할 수 있도록 하기 위함 > 사용하지 않을 경우 string으로 인식
export const INCREASE = <const>'counter/INCREASE'
export const DECREASE = <const>'counter/DECREASE'
export const INCREASE_BY = <const>'counter/INCREASE_BY'

// action function
// createStandardAction를 통해 action을 간결하게 생성
// 액션함수에 type을 바로 넣어주면 별도로 위와 같이 액션 타입을 정의해주지 않아도 됨
export const increase = createStandardAction(INCREASE)();
export const decrease = createStandardAction(DECREASE)();
export const increaseBy = createStandardAction(INCREASE_BY)<number>();

// 모든 액션 객체들에 대한 타입 정의
const actions = { increase, decrease, increaseBy }
type CounterAction = ActionType<typeof actions>

// 리덕스 모듈에서 관리할 상태의 타입 선언
type CounterState = {
    count: number
}

// initialState
const initialState: CounterState = { count: 0 }

// counter reducer
// createReducer로 리듀서를 쉽게 생성 가능
// 제네릭으로 리듀서에서 관리할 상태, 리듀서에서 처리할 액션 타입을 넣어야함
const counter = createReducer<CounterState, CounterAction>(initialState, {
    [INCREASE]: state => ({ count: state.count + 1}),
    [DECREASE]: state => ({ count: state.count - 1}),
    [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload}),
})

export default counter