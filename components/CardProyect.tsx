import React, { useEffect, useState } from "react";
import { PB } from "../utils";
import Link from "next/link";

interface Props {
  proyect: any;
  proyectIndex: number;
}

function CardProyect({ proyect }: Props) {
  const [Url, setUrl] = useState("");

  const queryImage = async () => {
    const records: any[] = await PB.collection("archivos").getFullList(1, {
      id: proyect.image
    });
    const image = records.find(d => d.id === proyect.image)
    setUrl(`${process.env.API}/api/files/zfny7t9q5gb37yj/${proyect.image}/${image.archivo}`);
  };

  useEffect(() => {
    if (proyect.image) {
      queryImage();
      console.log(proyect,'aqui');
    }
  }, []);

  return (
    <Link href={`proyectos/${proyect.id}` } className="card w-96 h-48 shadow-xl image-full hover:scale-105 focus:scale-95 transition-all">
      <figure>{Url && <img src={Url} className=" object-cover h-48 w-96 " />}</figure>
      <div className="card-body text-white break-words break-all">
        <h2 className="card-title">{proyect.name}</h2>
        {proyect.description} 
      </div>
    </Link>
  );
}

export default CardProyect;
