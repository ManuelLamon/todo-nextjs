import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { PB } from '../../utils';
import { Task } from '../../interfaces/tasks';
import ListTask from '../../components/ListTask';
import ScreenContainer from '../../components/ScreenContainer';

function projectId() {
    const router = useRouter()
    const id = router.query.projectId
    const [List, setList] = useState<any[]>([])
    const [TaskSelect,setTaskSelect] = useState<Task | null | undefined>(null)
    const [TaskList,setListTask] = useState<Task[]>([])
  
    const DataQuery = async () => {
      const records = await PB.collection('listas').getFullList(200, {
        filter: `proyecto="${id}"`,
      })
      const tasks = await PB.collection("tareas").getFullList(200, {
        filter: `proyecto="${id}"`,
      }) as Task[];
      setListTask(tasks)
      setList(records)
    }

    const handleTaskSelect = async (e:any, elementHtml:any) =>{
        const data = TaskList.find(ele => ele.id === e) as Task
        const dataFilter = TaskList.filter(ele => ele.id !== e && ele.lista === elementHtml.to.id).sort((a,b) => Number(a.index) - Number(b.index))
        console.log(dataFilter)
        data.lista = elementHtml.to.id
        data.index = elementHtml.newIndex
        dataFilter.splice(Number(elementHtml.newIndex),0,data)
        for (const element of dataFilter) {
            await PB.collection('tareas').update(element.id, element);
        }
    }
  
    useEffect(() => {
      DataQuery()
    }, [])
    
  return (
    <ScreenContainer>
        <h1 className=' text-4xl font-bold mb-4'>Tareas</h1>
        <div className='flex overflow-x-scroll h-screen overflow-y-hidden gap-3 w-fit'>
          {
            List.map((value:any,index) => 
              (<ListTask title={value.nombre} data={value} key={index} setTaskSelect={handleTaskSelect}/>)
            )
          }
        </div>
    </ScreenContainer>
  )
}

export default projectId