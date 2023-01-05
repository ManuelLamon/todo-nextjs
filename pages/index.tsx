import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import ScreenContainer from '../components/ScreenContainer'
import CardTask from '../components/CardTask'
import ListTask from '../components/ListTask'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <ScreenContainer>
        <h1 className=' text-4xl font-bold mb-4'>Tareas</h1>
        <div className='flex overflow-x-scroll h-screen overflow-y-hidden gap-3 w-fit'>
        <ListTask>
          <CardTask/>
          <CardTask/>
          <CardTask/>
          <CardTask/>
          <CardTask/>
          <CardTask/>
          <CardTask/>
          <CardTask/>
          <CardTask/>
        </ListTask>
        </div>
        

      </ScreenContainer>
  )
}
