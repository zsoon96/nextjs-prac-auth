import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType
} from "next";
import BoardEdit from "../../../src/components/BoardEdit";
import axios from "axios";
import Board from "../index";
import {AppContext} from "next/app";
import context from "react-redux/src/components/Context";

interface Board {
    id: number
    title: string
    author: string
    content: string
    regDate: string
}

// @ts-ignore
const BoardEditPage = ({id}: InferGetStaticPropsType<typeof GetStaticProps>) => {
    return <BoardEdit id={id}/>
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    // console.log('ctx', context.params)

    const params = context.params

    return {
        props: {
            id: params?.id
        }
    }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//     const res = await axios.get('http://localhost:3001/board')
//     const data: Board[] = await res.data
//
//     const paths = data.map((board: Board) => ({
//         params: { id: `${board.id}`}
//     }))
//
//     return {
//         paths,
//         fallback: false
//     }
// }
//
// export const getStaticProps: GetStaticProps = ({ params }: GetStaticPropsContext) => {
//     return {
//         props: {
//             id: params?.id
//         }
//     }
// }

export default BoardEditPage