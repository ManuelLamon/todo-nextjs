import { ReactNode, createContext, useContext, useState } from "react";
import { List, Proyecto, ProyectoContextProps, Task, Tasks, TipoLista } from "./proyectosInterface";

export const proyectosContext = createContext({} as ProyectoContextProps);

export const useProyecto = () => useContext(proyectosContext);

interface Props {
  children: ReactNode;
}

export const ProyectosContextProvider = ({ children }: Props) => {
  const [List, setList] = useState<List[]>([]);
  const [TaskList, setTaskList] = useState<Task[]>([]);
  const [Proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [TiposLista, setTiposLista] = useState<TipoLista[]>([]);

  return (
    <proyectosContext.Provider value={{ List, setList, TaskList, setTaskList, Proyectos, setProyectos,TiposLista,setTiposLista}}>
      {children}
    </proyectosContext.Provider>
  );
};
