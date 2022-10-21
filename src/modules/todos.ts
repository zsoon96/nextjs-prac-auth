import {ActionType, createReducer, deprecated} from 'typesafe-actions';

const {createStandardAction, createAction} = deprecated

// 액션 타입 선언
export const ADD_TODO = <const>'todos/ADD_TODO';
export const TOGGLE_TODO = <const>'todos/TOGGLE_TODO';
export const REMOVE_TODO = <const>'todos/REMOVE_TODO';

// 새로운 항목 추가 시 사용할 고유 Id 값
let todoId = 1;

// 파라미터를 기반으로 커스텀된 payload가 들어가는 액션함수
// action은 액션 객체를 만드는 함수
export const addTodo = createAction(ADD_TODO, action => (text: string) =>
    action({
        id: todoId++,
        text
    })
);

// payload가 그대로 들어가는 액션함수
export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>()
export const removeTodo = createStandardAction(REMOVE_TODO)<number>()

// export const addTodo = (text:string) => ({
//     type: ADD_TODO,
//     payload: {
//         id: todoId++,
//         text
//     }
// })

// export const removeTodo = (id: number) => ({
//     type: REMOVE_TODO,
//     payload: id
// })

// 모든 액션 객체에 대한 타입 정의
// type TodosAction =
//     | ReturnType<typeof addTodo>
//     | ReturnType<typeof toggleTodo>
//     | ReturnType<typeof removeTodo>
const actions = {
    addTodo,
    toggleTodo,
    removeTodo
}
type TodosAction = ActionType<typeof actions>

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
const todos = createReducer<TodoState, TodosAction>(initialState, {
    [ADD_TODO]: (state, action) => state.concat({...action.payload, done: false}),
    // 바구조화 할당을 활용하여 payload 값의 이름을 바꿀 수 있음
    [TOGGLE_TODO]: (state, { payload: id }) => state.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    [REMOVE_TODO]: (state, { payload: id }) => state.filter(todo => todo.id !== id)
});

// function todos (state: TodoState = initialState, action: TodosAction): TodoState {
//     switch (action.type) {
//         case ADD_TODO:
//             // 배열에 객체 추가
//             return state.concat({
//                 id: action.payload.id,
//                 text: action.payload.text,
//                 done: false
//             })
//         case TOGGLE_TODO:
//             // 액션 페이로드에 담긴 id와 todo.id와 같다면 done 업데이트?
//             return state.map(todo =>
//                 todo.id === action.payload ? {...todo, done: !todo.done} : todo
//             )
//         case REMOVE_TODO:
//             // todo.id에서 액션 페이로드에 담긴 id와 다른 것만 배열 재생성
//             return state.filter(todo => todo.id !== action.payload)
//         default:
//             return state
//     }
// }

export default todos;