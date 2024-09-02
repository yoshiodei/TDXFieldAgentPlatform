import React from 'react'

export default function PageTitle({ title, farmer }) {
  return (
    <div className={`h-[80px] w-full flex ${farmer ? 'flex-col' : ''} justify-center items-center px-5`} style={{ backgroundColor: '#94E081' }}>
       <h6 className={`${farmer ? 'font-semibold' : 'font-semibold text-lg'} text-slate-700`}>{title}</h6>  
       {farmer && (<h5 className="font-bold text-lg">{farmer}</h5>)}  
    </div>
  )
}
