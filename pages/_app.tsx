import { SesionContextProvider } from '../context/sesion/sesionContext'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <SesionContextProvider> <Component {...pageProps} /> </SesionContextProvider> 
}
