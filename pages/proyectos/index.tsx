import React, { useContext } from "react";
import ScreenContainer from "../../components/ScreenContainer";
import { useState, useEffect } from "react";
import { PB } from "../../utils";
import CardProyect from "../../components/CardProyect";
import { sesionContext } from "../../context/sesion/sesionContext";

function index() {
  const {sesion} = useContext(sesionContext)
  const [proyectos, setProyectos] = useState<any[]>([]);

  const DataQuery = async () => {
    const records = await PB.collection("proyectos").getFullList();
    console.log(records);
    setProyectos(records);
  };

  useEffect(() => {
    DataQuery();
  }, []);
  return (
    <ScreenContainer>
      <h1 className=" text-4xl font-bold mb-4">Proyectos</h1>
      <div className="flex overflow-y-hidden h-full gap-3 w-fit p-3">
        {proyectos.map((proyecto, index) => (
          <CardProyect proyect={proyecto} proyectIndex={index} />
        ))}
      </div>
    </ScreenContainer>
  );
}

export default index;
