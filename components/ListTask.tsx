import React, { useEffect, useState,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import CardTask from "./CardTask";
import { ReactSortable} from "react-sortablejs";
import { proyectosContext } from "../context/proyectos/proyectosContext";
import { Task } from "../context/proyectos/proyectosInterface";


interface Props {
  title?: string;
  data: any;
  setTaskSelect: any;
}

function ListTask({ title = "TODO", data, setTaskSelect}: Props) {
  /* const [Tasks, setTasks] = useState<Task[]>([]); */
  const { TaskList } = useContext(proyectosContext);

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
    setTaskCopy(TaskList.filter(ele => ele.lista === data.id).sort((a,b) => Number(a.index) - Number(b.index)))
    console.log(TaskList.filter(ele => ele.lista === data.id).sort((a,b) => Number(a.index) - Number(b.index)),'aqui')
    console.log(TaskList);
  }, [TaskList]);


  return (
    <div className="flex overflow-x-hidden h-5/6 w-64 gap-3 flex-col items-center p-3 card bg-secondary " id={data.id}>
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
        {TaskCopy && TaskCopy.map((task: Task,index) => (
          <div id={task.id} key={index}>
            <CardTask Task={task} key={task.id} />
          </div>
        ))}
      </ReactSortable>
      {/* DAta */}
    </div>
  );
}

export default ListTask;
