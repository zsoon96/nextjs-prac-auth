import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import board from "../../pages/board";

export const loadBoard = createAsyncThunk('board/loadBoard', async () => {
    try {
        const res = await axios.get('http://localhost:3001/board', {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
            }
        })
        console.log('게시글 정보 조회', res.data)
        return res.data
    } catch (err) {
        console.log('응답 실패', err)
        return err
    }
})

// export const addBoard = createAction('board/addBoard')

// 게시글에 대한 타입 정의
interface Board  {
    id: number
    title: string
    author: string
    content: string
    regDate: string
}

// export type Index = {
//     id: number,
//     title: string,
//     author: string,
//     content: string,
//     regDate: string
// }

// 리듀서에서 관리할 상태값 정의
interface BoardState {
    loadBoardLoading: boolean
    loadBoardDone: boolean
    loadBoardError: any
    board: Board[]
}

// 초기 상태값
const initialState: BoardState = {
    loadBoardLoading: false,
    loadBoardDone: false,
    loadBoardError: null,
    board: []
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addBoard: (state: BoardState, action: PayloadAction<Board>) => {
            // console.log('액션 함수 실행', action.payload)
            // 기존 state 배열에 새 객체 추가
            state.board =[...state.board, {
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content,
                author: action.payload.author,
                regDate: action.payload.regDate
            } ]
        },
        editBoard: (state: BoardState, action: PayloadAction<Board>) => {
            // console.log('액션 함수 실행', action.payload)
            const {title, content, author, regDate} = action.payload
            // 기존 state 배열에서 반복문을 통해 액션에 담겨온 게시글 id와 기존 id(idx+1)와 일치하면 객체 수정
            state.board = state.board.map((b, idx) => {
                if (idx + 1 === action.payload.id) {
                    return {...b, title: title, content: content, author: author, regDate: regDate}
                } else {
                    return b
                }
            })
        },
        removeBoard: (state:BoardState, action: PayloadAction<Board>) => {
            console.log('gg', action.payload)
            state.board = state.board.filter((b, idx) => {
                return action.payload.id !== idx + 1
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadBoard.pending, (state) => {
                state.loadBoardLoading = true
            })
            .addCase(loadBoard.fulfilled, (state, action) => {
                state.loadBoardDone = true
                state.board = action.payload
                // console.log('action', action.payload)
            })
            .addCase(loadBoard.rejected, (state, action) => {
                state.loadBoardDone = true
                state.loadBoardLoading = false
                state.loadBoardError = action.payload
            })
    }
})

export const { addBoard, editBoard, removeBoard } = boardSlice.actions

export default boardSlice.reducer