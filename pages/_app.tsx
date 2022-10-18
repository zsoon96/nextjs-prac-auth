import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {AuthContextProvider} from "../src/context/AuthContext";
import rootReducer from "../src/modules";
import {createStore} from "redux";
import {Provider} from 'react-redux';

const store = createStore(rootReducer)

// @ts-ignore
function MyApp({Component, pageProps}: AppProps) {

    return (
        // <Provider session={session}>
        <Provider store={store}>
            <AuthContextProvider>
                <Component {...pageProps} />
            </AuthContextProvider>
        </Provider>
        // </Provider>
    )
}

export default MyApp