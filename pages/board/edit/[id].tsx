import {GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import BoardEdit from "../../../src/components/BoardEdit";
import axios from "axios";
import Board from "../index";

interface Board  {
    id: number
    title: string
    author: string
    content: string
    regDate: string
}

// @ts-ignore
const BoardEditPage = ({ id } : InferGetStaticPropsType<typeof GetStaticProps>) => {
    return <BoardEdit id={id} />
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await axios.get('http://localhost:3001/board')
    const data: Board[] = await res.data

    const paths = data.map((board: Board) => ({
        params: { id: `${board.id}`}
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = ({ params }: GetStaticPropsContext) => {
    return {
        props: {
            id: params?.id
        }
    }
}

export default BoardEditPage