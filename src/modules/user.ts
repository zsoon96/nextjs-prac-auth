import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://reqres.in/"

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

interface User {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

interface UserState {
    val: number,
    loadUserLoading: boolean,
    loadUserDone: boolean,
    loadUserError: any,
    user: User | null
}

const initialState: UserState = {
    val: 0,
    loadUserLoading: false,
    loadUserDone: false,
    loadUserError: null,
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},

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

export default userSlice.reducer