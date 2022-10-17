import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {AuthContextProvider} from "../src/context/AuthContext";

// @ts-ignore
function MyApp({ Component, pageProps }: AppProps) {

  return (
    // <Provider session={session}>
      <AuthContextProvider>
          <Component {...pageProps} />
      </AuthContextProvider>
    // </Provider>
  )
}
export default MyApp