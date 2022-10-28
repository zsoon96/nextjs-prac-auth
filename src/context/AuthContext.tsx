import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {router} from "next/client";

// 현재 사용자의 인증상태를 추적하는 파일

// 인증 상태를 기본값으로 설정하는 AuthContext 구성요소
const AuthContext = createContext({
    user: null,
    login: () => Promise.resolve(),
    // logout: () => {
    // },
    isAuth: false
});

export type LoginParams = {
    email: string
    password: string
}

export type ErrCallbackType = (err: { [key: string]: string }) => void

// children: _app.js에서 인증 모듈에 적용된 페이지 및 컴포넌트들을 뜻함
// @ts-ignore
export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter()

    // const login = () => {
    //     axios.get('/api/isLogin').then((res) => {
    //         if (res.status === 200 && res.data.name) {
    //             // 로그인
    //             setUser(res.data.name)
    //             setIsAuth(true)
    //         } else {
    //             // 로그인 안됨
    //             router.push('/login')
    //         }
    //     })
    // }

    useEffect(() => {
        const initAuth = async ():Promise<void> => {
            const accessToken = window.localStorage.getItem('accessToken')

            if ( accessToken ) {
                setIsAuth(true)

                await axios.get('http://localhost:3001/auth/me', {headers: {Authorization: 'Bearer ' + accessToken}})
                    .then((res)=> {
                        console.log(res)
                        setUser({...res.data})
                    })
            } else {
                setIsAuth(false)
                window.localStorage.removeItem('accessToken')
            }
        }
        initAuth();
    }, [])

    const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
        await axios.post('http://localhost:3001/auth/login', params)
            .then(async res => {
                window.localStorage.setItem('accessToken', res.data.accessToken)

                // 모든 요청에 토큰 장착
                // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`
            })
            .then(()=>{
                axios.get('http://localhost:3001/auth/me', {
                    headers: {
                        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                    }
                })
                    .then(async res => {
                        console.log(res.data)
                        setUser({...res.data})
                        setIsAuth(true)


                        await router.push('/')
                    })
            })
            .catch(err => {
                if (errorCallback) errorCallback(err)
            })
    }

    const context = {user, isAuth, login: handleLogin};

    return (
        // user 정보 전달
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext