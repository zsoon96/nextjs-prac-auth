import counter from "./counter";
import {combineReducers} from 'redux'
import todos from "./todos";

// root reducer 생성

const rootReducer = combineReducers({counter, todos})

// 루트 리듀서의 반환값 정의
// 추후 이 타입을 컨테이너 컴포넌트에서 임포트 해야하기 때문에 내보내주기
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;