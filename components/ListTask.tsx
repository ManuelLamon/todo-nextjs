import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode,
  title?: string
}

function ListTask({ children, title = "TODO" }: Props) {
  return (
    <div className='flex overflow-x-hidden h-5/6 w-64 gap-3 flex-col items-center p-3 card bg-secondary '>
      <div className='w-full flex justify-between flex-row items-center z-10 sticky top-0 card bg-slate-100 pl-3'>
        <h1 className='font-bold'>{title}</h1>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost m-1">Click</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>
      {children}
    </div>
  )
}

export default ListTask