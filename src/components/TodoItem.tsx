import {Todo} from "../modules/todos";
import {CSSProperties} from "react";

// 각 할일 항목에 대한 정보를 보여주는 UI 컴포넌트

// 해당 객체, 함수를 props로 받아와서 호출
type TodoItemProps = {
    todo: Todo
    onToggle: (id: number) => void
    onRemove: (id: number) => void
}

const TodoItem = ({todo, onToggle, onRemove} : TodoItemProps) => {
    const textStyle: CSSProperties = {
        textDecoration: todo.done ? 'line-through' : 'none'
    }
    const removeStyle: CSSProperties = {
        marginLeft: 8,
        color: 'red'
    }

    const handleToggle = () => {
        onToggle(todo.id)
    }

    const handleRemove = () => {
        onRemove(todo.id)
    }

    return (
        <li>
            <span onClick={handleToggle} style={textStyle}>
                {todo.text}
            </span>
            <span onClick={handleRemove} style={removeStyle}>
                (X)
            </span>
        </li>
    )
}

export default TodoItem