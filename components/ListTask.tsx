import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import CardTask from "./CardTask";
import { ReactSortable } from "react-sortablejs";
import { proyectosContext } from "../context/proyectos/proyectosContext";
import Modal from "./Modal";
import ModalTask from "./modals/ModalTask";
import { List, RequestCreateTask, Task } from "../context/proyectos/proyectosInterface";
import Swal from "sweetalert2";
import { PB } from "../utils";
import Image from "next/image";

export const initialCreateTaskState: RequestCreateTask = {
  id: "",
  titulo: "",
  descripcion: "",
  fecha_init: new Date().toISOString(),
  departamento: "",
  usuario_creador: "",
  archivos: "",
  usuario_responsable: "",
  lista: "",
  fecha_fin: "",
  death_line: "",
  index: "0",
  proyecto: "",
  usuario_last_update: "",
};

interface Props {
  title?: string;
  data: List;
  setTaskSelect: any;
}

function ListTask({ title = "TODO", data, setTaskSelect }: Props) {
  const [IsOpenCreateTask, setIsOpenCreateTask] = useState<boolean>(false);
  const [toggler, setToggler] = useState(false);
  const [Imagen, setImagen] = useState<string>("");
  const [dataTask, setDataTask] = useState<RequestCreateTask | Task>(initialCreateTaskState);
  const { TaskList, List, setList, Proyectos } = useContext(proyectosContext);
  const [TaskCopy, setTaskCopy] = useState<Task[]>([]);

  const onChangeData = (newState: any) => {
    setTaskCopy(newState);
  };

  const createTask = (e: string) => {
    const list = List.find((ele) => ele.id === e) as List;
    const projec = Proyectos.find((ele) => ele.id === list.proyecto);
    console.log(list, 'LIST');
    const dataCopy = { ...initialCreateTaskState };
    if(projec && list){
      dataCopy.lista = list.id;
      dataCopy.proyecto = list.proyecto;
      dataCopy.departamento = projec.departamento;
      console.log(dataCopy, "dataCopy");
      setDataTask(dataCopy);
      setIsOpenCreateTask(true);
    }
  };

  const updateTask = (e: string) => {
    const task = TaskCopy.find((ele) => ele.id === e) as Task;
    setDataTask(task);
    setIsOpenCreateTask(true);
  };

  const deleteList = () => {
    Swal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      confirmButtonColor: "#80BC00",
      cancelButtonColor: "#F87272",
      customClass: {
        popup: "rounded-xl",
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-error",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const existeTask = TaskList.some((e) => e.lista === data.id);
        if (existeTask) {
          Swal.fire({
            title: "Esta lista tiene tareas",
            text: "no se puede eliminar la lista porque tiene tareas",
            icon: "error",
            confirmButtonColor: "#80BC00",
            customClass: {
              popup: "rounded-xl",
            },
          });

          return;
        }
        Swal.fire({
          title: "Listo!",
          icon: "success",
          confirmButtonColor: "#80BC00",
          customClass: {
            popup: "rounded-xl",
          },
        });
        const listCopy = [...List].filter((e) => e.id != data.id).map((value, index) => ({ ...value, index: index }));
        PB.collection("listas").delete(data.id);
        for (const element of listCopy) {
          await PB.collection("listas").update(element.id, element);
        }
        setList(listCopy);
      }
    });
  };

  const showImage = (e: string) => {
    setImagen(e);
    setTimeout(() => {
      setToggler(true);
    }, 100);
  };

  useEffect(() => {
    setTaskCopy(TaskList.filter((ele) => ele.lista === data.id).sort((a, b) => Number(a.index) - Number(b.index)));

    return () => {
      setTaskCopy([]);
    };
  }, [TaskList, List, data.id]);

  useEffect(() => {
    if (!toggler) {
      setTimeout(() => {
        setImagen("");
      }, 500);
    }
  }, [toggler]);

  return (
    <div className="flex overflow-x-hidden h-[90%] w-64 gap-3 flex-col items-center p-3 card bg-secondary" id={data.id}>
      <div className="w-full flex justify-between flex-row items-center z-10 sticky top-0 card bg-slate-100 pl-3">
        <h1 className="font-bold">{title}</h1>
        {/* <div
          onClick={() => createTask(data.id)}
          className="p-3 cursor-pointer active:scale-90 tooltip tooltip-left"
          data-tip="crear tarea"
        >
          <FontAwesomeIcon icon={faPlus} size={"xl"} />
        </div> */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost m-1">
            <FontAwesomeIcon icon={faEllipsisV} size={"xl"} />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
            <li>
              <div className="w-full flex justify-between " onClick={() => createTask(data.id)}>
                Crear Tarea <FontAwesomeIcon className=" text-green-600" icon={faPlus} size={"xl"} />
              </div>
            </li>
            <li>
              <div className="w-full flex justify-between " onClick={() => deleteList()}>
                Eliminar Lista <FontAwesomeIcon className=" text-red-600" icon={faTrash} size={"lg"} />
              </div>
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
        className="w-full h-full pb-3"
        group={{ name: "shared" }}
        onChange={(e: any) => setTaskSelect(e.item.id, e)}
      >
        {TaskCopy &&
          TaskCopy.map((task: Task, index) => (
            <div id={task.id} key={index}>
              <CardTask Task={task} key={task.id} updateTask={updateTask} showImage={showImage} />
            </div>
          ))}
      </ReactSortable>
      <ModalTask isOpen={IsOpenCreateTask} setIsOpen={setIsOpenCreateTask} data={dataTask} />
      <Modal isOpen={toggler} setIsOpen={setToggler}>
        <figure className="my-5 flex justify-center items-center">
          {/* <Image src={Imagen} alt={"que haces leyendo esto tonto"} className="static" fill /> */}
          <img src={Imagen} alt={"que haces leyendo esto tonto"} className="static object-fill" />
        </figure>
      </Modal>
    </div>
  );
}

export default ListTask;
