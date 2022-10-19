import {Todo} from "../modules/todos";
import TodoItem from "./TodoItem";

// 여러개의 TodoItem 컴포넌트를 렌더링 해주는 컴포넌트

// 해당 배열, 함수를 props로 받아와서 호출
type TodoListProps = {
    todos: Todo[],
    onToggle: (id: number) => void
    onRemove: (id: number) => void
}

const TodoList = ({todos, onToggle, onRemove}: TodoListProps) => {
    if (todos.length === 0) {
        return <p>등록된 항목이 없습니다.</p>
    }

    return (
        <ul>
            {todos.map(todo => (
                // 각 TodoItem 컴포넌트에게 todo, onToggle, onRemove 전달
                <TodoItem
                    todo={todo}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={todo.id}
                />
            ))}
        </ul>
    )
}

export default TodoList