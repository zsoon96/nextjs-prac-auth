import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://reqres.in/"

// 외부 서버에서 데이터 받아오기
export const loadUser = createAsyncThunk('user/loadUser', async (id, thunkApi) => {
    try {
        const response = await axios.get(`api/users/${id}`)
        // const response = await axios.get('api/users/2')
        return response.data.data
    } catch (err) {
        console.log(err)
        return err;
    }
})

// user 타입 정의
interface User {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

// 리덕스에서 관리할 user 상태값 정의
interface UserState {
    val: number,
    loadUserLoading: boolean,
    loadUserDone: boolean,
    loadUserError: any,
    user: User | null
}

// 초기 상태 값 설정
const initialState: UserState = {
    val: 0,
    loadUserLoading: false,
    loadUserDone: false,
    loadUserError: null,
    user: null
}

// 슬라이스 생성
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},

    // createAsyncThunk에서 전달된 생명주기 액션들은 여기서 적절한 작업 수행
    extraReducers: (builder) => {
        builder
            .addCase(loadUser.pending, (state) => {
            state.loadUserLoading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loadUserDone = true;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loadUserLoading = false;
                state.loadUserDone = true;
                state.loadUserError = action.payload;
            })
    }
})

export default userSlice.reducer;