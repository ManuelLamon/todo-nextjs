import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { PB } from "../../utils";
import { Task } from "../../interfaces/tasks";
import ListTask from "../../components/ListTask";
import ScreenContainer from "../../components/ScreenContainer";
import { ReactSortable,SortableEvent } from "react-sortablejs";
import { proyectosContext } from "../../context/proyectos/proyectosContext";
import { List } from "../../context/proyectos/proyectosInterface";

function projectId() {
  const router = useRouter();
  const id = router.query.projectId;
  const { List, setList, TaskList, setTaskList,Tasks,setTasks } = useContext(proyectosContext);
  const DataQuery = async () => {
    const records = (await PB.collection("listas").getFullList(200, {
      sort: "index",
      filter: `proyecto="${id}"`,
    })) as List[];
    const tasks = (await PB.collection("tareas").getFullList(200, {
      filter: `proyecto="${id}"`,
    })) as Task[];
    setTaskList(tasks);
    setList(records);

    const orderData:any = {}
    for (const lista of records) {
        orderData[lista.id] = []
    }
    for (const task of tasks) {
        orderData[task.lista].push(task)
    }

    setTasks(orderData)
  };

  const handleTaskSelect = async (e: any, elementHtml: SortableEvent) => {
    const data = TaskList.find((ele) => ele.id === e) as Task;
    const dataFilter = TaskList.filter((ele) => ele.id !== e && ele.lista === elementHtml.to.id).sort(
      (a, b) => Number(a.index) - Number(b.index)
    );
    console.log(elementHtml)
    data.lista = elementHtml.to.id;
    data.index = elementHtml.newIndex as number;
    dataFilter.splice(Number(elementHtml.newIndex), 0, data);
    for (const element of dataFilter) {
      await PB.collection("tareas").update(element.id, element);
    }
  };

  const handleListSelect = async (e: any, elementHtml: SortableEvent) => {
    const data = List.find((ele) => ele.id === e) as List;
    const dataFilter = List.filter((ele) => ele.id !== e).sort((a, b) => Number(a.index) - Number(b.index));
    data.index = elementHtml.newIndex as number;
    dataFilter.splice(Number(elementHtml.newIndex), 0, data);
    const dataIndex = dataFilter.map((value, index) => ({ ...value, index: index }));
    for (const element of dataIndex) {
      await PB.collection("listas").update(element.id, element);
    }
  };

  const sub = () => {
    PB.collection("tareas").subscribe("*", function (e) {
      console.log(e);
    });
  };

  const unsubs = () => {
    PB.collection("tareas").unsubscribe();
  };

  useEffect(() => {
    sub();
    return () => {
      unsubs();
    };
  }, []);

  useEffect(() => {
    DataQuery();
  }, []);

  return (
    <ScreenContainer>
      <h1 className=" text-4xl font-bold mb-4">Tareas</h1>
      <div className="">
        <ReactSortable
          list={List}
          setList={setList}
          animation={200}
          easing="ease-out"
          className="flex overflow-x-scroll h-screen overflow-y-hidden gap-3 w-fit"
          onChange={(e: any) => handleListSelect(e.item.id, e)}
        >
          {List.map((value: any, index) => (
            <ListTask title={value.nombre} data={value} key={value.id} id={value.id} setTaskSelect={handleTaskSelect} />
          ))}
        </ReactSortable>
      </div>
    </ScreenContainer>
  );
}

export default projectId;
