import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {setToken} from '../config/TokenManager'

// 현재 사용자의 인증상태를 추적하는 파일

// 인증 상태를 기본값으로 설정하는 AuthContext 구성요소
const AuthContext = createContext({
    user: null,
    login: () => Promise.resolve(),
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
    const currentUrl = router.asPath
    const { returnUrl } = router.query

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
                    .catch(() => {
                        window.localStorage.removeItem('accessToken')
                        setUser(null)
                        setIsAuth(false)
                    })
            } else {
                setIsAuth(false)
                // 로그인이 안되어있다면 접근 페이지 경로 정보와 함께 로그인 페이지로 이동
                await router.replace(`/login/?returnUrl=${currentUrl}`)
            }
        }
        initAuth();
    }, [])

    const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
        await axios.post('http://localhost:3001/auth/login', params)
            .then(async res => {
                window.localStorage.setItem('accessToken', res.data.accessToken)

                // 받은 엑세스 토큰 쿠키에 저장
                setToken(res.data.accessToken)
            })
            .then(()=>{
                axios.get('http://localhost:3001/auth/me')
                    .then(async res => {
                        console.log(res.data)
                        setUser({...res.data})
                        setIsAuth(true)

                        // 로그인 성공 시, 접근했던 페이지로 이동 처리
                        if(router.query.returnUrl) {
                            await router.replace(returnUrl as string)
                        } else {
                            await router.push('/')
                        }
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