import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { List, RequestCreateList, TipoLista } from "../../context/proyectos/proyectosInterface";
import { useForm, Controller } from "react-hook-form";
import { proyectosContext } from "../../context/proyectos/proyectosContext";
import { sesionContext } from "../../context/sesion/sesionContext";
import { PB } from "../../utils";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  data: RequestCreateList | List;
}

function ModalList({ data, isOpen, setIsOpen }: Props) {
  const [IsUpdate, setIsUpdate] = useState<boolean>(false);
  const { sesion } = useContext(sesionContext);
  const { List, setList, TiposLista, setTiposLista } = useContext(proyectosContext);
  const [TipoList, setTipoList] = useState<any[]>([])

  const closeModal = () => {
    setIsOpen(false);
  };
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: data as RequestCreateList,
  });

  const queryTiposLista = async () => {
    try {
      const records: TipoLista[] = await PB.collection("tipo_lista").getFullList();
      setTipoList(records)
      for (const item of List) {
        for (const tipe of records) {
          if (tipe.id !== "evcwxmojxt0dr1x") {
            if (item.tipo === tipe.id) {
              const index = records.indexOf(tipe);
              records.splice(index, 1);
            }
          }
        }
      }
      setTiposLista(records);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const onSubmitData = handleSubmit(async (formInfo) => {
    try {
      console.log(formInfo);

      const records: List = await PB.collection("listas").create(formInfo);
      console.log(records);
      const copy = [...List];
      copy.push(records);
      setList(copy);
      setIsOpen(false);
      
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });
  useEffect(() => {
    if (List.length) {
        setValue("index", List.length.toString());
    }
  }, [List]);

  useEffect(() => {
    console.log(data,'ModalList');
    const { proyecto, departamento} = data;
    if (!data.id) {
      setValue("usuario_creador", sesion.record.id);
    }
    if (data.id) {
      setIsUpdate(true);
    }
    if (isOpen) {
      setValue("proyecto", proyecto);
      setValue("departamento", departamento);
      queryTiposLista();
    }
    if (!isOpen) {
      reset();
      setIsUpdate(false);
      setTiposLista([])
    }
  }, [isOpen, data]);

  useEffect(() => {
    if(watch('tipo')){
        if(watch('tipo') !== "evcwxmojxt0dr1x"){
            const tipo = TipoList.find( e => e.id === watch('tipo') )
            setValue('name',tipo.name)
        }else{
            setValue('name','')
        }    
    }
   
  }, [watch('tipo')])
  

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
            <div className={watch('tipo') !== "evcwxmojxt0dr1x" ? "w-full animate__animated animate__faster animate__fadeOut" : "w-full animate__animated animate__faster  animate__fadeIn" }>
              <Controller
                name="name"
                key={"name"}
                control={control}
                rules={{ required: watch('tipo') === "evcwxmojxt0dr1x" }}
                render={({ field }) => (
                  <TextField
                    id="titulo-input"
                    label="Titulo"
                    variant="outlined"
                    className="w-full"
                    disabled={ watch('tipo') !== "evcwxmojxt0dr1x"}
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
            <div className="w-full flex gap-3">
              <Controller
                name="tipo"
                key={"tipo"}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Tipo"
                      className="w-full"
                      {...field}
                    >
                      {TiposLista.map((e: TipoLista, index: number) => (
                        <MenuItem key={index} value={e.id}>
                          <Tooltip title={e.descripcion} placement="top">
                            <p className=" w-full">{e.name}</p>
                          </Tooltip>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
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

export default ModalList;
