import { ReactNode, createContext, useContext, useState } from "react";
import { SesionContextProps } from "./sesionInterface";

export const sesionContext = createContext({} as SesionContextProps)

export const useSesion = () => useContext(sesionContext) 

interface Props {
    children: ReactNode
}

export const SesionContextProvider = ({children}:Props)  => {

    const [sesion, setSesion] = useState({})

    return (<sesionContext.Provider value={{sesion, setSesion}}> {children}</sesionContext.Provider>)

}