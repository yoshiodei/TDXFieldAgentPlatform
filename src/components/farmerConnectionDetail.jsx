import React from 'react'
import { FiEdit3 } from 'react-icons/fi'

export default function FarmerConnectionDetail({ farmerData, f7router }) {
    const {name, phone, community} = farmerData;
    
    return (
        <div className="bg-blue-100 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center w-full">
            <h6 className="font-bold">Farmer Details</h6>  
            <button
              onClick={() => f7router.back()}
              className="w-auto h-auto flex gap-x-2 items-center text-primary">
              <FiEdit3 className="" />  
              <h6>Edit</h6>
            </button>  
          </div>
          <div className="w-full h-[1px] bg-slate-400 my-2" />
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center h-[1.2em]">
              <h6>Name:</h6>
              <p>{name}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Phone:</p>
              <p>{phone}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Community:</p>
              <p>{community.split(', ')[0]}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>District:</p>
              <p>{community.split(', ')[1]}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Region:</p>
              <p>{community.split(', ')[2]}</p>
            </div>
          </div>
        </div>
      )
}

