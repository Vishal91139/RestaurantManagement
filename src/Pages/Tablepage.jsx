import React from 'react'
import TableLayout from '../Components/TableLayout/TableLayout'

const Tablepage = () => {
  return (
    <>
    <div className='flex items-center flex-col'>
        <h1 className='menu-title'>Table Overview</h1>
        <h1 className='font-bold text-4xl'>A Culinary Journey Awaits!</h1>
        <TableLayout />
    </div>
    </>
  )
}

export default Tablepage