import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

interface Props {
    children: ReactNode
}

function ScreenContainer({ children }: Props) {

    

    return (
        <div>
            <Sidebar/>
            <div className="flex flex-col h-screen w-full pl-20">
                {/* <Navbar/> */}
                <div className="h-screen p-4 overflow-y-hidden">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ScreenContainer