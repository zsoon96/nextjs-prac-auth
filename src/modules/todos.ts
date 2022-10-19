// 액션 타입 선언
export const ADD_TODO = <const>'todos/ADD_TODO';
export const TOGGLE_TODO = <const>'todos/TOGGLE_TODO';
export const REMOVE_TODO = <const>'todos/REMOVE_TODO';

// 새로운 항목 추가 시 사용할 고유 Id 값
const todoId = 1;

// 액션 생성 함수
export const addTodo = (text:string) => ({
    type: ADD_TODO,
    payload: {
        id: todoId + 1,
        text
    }
})

export const toggleTodo = (id: number) => ({
    type: TOGGLE_TODO,
    payload: id

})

export const removeTodo = (id: number) => ({
    type: REMOVE_TODO,
    payload: id
})

// 모든 액션에 대한 타입 정의
type TodosAction =
| ReturnType<typeof addTodo>
| ReturnType<typeof toggleTodo>
| ReturnType<typeof removeTodo>

// 상태에서 사용할 할일 항목 데이터 타입 정의
export type Todo = {
    id : number,
    text : string,
    done : boolean
}

// 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export type TodoState = Todo[]

// 초기 상태 선언
const initialState: TodoState = []

// 리듀서 작성
function todos (state: TodoState = initialState, action: TodosAction): TodoState {
    switch (action.type) {
        case ADD_TODO:
            // 배열에 객체 추가
            return state.concat({
                id: action.payload.id,
                text: action.payload.text,
                done: false
            })
        case TOGGLE_TODO:
            // 액션 페이로드에 담긴 id와 todo.id와 같다면 done 업데이트
            return state.map(todo =>
                todo.id === action.payload ? {...todo, done: !todo.done} : todo
            )
        case REMOVE_TODO:
            // todo.id에서 액션 페이로드에 담긴 id와 다른 것만 배열 재생성
            return state.filter(todo => todo.id !== action.payload)
        default:
            return state
    }
}

export default todos;