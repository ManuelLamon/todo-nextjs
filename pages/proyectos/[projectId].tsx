import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { PB } from "../../utils";
import ListTask from "../../components/ListTask";
import ScreenContainer from "../../components/ScreenContainer";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import { proyectosContext } from "../../context/proyectos/proyectosContext";
import { List, Task } from "../../context/proyectos/proyectosInterface";
import { sesionContext } from "../../context/sesion/sesionContext";

function projectId() {
  const router = useRouter();
  const id = router.query.projectId;
  const { List, setList, TaskList, setTaskList, Tasks, setTasks } = useContext(proyectosContext);
  const { sesion } = useContext(sesionContext);
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

    const orderData: any = {};
    for (const lista of records) {
      orderData[lista.id] = [];
    }
    for (const task of tasks) {
      orderData[task.lista].push(task);
    }
    setTasks(orderData);
  };

  const handleTaskSelect = async (e: any, elementHtml: SortableEvent) => {
    try {
      const data = TaskList.find((ele) => ele.id === e) as Task;
      const dataFilter = TaskList.filter((ele) => ele.id !== e && ele.lista === elementHtml.to.id).sort(
        (a, b) => Number(a.index) - Number(b.index)
      );
      data.lista = elementHtml.to.id;
      data.index = elementHtml.newIndex as number;
      data.usuario_last_update = sesion.record.id;
      dataFilter.splice(Number(elementHtml.newIndex), 0, data);
      for (const element of dataFilter) {
        element.usuario_last_update = sesion.record.id;
        await PB.collection("tareas").update(element.id, element);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleListSelect = async (e: any, elementHtml: SortableEvent) => {
    try {
      const data = List.find((ele) => ele.id === e) as List;
      const dataFilter = List.filter((ele) => ele.id !== e).sort((a, b) => Number(a.index) - Number(b.index));
      data.index = elementHtml.newIndex as number;
      dataFilter.splice(Number(elementHtml.newIndex), 0, data);
      const dataIndex = dataFilter.map((value, index) => ({ ...value, index: index }));
      for (const element of dataIndex) {
        await PB.collection("listas").update(element.id, element);
      }
    } catch (error) {
      alert(error);
    }
  };

  const sub = () => {
    PB.collection("tareas").subscribe("*", function (e) {
      if (e.record.usuario_last_update === sesion.record.id) {
        return;
      }
       else{
        if (e.action === 'update') {
          setTaskList(
            TaskList.map((task) => {
              if (task.id === e.record.id) {
                return (e.record as any) ;
              }
              return task;
            })
          );
          return;
        }
      }
    });
  };

  const unsubs = () => {
    PB.collection("tareas").unsubscribe();
  };

  useEffect(() => {
    if (TaskList.length && List.length && sesion.record.id) {
      sub();
      return () => {
        unsubs();
      };
    }
  }, [TaskList, List, sesion]);

  useEffect(() => {
    DataQuery();
    if (!sesion.record.id) {
      router.push("/login");
    }
  }, [sesion]);

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
            <ListTask title={value.nombre} data={value} key={index + "asdcs"} setTaskSelect={handleTaskSelect} />
          ))}
        </ReactSortable>
      </div>
    </ScreenContainer>
  );
}

export default projectId;
