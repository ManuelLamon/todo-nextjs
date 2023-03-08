import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { PB } from "../../utils";
import ListTask from "../../components/ListTask";
import ScreenContainer from "../../components/ScreenContainer";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import { proyectosContext } from "../../context/proyectos/proyectosContext";
import { List, RequestCreateList, Task } from "../../context/proyectos/proyectosInterface";
import { sesionContext } from "../../context/sesion/sesionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalList from "../../components/modals/ModalList";

function array_move(arr: any[], old_index: number, new_index: number) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

export const initialCreateListState: RequestCreateList = {
  id:'',
  name:"",
  usuario_creador: "",
  index: "0",
  proyecto: "",
  usuario_last_update: "",
  tipo:""
};

function projectId() {
  const router = useRouter();
  const id = router.query.projectId;
  const { List, setList, TaskList, setTaskList } = useContext(proyectosContext);
  const [IsOpenCreateList, setIsOpenCreateList] = useState<boolean>(false)
  const { sesion } = useContext(sesionContext);
  const [dataList, setDataList] = useState<RequestCreateList | List>(initialCreateListState);
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
  };

  const handleTaskSelect = async (e: any, elementHtml: SortableEvent) => {
    try {
      const data = TaskList.find((ele) => ele.id === e) as Task;
      const dataFilter = TaskList.filter(
        (ele) => ele.id !== e && ele.lista === elementHtml.to.id
      ).sort((a, b) => Number(a.index) - Number(b.index));
      data.lista = elementHtml.to.id;
      data.index = elementHtml.newIndex as number;
      data.usuario_last_update = sesion.record.id;
      dataFilter.splice(Number(elementHtml.newIndex), 0, data);
      const dataIndex = dataFilter.map((value, index) => ({ ...value, index: index }));
      for (const element of dataIndex) {
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
      const dataFilter = List.filter((ele) => ele.id !== e).sort(
        (a, b) => Number(a.index) - Number(b.index)
      );
      data.index = elementHtml.newIndex as number;
      data.usuario_last_update = sesion.record.id;
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
      if (e.action === "create") {
        const data: Task[] = [...TaskList];
        data.unshift(e.record as any)
        let list = data.filter((ele) => ele.lista === e.record.lista);
        const dato = list.findIndex((ele) => ele.id === e.record.id);
        if (dato) {
          list = array_move(list, dato, Number(e.record.index)).map((value, index) => ({
            ...value,
            index: index,
          }));
        }
        for (const ele of list) {
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (ele.id === element.id) {
              data[i] = ele;
            }
          }
        }
        setTaskList(data);
        return;
      }
      if (e.action === "update") {
        console.log(e,'aqui');
        const data: Task[] = TaskList.map((task) => {
          if (task.id === e.record.id) {
            return e.record as any;
          }
          return task;
        });
        let list = data.filter((ele) => ele.lista === e.record.lista);
        const dato = list.findIndex((ele) => ele.id === e.record.id);
        if (dato) {
          list = array_move(list, dato, Number(e.record.index)).map((value, index) => ({
            ...value,
            index: index,
          }));
        }
        for (const ele of list) {
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (ele.id === element.id) {
              data[i] = ele;
            }
          }
        }
        setTaskList(data);
        return;
        
      }
    });
  };

  const unsubs = () => {
    PB.collection("tareas").unsubscribe();
  };

  const subList = () => {
    PB.collection("listas").subscribe("*", function (e) {
      if (e.record.usuario_last_update === sesion.record.id) {
        return;
      }
      if (e.action === "update") {
        setList(
          List.map((list) => {
            if (list.id === e.record.id) {
              return e.record as any;
            }
            return list;
          }).sort((a, b) => Number(a.index) - Number(b.index))
        );
        return;
      }
    });
  };

  const unsubsList = () => {
    PB.collection("listas").unsubscribe();
  };

  useEffect(() => {
    if (TaskList.length && List.length) {
      sub();
      subList();
    }
  }, [TaskList, List]);
  useEffect(() => {
    return () => {
      unsubs();
      unsubsList();
    };
  }, []);

  useEffect(() => {
    if (id) {
      DataQuery();
      setDataList({...dataList,proyecto:(id as string)})
    }
    return () => {
      setList([]);
      setTaskList([]);
    };
  }, [id]);

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
            <ListTask
              title={value.name}
              data={value}
              key={index + "asdcs"}
              setTaskSelect={handleTaskSelect}
            />
          ))}
        </ReactSortable>
      </div>
      <button
        data-tip="crear lista"
        onClick={() => setIsOpenCreateList(true)}
        className=" fixed z-90 bottom-4 right-5  w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-3xl btn btn-primary tooltip tooltip-left"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <ModalList data={dataList} isOpen={IsOpenCreateList} setIsOpen={setIsOpenCreateList}/>
    </ScreenContainer>
  );
}

export default projectId;
