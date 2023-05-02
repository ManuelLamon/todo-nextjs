import React, { useEffect, useState } from "react";
import { PB } from "../utils";
import Link from "next/link";
import Image from "next/image";

interface Props {
  proyect: any;
  proyectIndex: number;
}

function CardProyect({ proyect }: Props) {
  const [Url, setUrl] = useState("");
  const [imgData, setImgData] = useState("");

  const queryImage = async () => {
    const records: any = await PB.collection("archivos").getOne(proyect.image);
    setImgData(records);
    setUrl(`${process.env.API}/api/files/zfny7t9q5gb37yj/${proyect.image}/${records.archivo}`);
    console.log(`${process.env.API}/api/files/zfny7t9q5gb37yj/${proyect.image}/${records.archivo}`);
  };

  useEffect(() => {
    if (proyect.image) {
      queryImage();
      console.log(proyect, "aqui");
    }
  }, []);

  return (
    <Link
      href={`proyectos/${proyect.id}`}
      className="card w-full h-full shadow-xl image-full hover:scale-105 focus:scale-95 transition-all"
    >
      <figure className="w-full">{Url ? <Image src={Url} alt={"setso"} fill className="static" /> : null}</figure>
      <div className="card-body text-white break-words break-all">
        <h2 className="card-title">{proyect.name}</h2>
        {proyect.description}
      </div>
    </Link>
  );
}

export default CardProyect;
