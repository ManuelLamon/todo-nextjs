import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { sesionContext } from "../../context/sesion/sesionContext";
import { RequestCreateTask } from "../../interfaces/tasks";
import { PB } from "../../utils";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useDropzone } from "react-dropzone";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Task } from "../../context/proyectos/proyectosInterface";
import { proyectosContext } from "../../context/proyectos/proyectosContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  data: RequestCreateTask | Task;
}
type autocompleteItem = { label: string; id: string };

function ModalTask({ data, isOpen, setIsOpen }: Props) {
  const { sesion } = useContext(sesionContext);
  const { TaskList, setTaskList } = useContext(proyectosContext);
  const [Usuarios, setUsuarios] = useState<autocompleteItem[]>([]);
  const [Departamentos, setDepartamentos] = useState<any[]>([]);
  const [IsUpdate, setIsUpdate] = useState<boolean>(false);
  const [FileShow, setFileShow] = useState<string>("");
  const [File, setFile] = useState<File | null>(null);
  const consultarUsuario = async (depa: string) => {
    const data = await PB.collection("users").getFullList(200);
    const copy = data
      .filter((e) => {
        if (e.departamento.includes(depa)) {
          return e;
        }
      })
      .map((e) => ({ label: e.name, id: e.id }));
    setUsuarios(copy);
  };
  const departamentos = async () => {
    const datos: any[] = [];

    for (const id of sesion.record.departamento) {
      const records = await PB.collection("departamentos").getOne(id);
      if (records) {
        datos.push({ id: records.id, name: records.name });
      }
    }

    setDepartamentos(datos);
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: data as RequestCreateTask,
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmitData = handleSubmit(async (formInfo) => {
    try {
      console.log(formInfo);
      let formData;
      if(File){
        formData = new FormData()
        for (const key in data) {
          formData.append(key,(formInfo[key as keyof RequestCreateTask]))
          formData.getAll(key)
          /* if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            
          } */
        }
     
        formData.append('foto',(File as File))
      }else{
        formData = formInfo
      }

      if (!data.id) {
        console.log(data.id)
        console.log('crear')
        const record:Task = await PB.collection('tareas').create(formData)
        /* handleTaskSelect(record) */
      }else{
        console.log('actualizar')
       const record = await PB.collection('tareas').update(data.id,formData)
        const tareas: Task[] = TaskList.map((task) => {
          if (task.id === data.id) {
            return record as any;
          }
          return task;
        });
        setTaskList(tareas)
      }

      setIsOpen(false)

    } catch (error) {
      console.log(error);
      alert(error);
    }
  });

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log(acceptedFiles);
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);

    reader.addEventListener("load", (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        ctx?.getImageData(0, 0, img.width, img.height);

        const dataurl = canvas.toDataURL("image/webp", 0.5);
        setFileShow(dataurl);
        setFile(acceptedFiles[0]);
      };
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  /* const handleTaskSelect = async (e: Task) => {
    try {
      const dataFilter = TaskList.filter((ele) => ele.lista === e.lista)
      dataFilter.unshift(e)
      const dataIndex = dataFilter.map((value, index) => ({ ...value, index: index }));
      for (const element of dataIndex) {
        element.usuario_last_update = sesion.record.id;
        await PB.collection("tareas").update(element.id, element);
      }
      let copy = [...TaskList]
      for (const ele of dataIndex) {
        for (let i = 0; i < copy.length; i++) {
          if (copy[i].id === e.id) {
            copy[i] = ele;
          }
        }
      }
      setTaskList(copy)
    } catch (error) {
      alert(error);
    }
  }; */

  useEffect(() => {
    if (watch("departamento")) {
      consultarUsuario(watch("departamento"));
    }
  }, [watch("departamento")]);
  useEffect(() => {
    if (Departamentos.length) {
      setValue("departamento", Departamentos[0].id);
    }
  }, [Departamentos]);
  useEffect(() => {
    console.log(data);
    const { usuario_responsable, proyecto, lista, index, usuario_creador, descripcion, titulo, fecha_fin, fecha_init } =
      data;
    if (!data.id) {
      setValue("proyecto", proyecto);
      setValue("lista", lista);
      setValue("index", "0");
      setValue("usuario_creador", sesion.record.id);
    }
    if (data.id) {
      setIsUpdate(true);
      setValue("usuario_responsable", usuario_responsable);
      setValue("proyecto", proyecto);
      setValue("lista", lista);
      setValue("titulo", titulo);
      setValue("index", index.toString());
      setValue("usuario_last_update", sesion.record.id);
      setValue("usuario_creador", usuario_creador);
      setValue("descripcion", descripcion);
      setValue("fecha_fin", fecha_fin as string);
      setValue("fecha_init", fecha_init as string);
    }
    console.log(watch("usuario_responsable"));
    if (isOpen) {
      departamentos();
    }
    if (!isOpen) {
      setUsuarios([]);
      reset();
      setIsUpdate(false);
      setFileShow("");
      setFile(null);
    }
  }, [isOpen, data]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box className=" card card-compact max-w-none max-h-screen w-1/2 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute modal-box border-2 ">
          <button
            onClick={() => closeModal()}
            className=" fixed z-90 top-0 right-0  w-10 h-10 flex justify-center items-center text-white text-xl btn btn-error"
          >
            X
          </button>
          <h3 className=" card-title font-bold">{IsUpdate ? "Actualizar Tarea" : "Crear Tarea"}</h3>
          {!(data as Task).foto && !FileShow && (
            <div
              {...getRootProps({
                className:
                  "border-dashed border-2 min-h-[300px] rounded-lg flex justify-center items-center cursor-pointer text-lg font-bold",
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          )}

          {(data as Task).foto && (
            <div {...getRootProps()}>
              <figure className="my-5 rounded-lg min-h-[300px] relative">
                <div className="absolute opacity-0 hover:opacity-50 w-full h-full flex items-end cursor-pointer transition-all ease-in-out duration-300">
                  <div className="w-full h-full bg-black flex justify-center items-center">
                  <FontAwesomeIcon icon={faPen}/>
                  </div>
                </div>
                <img
                  src={`${process.env.API}/api/files/vnqo14u55d0vubr/${(data as Task).id}/${(data as Task).foto}`}
                  className="rounded-lg h-96 object-contain"
                />
                <input {...getInputProps()} />
              </figure>
            </div>
          )}
          {FileShow && (
            <figure className="my-5 rounded-lg min-h-[300px] ">
              <img src={FileShow} className="rounded-lg h-80" />
            </figure>
          )}
          <form
            action=""
            className="card-body flex flex-col gap-3 w-full justify-start items-center"
            onSubmit={onSubmitData}
          >
            <div className="w-full">
              <Controller
                name="titulo"
                key={"titulo"}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="titulo-input"
                    label="Titulo"
                    variant="outlined"
                    className="w-full"
                    inputProps={{ className: "border-transparent focus:border-transparent focus:ring-0 " , maxLength:"30"}}
                    {...field}
                    error={errors.titulo ? true : false}
                    helperText={errors.titulo && "Este campo es requerido"}
                  />
                )}
              />
            </div>
            <div className="w-full flex gap-3">
              <Controller
                name="descripcion"
                key={"descripcion"}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="descripcion-input"
                    label="Descripcion"
                    variant="outlined"
                    multiline
                    rows={4}
                    className="w-full focus:border-0"
                    inputProps={{ className: "border-transparent focus:border-transparent focus:ring-0 "}}
                    {...field}
                    error={errors.descripcion ? true : false}
                    helperText={errors.descripcion && "Este campo es requerido"}
                  />
                )}
              />
            </div>
            <div className="w-full flex gap-3">
              <div className=" w-1/2">
                <Controller
                  name="departamento"
                  key={"departamento"}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Departamentos</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Departamentos"
                        className="w-full"
                        {...field}
                      >
                        {Departamentos.map((e, index) => (
                          <MenuItem key={index} value={e.id}>
                            {e.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
              <div className=" w-1/2">
                <Controller
                  name="usuario_responsable"
                  key={"usuario_responsable"}
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Responsable</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Responsable"
                        className="w-full"
                        {...field}
                      >
                        {Usuarios.map((e, index) => (
                          <MenuItem key={index} value={e.id}>
                            {e.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex gap-3">
              <div className="w-1/2">
                <Controller
                  name="fecha_init"
                  key={"fecha_init"}
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      className="w-full"
                      minDate={moment()}
                      disabled={IsUpdate}
                      renderInput={(props) => <TextField {...props} />}
                      label="Fecha de Inicio"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="w-1/2">
                <Controller
                  name="fecha_fin"
                  key={"fecha_fin"}
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      className="w-full"
                      minDate={moment(watch("fecha_init"))}
                      disabled={IsUpdate}
                      renderInput={(props) => <TextField {...props} />}
                      label="Fecha de fin"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className="h-1/6 flex gap-4 justify-end items-end ">
              <button className="btn btn-primary font-bold" type="submit">
                Enviar
              </button>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalTask;
