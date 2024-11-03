import React from 'react'

function Pagitation({handleNext,handlePrev,pageNo, mode}) {
  return (
    <div className={`bg-gray-200 p-4 m-8 flex justify-center gap-16 ${mode=="black" ? "bg-gray-900":""}`}>
        <div onClick={pageNo<=1?null:handlePrev} disabled={pageNo <=1} className='hover:cursor-pointer'><i className="fa-solid fa-circle-left fa-xl"></i></div>
        <div className='font-bold'>{pageNo}</div>
       <div onClick={handleNext} className='cursor-pointer'> <i className="fa-solid fa-circle-right fa-xl"></i></div>    
    </div>
  )
}

export default Pagitation
