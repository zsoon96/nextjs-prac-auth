import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "./counter2";

// 슬라이스를 통합한 store를 만들고, RootState를 정의

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
})

// store export
export default store;

// RootState export
export type RootState = ReturnType<typeof store.getState>