import React, { useEffect, useState } from 'react'
import { PB } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Task } from '../context/proyectos/proyectosInterface';

interface Props {
    Task:Task;
    updateTask: (e:string) => void
    showImage: (e:string) => void
}

function CardTask({Task,updateTask,showImage }:Props) {

    const [Url, setUrl] = useState("")

    const queryImage = async () => {
        console.log(Task);
        /* const records: any = await PB.collection('archivos').getOne(Task.archivos)
        setUrl(`${process.env.API}/api/files/vnqo14u55d0vubr/${Task.archivos}/${records.archivo}`) */
    }

    useEffect(() => {
      if(Task.archivos.length){
        queryImage()
      }
    }, [])
    
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl mb-3 hover:cursor-grab active:cursor-grabbing">
            <figure>{Task.foto && <img src={`${process.env.API}/api/files/vnqo14u55d0vubr/${Task.id}/${Task.foto}`} onClick={() => {showImage(`${process.env.API}/api/files/vnqo14u55d0vubr/${Task.id}/${Task.foto}`) }} className="cursor-pointer h-28" />}</figure>
            <div className="card-body">
                <div className='text-lg font-semibold overflow-ellipsis break-words'>{Task.titulo}</div>
                <div className='text-base overflow-ellipsis w-full break-words'>{Task.descripcion.length > 80 ? `${Task.descripcion.slice(0,80)}...` : Task.descripcion}</div>
                <div className="card-actions justify-end">
                    
                    <button onClick={() => updateTask(Task.id)} className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faPen}  size={'xl'}/></button>
                    
                </div>
            </div>
        </div>
    )
}

export default CardTask