import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { UserProvider } from '../context/UserContext';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <UserProvider><Component {...pageProps} /></UserProvider>
}

export default MyApp
