import React from 'react'
import { GiCancel } from "react-icons/gi"

export default function ErrorMessage({title}) {
  return (
    <div className="h-[80px] w-full flex justify-center items-center px-5 bg-danger-secondary">
       <div className="flex justify-start items-center gap-x-3">
         <GiCancel className="text-2xl text-danger-primary" />
         <h6 className="font-semibold text-lg text-danger-primary">{title}</h6>  
       </div>
    </div>
  )
}
