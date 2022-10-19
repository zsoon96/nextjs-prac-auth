import {ChangeEvent, FormEvent, useState} from "react"

// 새 항목 등록하는 UI 컴포넌트

// 해당 함수를 props로 받아와서 호출
type TodoInsertProps = {
    onInsert: (text: string) => void
}

const TodoInsert = ( {onInsert} : TodoInsertProps ) => {
    const [value, setValue] = useState('')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        onInsert(value)
        setValue('')
    }

    return (
        <form onSubmit={onSubmit}>
            <input
            placeholder="할 일을 입력하세요."
            value={value}
            onChange={onChange}
            />
            <button type="submit">등록</button>
        </form>
    )
}

export default TodoInsert