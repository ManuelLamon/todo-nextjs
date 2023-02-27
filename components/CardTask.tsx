import React, { useEffect, useState } from 'react'
import { PB } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Task } from '../interfaces/tasks';

interface Props {
    Task:Task;
    updateTask: (e:string) => void
}

function CardTask({Task,updateTask }:Props) {

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
        <div className="card card-compact w-full bg-base-100 shadow-xl mb-3">
            <figure>{Task.foto && <img src={`${process.env.API}/api/files/vnqo14u55d0vubr/${Task.id}/${Task.foto}`} />}</figure>
            <div className="card-body">
                <div className='text-base'>{Task.descripcion}</div>
                <div className="card-actions justify-end">
                    
                    <button onClick={() => updateTask(Task.id)} className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faPen}  size={'xl'}/></button>
                    
                </div>
            </div>
        </div>
    )
}

export default CardTask