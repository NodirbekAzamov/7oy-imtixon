import React from 'react'

export default function GenreCard({ item, JanrEdit, removeJanr }) {
  return (
    <div>
      <div className='w-[200px] h-[150px] my-[20px] border shadow-[5px, 5px, 5px, #red]'>
        <h5 className='text-center my-[10px] text-[#4635ff] font-[600]' >Janr: <span className='text'>{item.name}</span></h5>
        <div className='flex gap-[8px] my-[25px]'>
          <button onClick={() => JanrEdit(item)} className='bg-[#253886] mx-auto text-[#fff] rounded-[10px] py-[8px] px-[15px]'>edit</button>
          <button onClick={() => removeJanr(item.id)} className='bg-[#ff2d2d] mx-auto text-[#fff] rounded-[10px] py-[8px] px-[15px]'>delete</button>
        </div>
      </div>
    </div>
  )
}
