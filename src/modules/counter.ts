// action type 정의
// <const>는 타입을 추론 할 수 있도록 하기 위함 > 사용하지 않을 경우 string으로 인식
export const INCREASE = <const>'counter/INCREASE'
export const DECREASE = <const>'counter/DECREASE'
export const INCREASE_BY = <const>'counter/INCREASE_BY'

type CounterAction =
    | ReturnType<typeof increase>
    | ReturnType<typeof decrease>
    | ReturnType<typeof increaseBy>;

// action function
export const increase = () => ({type: INCREASE})
export const decrease = () => ({type: DECREASE})
export const increaseBy = (diff: number) => ({type: INCREASE_BY, payload: diff})

// initialStateType
type CounterState = {
    count: number
}

// initialState
const initialState: CounterState = { count: 0 }

// counter reducer
function counter(state: CounterState = initialState, action: CounterAction): CounterState {
    switch (action.type) {
        case INCREASE:
            return {count: state.count + 1}
        case DECREASE:
            return {count: state.count -1}
        case INCREASE_BY:
            return {count: state.count + action.payload}
        default:
            return state
    }
}
export default counter