import React from 'react'
import { FiEdit3 } from "react-icons/fi"
import FarmDataCard from './farmDataCard'

const FarmDetailCard = ({ farmData, f7router }) => {
  return (
    <div className="bg-blue-100 rounded-lg p-3">
      <div className="flex justify-between items-center w-full">
        <h6 className="font-bold">Farm Details</h6>  
        <button
          onClick={() => f7router.navigate('/editFarmRegistration/')}
          className="w-auto h-auto flex gap-x-2 items-center text-primary"
        >
          <FiEdit3 className="" />  
          <h6>Edit</h6>
        </button>  
      </div>
      <div className="w-full h-[1px] bg-slate-400 my-2" />
      <div className="flex flex-col gap-y-14">
        {
          farmData.map((data, index) => (
            <FarmDataCard farmData={data} index={index} key={index} />
          ))    
        }
      </div>
    </div>
  )
}

export default FarmDetailCard;
