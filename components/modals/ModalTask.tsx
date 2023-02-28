import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { sesionContext } from "../../context/sesion/sesionContext";
import { RequestCreateTask, Task } from "../../interfaces/tasks";
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
  const [Usuarios, setUsuarios] = useState<autocompleteItem[]>([]);
  const [Departamentos, setDepartamentos] = useState<any[]>([]);
  const [IsUpdate, setIsUpdate] = useState<boolean>(false);
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

  const onSubmitData = handleSubmit(async (data) => {
    try {
      console.log(data);
      /* await axios.post("/api/auth/login", { usernameOREmail: data.email, password: data.password });
      const authData: Sesion = await PB.collection("users").authWithPassword(
        data.email,
        data.password
      );
      console.log(authData);
      setSesion(authData);
      router.push("/proyectos"); */
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
    if (!data.lista) {
      setValue("proyecto", data.proyecto);
      setValue("lista", data.lista);
      setValue("index", "0");
      setValue("usuario_creador", sesion.record.id);
    }
    if (data.lista) {
      const { usuario_responsable, proyecto, lista, index, usuario_creador, descripcion } = data;
      setIsUpdate(true);
      setValue("usuario_responsable", usuario_responsable);
      setValue("proyecto", proyecto);
      setValue("lista", lista);
      setValue("index", index.toString());
      setValue("usuario_last_update", sesion.record.id);
      setValue("usuario_creador", usuario_creador);
      setValue("descripcion", descripcion);
    }
    console.log(watch("usuario_responsable"));
    if (isOpen) {
      departamentos();
    }
    if (!isOpen) {
      setUsuarios([]);
      reset();
      setIsUpdate(false);
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
          <h3 className=" card-title font-bold">{IsUpdate ? "Actualizar Tarea" : "Crear Tarea"}</h3>
          {!(data as Task).foto && (
            <div
              {...getRootProps({
                className:
                  "border-dashed border-2 min-h-[300px] rounded-lg flex justify-center items-center cursor-pointer text-lg font-bold",
              })}
            >
              <input {...getInputProps({ className: " " })} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          )}

          {(data as Task).foto && (
            <figure className="my-5 rounded-lg shadow-md min-h-[300px]">
              <img
                src={`${process.env.API}/api/files/vnqo14u55d0vubr/${(data as Task).id}/${(data as Task).foto}`}
                className="rounded-lg"
              />
            </figure>
          )}
          <form
            action=""
            className="card-body flex flex-col gap-3 w-full justify-start items-center"
            onSubmit={onSubmitData}
          >
            <div className="w-full">
              <Controller
                name="departamento"
                key={"departamento"}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Titulo</InputLabel>
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
            <div className="w-full flex gap-3">
              <Controller
                name="descripcion"
                key={"descripcion"}
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
                  rules={{ required: true }}
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
                  rules={{ required: true }}
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
                  rules={{ required: true }}
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
