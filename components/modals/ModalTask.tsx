import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { sesionContext } from "../../context/sesion/sesionContext";
import { RequestCreateTask, Task } from "../../interfaces/tasks";
import { PB } from "../../utils";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

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

  useEffect(() => {
    if (watch("departamento")) {
      consultarUsuario(watch("departamento"));
    }
  }, [watch("departamento")]);
  useEffect(() => {
    if (Departamentos.length) {
        setValue("departamento",Departamentos[0].id)
    }
  }, [Departamentos]);
  useEffect(() => {
    console.log(data);
    if(!data.lista){
        setValue("proyecto", data.proyecto);
        setValue("lista", data.lista);
        setValue("index", "0");
        setValue("usuario_creador", sesion.record.id);
    }
    if(data.lista){
        setValue("usuario_responsable", data.usuario_responsable)
    }
    console.log(watch("usuario_responsable"));
    if (isOpen) {
      departamentos();
    }
    if (!isOpen) {
      setUsuarios([]);
      reset();
    }
  }, [isOpen,data]);

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
        <Box className=" max-w-none max-h-screen w-1/2 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute modal-box border-0">
          <form
            action=""
            className=" h-5/6 flex flex-col gap-3 w-full justify-start items-center"
            onSubmit={onSubmitData}
          >
            <h3 className=" text-xl font-bold">Crear Tarea</h3>
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
              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Usuarios}
                onChange={(event, value) => setValue('usuario_responsable', value?.id ?? '')}
                renderInput={(params) => <TextField {...params} label="Responsable" />}
              /> */}
              <Controller
                name="usuario_responsable"
                key={"usuario_responsable"}
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                ( <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label" >Responsable</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Responsable"
                      className="w-full"
                      {...field}
                    >
                      {Usuarios.map((e,index) => (
                        <MenuItem key={index} value={e.id}>{e.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>)
                }
            />
            </div>
            <div className="h-1/6 flex gap-4 justify-end items-end">
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
