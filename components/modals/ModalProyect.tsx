import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Proyecto, RequestCreateProyecto } from "../../context/proyectos/proyectosInterface";
import { useForm, Controller } from "react-hook-form";
import { proyectosContext } from "../../context/proyectos/proyectosContext";
import { sesionContext } from "../../context/sesion/sesionContext";
import { PB } from "../../utils";
import Tooltip from "@mui/material/Tooltip";

interface Props {
    isOpen: boolean;
    setIsOpen: (e: boolean) => void;
    data: RequestCreateProyecto | Proyecto;
  }

function ModalProyect({ data, isOpen, setIsOpen }: Props) {
    const [IsUpdate, setIsUpdate] = useState<boolean>(false);
    const { sesion } = useContext(sesionContext);
    const { Proyectos,setProyectos } = useContext(proyectosContext);
    const [imagenes, setImagenes] = useState<any[]>([])
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
        
      } catch (error) {
        console.log(error);
        alert(error);
      }
    });

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
        <Box className=" max-w-none max-h-screen w-1/2 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute modal-box border-2 flex justify-center items-center ">
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
            <div className="h-1/6 flex gap-4 justify-end items-end ">
              <button className="btn btn-primary font-bold" type="submit">
                Crear
              </button>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModalProyect