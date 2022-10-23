import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "./counter2";
import {userSlice} from "./user";

// 슬라이스를 통합한 store를 만들고, RootState를 정의

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        user: userSlice.reducer
    }
})

// store export
export default store;

// RootState export
export type RootState = ReturnType<typeof store.getState>