import React, { ReactNode, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { sesionContext } from "../context/sesion/sesionContext";
import { useRouter } from "next/router";
import { RenderContext } from "../context/render/renderContext";
interface Props {
  children: ReactNode;
}

function ScreenContainer({ children }: Props) {
    const {sesion, setSesion} = useContext(sesionContext)
    const {loader,setLoader} = useContext(RenderContext)
    const router = useRouter();
  useEffect(() => {
    if(typeof document != 'undefined' ){
        if(!sesion.record.id){
            const dataSesion = localStorage.getItem('pocketbase_auth')
            if(dataSesion){
                setSesion({token:JSON.parse(dataSesion).token, record:JSON.parse(dataSesion).model})
            }else{
                router.push("/login");
            }
        }
    }
  }, [sesion]);

  useEffect(() => {
    const handleStart = (url:any) => (url !== router.asPath) && (setLoader(true));
    const handleComplete = (url:any) => (url === router.asPath) && setTimeout(() =>{setLoader(false)},500);
    
    router.events.on('routeChangeStart', (url) => handleStart(url))
    router.events.on('routeChangeComplete', (url) => handleComplete(url))
    router.events.on('routeChangeError', (url) => handleComplete(url))

    setTimeout(() => {
      setLoader(false)
    }, 1000);
    return () => {
      router.events.off('routeChangeStart', (url) => handleStart(url))
      router.events.off('routeChangeComplete', (url) => handleComplete(url))
      router.events.off('routeChangeError', (url) => handleComplete(url))
      setTimeout(() => {
        setLoader(false)
      }, 1000);
    }
  }, [loader,router.events]);

  return (
    <div>
      <Sidebar />
      <div className="flex flex-col h-screen w-full pl-20 ">
        {/* <Navbar/> */}
        <div className="h-screen p-4 overflow-y-hidden">{children}</div>
      </div>
    </div>
  );
}

export default ScreenContainer;
