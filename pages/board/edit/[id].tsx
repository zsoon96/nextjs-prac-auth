import {GetServerSideProps, GetServerSidePropsContext, GetStaticProps, InferGetStaticPropsType} from "next";
import BoardEdit from "../../../src/components/BoardEdit";
import {useRouter} from "next/router";

interface Board {
    id: number
    title: string
    author: string
    content: string
    regDate: string
}

// @ts-ignore
const BoardEditPage = ({id}: InferGetStaticPropsType<typeof GetStaticProps>) => {
    const router = useRouter()
    const {no} = router.query

    return <BoardEdit id={id} no={no}/>
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    console.log('ctx', context.params)

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