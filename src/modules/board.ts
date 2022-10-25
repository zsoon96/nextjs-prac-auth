import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const loadBoard = createAsyncThunk('board/loadBoard', async (id) => {
    try {
        const res = await axios.get('http://localhost:3001/board')
        console.log('게시글 정보 조회', res.data)
    } catch (err) {
        console.log('응답 실패', err)
        return err
    }
})

// 게시글에 대한 타입 정의
interface Board {
    id: number
    title: string
    author: string
    regDate: string
}

// 리듀서에서 관리할 상태값 정의
interface BoardState {
    loadBoardLoading: boolean
    loadBoardDone: boolean
    loadBoardError: any
    board: Board[] | null
}

// 초기 상태값
const initialState: BoardState = {
    loadBoardLoading: false,
    loadBoardDone: false,
    loadBoardError: null,
    board: null
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadBoard.pending, (state) => {
                state.loadBoardLoading = true
            })
            .addCase(loadBoard.fulfilled, (state, action) => {
                state.loadBoardDone = true
                // @ts-ignore
                state.board = action.payload
            })
            .addCase(loadBoard.rejected, (state, action) => {
                state.loadBoardDone = true
                state.loadBoardLoading = false
                state.loadBoardError = action.payload
            })
    }
})

export default boardSlice.reducer