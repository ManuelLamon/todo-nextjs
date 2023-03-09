import ScreenContainer from '../components/ScreenContainer'
import { PB } from '../utils'
import { useState, useEffect } from 'react';
import { Task } from '../context/proyectos/proyectosInterface';

export default function Home() {
  const [List, setList] = useState<any[]>([])
  const [TaskList,setListTask] = useState<Task[]>([])

  const DataQuery = async () => {
    const records = await PB.collection('listas').getFullList()
    setList(records)
  }

  

  useEffect(() => {
    DataQuery()
  }, [])
  
  return (
      <ScreenContainer>
        <h1 className=' text-4xl font-bold mb-4'>Tareas</h1>
        <div className='flex overflow-x-scroll h-screen overflow-y-hidden gap-3 w-fit'>
        </div>
        

      </ScreenContainer>
  )
}
