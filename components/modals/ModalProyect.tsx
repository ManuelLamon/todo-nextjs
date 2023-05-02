import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Proyecto, RequestCreateProyecto } from "../../context/proyectos/proyectosInterface";
import { useForm, Controller } from "react-hook-form";
import { proyectosContext } from "../../context/proyectos/proyectosContext";
import { sesionContext } from "../../context/sesion/sesionContext";
import { PB } from "../../utils";
import { RenderContext } from "../../context/render/renderContext";

interface Props {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  data: RequestCreateProyecto | Proyecto;
}

function ModalProyect({ data, isOpen, setIsOpen }: Props) {
  const [IsUpdate, setIsUpdate] = useState<boolean>(false);
  const { sesion } = useContext(sesionContext);
  const { Proyectos, setProyectos } = useContext(proyectosContext);
  const { setLoader } = useContext(RenderContext);
  const [estatus, setEstatus] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: data as RequestCreateProyecto,
  });
  const closeModal = () => {
    setIsOpen(false);
  };
  const onSubmitData = handleSubmit(async (formInfo) => {
    try {
      console.log(formInfo);
      setLoader(true);
      const record = (await PB.collection("proyectos").create(formInfo)) as Proyecto;
      setProyectos([...Proyectos, record]);
      setLoader(false);
      closeModal();
    } catch (error) {
      setLoader(false);
      console.log(error);
      alert(error);
    }
  });
  const consultaImg = async () => {
    const records = await PB.collection("archivos").getFullList();
    const img = records[Math.floor(Math.random() * records.length)];
    setValue("image", img.id);
  };
  const consultaDepartamento = async () => {
    const records = await PB.collection("departamentos").getFullList();
    const filter = [];
    for (const depa of sesion.record.departamento) {
      const ele = records.find((e) => e.id === depa);
      filter.push(ele);
    }
    console.log(filter);
    setDepartamentos(filter);
  };
  useEffect(() => {
    if (isOpen) {
      consultaImg();
      consultaDepartamento();
    } else {
      reset();
    }
  }, [isOpen]);

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
        <Box className=" top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute modal-box border-2 flex justify-center items-center ">
          <button
            onClick={() => closeModal()}
            className=" fixed z-90 top-0 right-0  w-10 h-10 flex justify-center items-center text-white text-xl btn btn-error"
          >
            X
          </button>
          <form
            action=""
            className="card-body flex flex-col gap-3 w-full justify-start items-center"
            onSubmit={onSubmitData}
          >
            <div className="w-full">
              <Controller
                name="name"
                key={"name"}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="titulo-input"
                    label="Titulo"
                    variant="outlined"
                    className="w-full"
                    inputProps={{
                      className: "border-transparent focus:border-transparent focus:ring-0 ",
                      maxLength: "30",
                    }}
                    {...field}
                    error={errors.name ? true : false}
                    helperText={errors.name && "Este campo es requerido"}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="description"
                key={"description"}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="description-input"
                    label="Descripcion"
                    variant="outlined"
                    multiline
                    rows={4}
                    className="w-full focus:border-0"
                    inputProps={{ className: "border-transparent focus:border-transparent focus:ring-0 " }}
                    {...field}
                    error={errors.description ? true : false}
                    helperText={errors.description && "Este campo es requerido"}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="departamento"
                key={"departamento"}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
                    <Select
                      labelId="departamento-input"
                      id="departamento-input"
                      label="Departamento"
                      className="w-full"
                      {...field}
                    >
                      {departamentos.map((e, index) => (
                        <MenuItem key={index} value={e.id}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
            <div className="h-1/6 flex gap-4 justify-end items-end ">
              <button className="btn btn-primary font-bold" type="submit">
                Crear
              </button>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalProyect;
