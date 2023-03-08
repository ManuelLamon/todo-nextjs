import { ReactNode, createContext, useContext, useState } from "react";
import { PB } from "../../utils";
import { Sesion, SesionContextProps } from "./sesionInterface";
import { useRouter } from "next/router";
import axios from "axios";
import { RenderContext } from "../render/renderContext";

export const sesionContext = createContext({} as SesionContextProps);

export const useSesion = () => useContext(sesionContext);

interface Props {
  children: ReactNode;
}

const initialSesionState = {
  token: "",
  record: {
    id: "",
    collectionId: "",
    collectionName: "",
    created: "",
    updated: "",
    username: "",
    verified: false,
    emailVisibility: false,
    email: "",
    name: "",
    avatar: "",
    departamento: [],
  },
}

export const SesionContextProvider = ({ children }: Props) => {
  const [sesion, setSesion] = useState<Sesion>(initialSesionState);
  const {setLoader} = useContext(RenderContext)
  const router = useRouter();

  const closeSesion = async () => {
    await axios.post('/api/auth/logout')
    PB.authStore.clear()
    setSesion(initialSesionState)
    setTimeout(() => {
      setLoader(false)
    }, 1000);
  }

  return <sesionContext.Provider value={{ sesion, setSesion,closeSesion }}> {children}</sesionContext.Provider>;
};
