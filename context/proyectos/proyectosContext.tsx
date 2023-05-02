import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { PB } from "../../utils";
import { sesionContext } from "../sesion/sesionContext";
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
  const { sesion } = useContext(sesionContext);

  const DataQuery = async () => {
    console.log(sesion.record.departamento);
    for (const depa of sesion.record.departamento) {
      const records: Proyecto[] = await PB.collection("proyectos").getFullList(200, {
        filter: `departamento="${depa}"`,
      });
      console.log(records, "aquii");
      setProyectos([...Proyectos, ...records]);
    }
  };

  useEffect(() => {
    if (!Proyectos.length) {
      DataQuery();
    }
  }, [sesion]);
  return (
    <proyectosContext.Provider
      value={{ List, setList, TaskList, setTaskList, Proyectos, setProyectos, TiposLista, setTiposLista }}
    >
      {children}
    </proyectosContext.Provider>
  );
};
