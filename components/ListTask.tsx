import React, { ReactNode, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { PB } from '../utils'
import CardTask from './CardTask'

interface Props {
  title?: string
  data:any,
}

function ListTask({ title = "TODO",data}: Props) {
  const [Tasks, setTasks] = useState([])

  const QueryTask = async () => {
    const records: any = await PB.collection('tareas').getFullList(200, {
      sort:'-created',
      filter: `lista="${data.id}"`
    })

    setTasks(records)
    console.log(records)
  }

  useEffect(() => {
    
    QueryTask()
    PB.collection('tareas').subscribe('*', function (e) {
      console.log(e);
    })
    
  }, [])
  
  return (
    <div className='flex overflow-x-hidden h-5/6 w-64 gap-3 flex-col items-center p-3 card bg-secondary '>
      <div className='w-full flex justify-between flex-row items-center z-10 sticky top-0 card bg-slate-100 pl-3'>
        <h1 className='font-bold'>{title}</h1>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost m-1">
            <FontAwesomeIcon icon={faEllipsisV}  size={'xl'}/>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>
      {/* DAta */}
      {  
        Tasks.map((task:any) => (
          <CardTask Task={task} key={task.id}/>
        ))
      }
    </div>
  )
}

export default ListTask