import {useState} from "react";

// state 비동기 처리 예제
const StatePrac = () => {
    const [ count, setCount] = useState(0)
    const [ age, setAge ] = useState(20)

    const handleAgeChange = () => {
        // 3번째 클릭 시, count = 3
        setCount(count + 1)

        // 하지만 비동기 처리이기 때문에 count = 3은 나중에 반영되고 다음 로직 식행
        // 그래서 아직 count는 2인 상태이기 if문을 타게 되는 것
        if ( count < 3 ) {
            setAge(age + 1)
        }
    }
    // 예상 결과 22 > 출력 결과 23

    return (
        <div>
            <div>안녕하세요, 전 {age}</div>
            <button onClick={handleAgeChange}>누르면 한살 먹기</button>
        </div>
    )
}

export default StatePrac;