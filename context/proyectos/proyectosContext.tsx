import { ReactNode, createContext, useContext, useState } from "react";
import { List, ProyectoContextProps, Task, Tasks } from "./proyectosInterface";

export const proyectosContext = createContext({} as ProyectoContextProps)

export const useProyecto = () => useContext(proyectosContext) 

interface Props {
    children: ReactNode
}

export const ProyectosContextProvider = ({children}:Props)  => {

    const [List, setList] = useState<List[]>([])
    const [TaskList,setTaskList] = useState<Task[]>([])
    const [Tasks,setTasks] = useState<Tasks>({})

    return (<proyectosContext.Provider value={{List, setList,TaskList,setTaskList,Tasks,setTasks}}> {children}</proyectosContext.Provider>)

}