import React, { useEffect, useState,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { PB } from "../utils";
import CardTask from "./CardTask";
import { ReactSortable } from "react-sortablejs";
import { Task } from "../interfaces/tasks";
import { proyectosContext } from "../context/proyectos/proyectosContext";

interface Props {
  title?: string;
  data: any;
  setTaskSelect: any;
  id:any;
}

function ListTask({ title = "TODO", data, setTaskSelect,id }: Props) {
  /* const [Tasks, setTasks] = useState<Task[]>([]); */
  const { Tasks,setTasks } = useContext(proyectosContext);

  const [TaskCopy, setTaskCopy] = useState<Task[]>([])

/*   const QueryTask = async () => {
    const records: any = await PB.collection("tareas").getFullList(200, {
      sort: "index",
      filter: `lista="${data.id}"`,
    });

  }; */

  const onChangeData = (newState: any) => {
    setTaskCopy(newState)
  };

  useEffect(() => {
    /* QueryTask(); */
    setTaskCopy(Tasks[id])
  }, []);

  useEffect(() => {
    if(TaskCopy){
      setTasks({...Tasks, [id]:TaskCopy})
      console.log({...Tasks, [id]:TaskCopy})
    }
  }, [TaskCopy]);

  return (
    <div className="flex overflow-x-hidden h-5/6 w-64 gap-3 flex-col items-center p-3 card bg-secondary " id={id}>
      <div className="w-full flex justify-between flex-row items-center z-10 sticky top-0 card bg-slate-100 pl-3">
        <h1 className="font-bold">{title}</h1>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost m-1">
            <FontAwesomeIcon icon={faEllipsisV} size={"xl"} />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
      <ReactSortable
        id={data.id}
        list={TaskCopy}
        setList={onChangeData}
        animation={200}
        easing="ease-out"
        className="w-full h-full"
        group={ {name:"shared"}}
        onChange={(e: any) => setTaskSelect(e.item.id,e)}
      >
        {TaskCopy && TaskCopy.map((task: Task) => (
          <div id={task.id}>
            <CardTask Task={task} key={task.id} />
          </div>
        ))}
      </ReactSortable>
      {/* DAta */}
    </div>
  );
}

export default ListTask;
