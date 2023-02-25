import { ReactNode, createContext, useContext, useState } from "react";
import { PB } from "../../utils";
import { Sesion, SesionContextProps } from "./sesionInterface";
import { useRouter } from "next/router";
import axios from "axios";

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
  const router = useRouter();

  const closeSesion = async () => {
    router.push("/login");
    await axios.post('/api/auth/logout')
    PB.authStore.clear()
    setSesion(initialSesionState)
  }

  return <sesionContext.Provider value={{ sesion, setSesion,closeSesion }}> {children}</sesionContext.Provider>;
};
