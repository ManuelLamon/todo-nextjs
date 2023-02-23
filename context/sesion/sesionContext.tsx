import { ReactNode, createContext, useContext, useState } from "react";
import { Sesion, SesionContextProps } from "./sesionInterface";

export const sesionContext = createContext({} as SesionContextProps);

export const useSesion = () => useContext(sesionContext);

interface Props {
  children: ReactNode;
}

export const SesionContextProvider = ({ children }: Props) => {
  const [sesion, setSesion] = useState<Sesion>({
    token:"",
    record:{
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
  }});

  return <sesionContext.Provider value={{ sesion, setSesion }}> {children}</sesionContext.Provider>;
};
