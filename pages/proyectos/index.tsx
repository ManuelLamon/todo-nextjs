import ScreenContainer from "../../components/ScreenContainer";
import { useState, useEffect, useContext } from "react";
import { PB } from "../../utils";
import CardProyect from "../../components/CardProyect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { sesionContext } from "../../context/sesion/sesionContext";
import { proyectosContext } from "../../context/proyectos/proyectosContext";
import { Proyecto, RequestCreateProyecto } from "../../context/proyectos/proyectosInterface";
import ModalProyect from "../../components/modals/ModalProyect";

export const initialCreateProyecto = {
  name: "",
  estatus: "tgconbjd55q2stw",
  departamento: "",
  description: "",
  image: "",
};

function Index() {
  const [dataProyect, setDataProyect] = useState<RequestCreateProyecto | Proyecto>(initialCreateProyecto);
  const [IsOpenCreateProyect, setIsOpenCreateProyect] = useState<boolean>(false);
  const { Proyectos, setProyectos } = useContext(proyectosContext);
  const { sesion } = useContext(sesionContext);

  const createProyect = () => {
    setDataProyect(initialCreateProyecto);
    setIsOpenCreateProyect(true);
  };

  const updateProyect = (e: string) => {
    const proyect = Proyectos.find((ele) => ele.id === e) as Proyecto;
    setDataProyect(proyect);
    setIsOpenCreateProyect(true);
  };

  const sub = () => {
    PB.collection("proyectos").subscribe("*", function (e) {
      if (e.record.usuario_last_update === sesion.record.id) {
        return;
      }
      if (!sesion.record.departamento.includes(e.record.departamento)) {
        return;
      }

      if (e.action === "create") {
        return;
      }
      if (e.action === "delete") {
        return;
      }
      if (e.action === "update") {
        return;
      }
    });
  };

  const unsubs = () => {
    PB.collection("proyectos").unsubscribe();
  };

  useEffect(() => {
    if (Proyectos.length) {
      sub();
    }
  }, [Proyectos]);

  useEffect(() => {
    return () => {
      unsubs();
    };
  }, []);
  return (
    <ScreenContainer>
      <h1 className=" text-4xl font-bold mb-4">Proyectos</h1>
      <div className="flex overflow-y-hidden h-full gap-3 w-fit p-3">
        {!Proyectos.length && <p>No tienes Proyectos creados</p>}
        {Proyectos.map((proyecto, index) => (
          <CardProyect proyect={proyecto} proyectIndex={index} key={index} />
        ))}
      </div>
      <button
        title="crear-proyecto"
        onClick={() => createProyect()}
        data-tip="crear proyecto"
        className=" fixed z-90 bottom-4 right-5  w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-3xl btn btn-primary tooltip  tooltip-left"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <ModalProyect data={dataProyect} isOpen={IsOpenCreateProyect} setIsOpen={setIsOpenCreateProyect} />
    </ScreenContainer>
  );
}

export default Index;
