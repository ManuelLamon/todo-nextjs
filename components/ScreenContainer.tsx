import React, { ReactNode, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { sesionContext } from "../context/sesion/sesionContext";
import { useRouter } from "next/router";
interface Props {
  children: ReactNode;
}

function ScreenContainer({ children }: Props) {
    const {sesion, setSesion} = useContext(sesionContext)
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
