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
import ReactPaginate from "react-paginate";

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
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 12;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = Proyectos.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(Proyectos.length / 12);

  const createProyect = () => {
    setDataProyect(initialCreateProyecto);
    setIsOpenCreateProyect(true);
  };

  const updateProyect = (e: string) => {
    const proyect = Proyectos.find((ele) => ele.id === e) as Proyecto;
    setDataProyect(proyect);
    setIsOpenCreateProyect(true);
  };

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 12) % Proyectos.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  const sub = () => {
    PB.collection("proyectos").subscribe("*", function ({ record, action }) {
      if (record.usuario_last_update === sesion.record.id) {
        return;
      }
      if (!sesion.record.departamento.includes(record.departamento)) {
        return;
      }
      const data: any = record;

      if (action === "create") {
        setProyectos([...Proyectos, data]);
        return;
      }
      if (action === "delete") {
        setProyectos(Proyectos.filter((ele) => ele.id !== data.id));
        return;
      }
      if (action === "update") {
        setProyectos(Proyectos.map((ele) => (ele.id === data.id ? data : ele)));
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
      <div
        className="grid xl:grid-cols-4 md:grid-cols-2 xl:grid-rows-4 overflow-x-auto h-[95%] gap-3 w-full p-4 relative"
        style={{ gridAutoRows: "100px 100px 100px" }}
      >
        {!currentItems.length ? (
          <p>No tienes Proyectos creados</p>
        ) : (
          currentItems.map((proyecto, index) => <CardProyect proyect={proyecto} proyectIndex={index} key={index} />)
        )}
      </div>
      {pageCount > 1 ? (
        <ReactPaginate
          className="absolute bottom-4 left-1/2 btn-group"
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          nextClassName="btn"
          previousClassName="btn"
          pageClassName="btn"
          nextLinkClassName="h-full flex justify-center items-center"
          previousLinkClassName="h-full flex justify-center items-center"
          pageLinkClassName="h-full w-3 flex justify-center items-center"
          activeClassName="btn-active"
          nextLabel="Sig »"
          previousLabel="« Previo"
        />
      ) : null}
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
