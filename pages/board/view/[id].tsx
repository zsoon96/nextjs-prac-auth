import BoardInfo from "../../../src/components/BoardInfo";
import axios from "axios";
import {useRouter} from "next/router";

interface Board {
    id: number,
    title: string,
    author: string,
    content: string,
    regDate: string
}

// board는 getServerSideProps에서 조회해서 받은 정보
const BoardDetail = ({board}: any) => {
    const router = useRouter()
    const {no}: any = router.query

    // url의 id값으로 비동기 통신 요청 시도 1 - useEffect로 데이터를 가져오면 network error 발생
    // useEffect( () => {
    //     axios.get(`http://loacalhost:3001/board/${id}`)
    //         .then((res) => {
    //             console.log('게시글 정보', res.data)
    //             setData(res.data)
    //         })
    // },[id])

    return (
        <>
            {board && (
                <>
                    <BoardInfo board={board} no={no}/>
                </>
            )}
        </>
    )
}

// 데이터 받아오기 위한 SSR
export async function getServerSideProps({params}: any) {
    // const id = context.query.id
    const id = params.id
    // console.log('id', id)
    const board: Board = await (await axios.get(`http://localhost:3001/board/${id}`)).data;
    return {
        props: {board},
    };
}

// url의 id값으로 비동기 통신 요청 시도 2 - getServerSideProps를 아래와 같이 사용하면 'getaddrinfo ENOTFOUND loacalhost' error 발생
// export const getServerSideProps: GetServerSideProps = async (context) => {
//     try {
//         const board = await axios.get(`http://loacalhost:3001/board/${context.query.id}`)
//             .then((res) => res.data.json())
//             .catch((err) => console.log(err))
//
//         return {
//             props: { board }
//         }
//     } catch (err) {
//         console.log(err)
//         return {
//             props: { }
//         }
//     }
// }

// url의 id값으로 비동기 통신 요청 시도 3 - 아래 getStaticPaths + getStaticProps로 같이 쓰면 페이지 이동 자체가 안됨
// export const getStaticPaths: GetStaticPaths = async () => {
//     const res = await axios.get('http://localhost:3001/board')
//     console.log(res)
//     const boards: Board[] = await res.data
//
//     const paths = boards.map((board: Board) => ({
//         params: { id: `${board.id}` }
//     }))
//
//     return {
//         paths,
//         fallback: false
//     }
// }

// export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
//     const res = await axios.get(`http://loacalhost:3001/board/${params}`)
//     const board: Board[] = res.data
//
//     return {
//         props: {
//             board,
//             id: params?.id
//         }
//     }
// }

export default BoardDetail