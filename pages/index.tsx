import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import ScreenContainer from '../components/ScreenContainer'
import CardTask from '../components/CardTask'
import ListTask from '../components/ListTask'
import { PB } from '../utils'
import { useState, useEffect } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [List, setList] = useState<any[]>([])

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
          {
            List.map((value:any) => 
              (<ListTask title={value.nombre} data={value} key={value.id}/>)
            )
          }
        </div>
        

      </ScreenContainer>
  )
}
