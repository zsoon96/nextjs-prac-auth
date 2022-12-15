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

// 동적라우팅 데이터 페칭 방법 정리
// 1. CSR > router.query로 id값 추출 후 props로 넘겨서 csr로 페칭하는 방법
// 2. SSR > router.query로 id값 추출 후 getServerSideProps에서 ssr로 페칭까지 하고 id와 data를 props로 넘기는 방법
// 3. SSG > getStaticPaths를 통해 동적라우팅할 paths 범위 지정 후 params로 전달, getStaticProps를 통해 id값을 추출 후, props로 넘겨서 crs로 페칭하는 방법

// SSG vs SSR
// SSG : 정적 생성된 정보를 각 요청에 동일한 정보로 반환하는 경우에 사용 / 빌드 시 사전에 API 요청을 통해 데이터를 담고, 데이터가 담긴 HTML을 생성
// SSR : 사용자의 요청마다 동적으로 페이지를 생성해 다른 내용을 보여주어야 하는 경우에 사용

// board는 getServerSideProps에서 조회해서 받은 정보
const BoardDetail = ({board}: any) => {
    const router = useRouter()
    // 요청 url에서 받아온 id 값 추출 후, props로 전달
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