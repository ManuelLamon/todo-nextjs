import React, { useEffect, useState } from 'react'
import { PB } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

interface Props {
    Task:any
}

function CardTask({Task}:Props) {

    const [Url, setUrl] = useState("")

    const queryImage = async () => {
        const records: any = await PB.collection('archivos').getFullList(200, {
            sort:'-created',
            filter: `tarea="${Task.id}"`
          })

          setUrl(`${process.env.API}/api/files/zfny7t9q5gb37yj/${Task.archivos}/${records[0].archivo}`)
       
    }

    useEffect(() => {
      if(Task.archivos){
        queryImage()
      }
    }, [])
    
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl mb-3">
            <figure>{Url && <img src={Url} />}</figure>
            <div className="card-body">
                <div className='text-base'>{Task.descripcion}</div>
                <div className="card-actions justify-end">
                    
                    <button className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faPen}  size={'xl'}/></button>
                    
                </div>
            </div>
        </div>
    )
}

export default CardTask