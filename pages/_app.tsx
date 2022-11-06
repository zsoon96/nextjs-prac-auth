import '../styles/globals.css'
import type {AppContext, AppProps} from 'next/app'
import {AuthContextProvider} from "../src/context/AuthContext";
import {Provider} from 'react-redux';
import store from '../src/modules/store'
import App from "next/app";
import cookies from 'next-cookies';
import {setToken} from "../src/config/TokenManager";


// const store = createStore(rootReducer)

// @ts-ignore
function MyApp({Component, pageProps}: AppProps) {

    return (
        // <Provider session={session}>
        // 리덕스 적용
        <Provider store={store}>
            <AuthContextProvider>
                <Component {...pageProps} />
            </AuthContextProvider>
        </Provider>
        // </Provider>
    )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps:any = await App.getInitialProps(appContext)

    const {ctx} = appContext;
    // ctx 안에 있는 req에서 쿠키 값 꺼내기
    // const cookieReq = ctx.req ? ctx.req.headers.cookie : null
    const cookie = cookies(ctx)
    const accessToken = cookie['token']
    if (accessToken !== undefined) {
        setToken(accessToken)
    }

    return {...appProps}
}

export default MyApp