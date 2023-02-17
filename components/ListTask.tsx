import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { PB } from "../utils";
import CardTask from "./CardTask";
import { ReactSortable } from "react-sortablejs";
import { Task } from "../interfaces/tasks";

interface Props {
  title?: string;
  data: any;
  setTaskSelect: any;
}

function ListTask({ title = "TODO", data, setTaskSelect }: Props) {
  const [Tasks, setTasks] = useState<Task[]>([]);

  const QueryTask = async () => {
    const records: any = await PB.collection("tareas").getFullList(200, {
      sort: "index",
      filter: `lista="${data.id}"`,
    });

    setTasks(records);
    console.log(records);
  };

  const onChangeData = (newState: any) => {
    setTasks(newState);
  };

  const updateChange = (e: any) => {
    console.log(e.item.id);
    console.log(Tasks);
    console.log(e);
    setTaskSelect(e.item.id,e)
  };

  const sub = () => {
    PB.collection("tareas").subscribe("*", function (e) {
      console.log(e);
    })
  } 
  const unsubs = () => {
    PB.collection("tareas").unsubscribe()
  }

  useEffect(() => {
    QueryTask();
    
    sub()
    
    return () => {
      unsubs()
    };

  }, []);

  return (
    <div className="flex overflow-x-hidden h-5/6 w-64 gap-3 flex-col items-center p-3 card bg-secondary ">
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
        list={Tasks}
        setList={onChangeData}
        animation={200}
        easing="ease-out"
        className="w-full h-full"
        group={ {name:"shared"}}
        onChange={(e: any) => setTaskSelect(e.item.id,e)}
      >
        {Tasks.map((task: Task, taskIndex) => (
          <div id={task.id}>
            <CardTask Task={task} taskIndex={taskIndex} key={task.id} />
          </div>
        ))}
      </ReactSortable>
      {/* DAta */}
    </div>
  );
}

export default ListTask;
