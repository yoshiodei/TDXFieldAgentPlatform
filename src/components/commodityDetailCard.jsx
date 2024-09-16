import React from 'react'
import { FiEdit3 } from 'react-icons/fi'

export default function CommodityDetailCard({ farmerData, f7router }) {
   console.log('commodity detail:', farmerData); 
   const { commodityDetails } = farmerData;

    return (
        <div className="bg-blue-100 rounded-lg p-3 h-auto w-full">
          <div className="flex justify-between items-center w-full">
            <h6 className="font-bold">Commodity Details</h6>  
            <button
              onClick={() => f7router.back()}
              className="w-auto h-auto flex gap-x-2 items-center text-primary"
            >
              <FiEdit3 className="" />  
              <h6>Edit</h6>
            </button>  
          </div>
          <div className="w-full h-[1px] bg-slate-400 my-2" />
          <div className="flex flex-col gap-y-2">
            {
              Object.keys(commodityDetails).map(
                (commodity) => {
                  if(!commodityDetails[commodity].checked){
                    return null;
                  }

                  return (
                  <div className="mb-4" key={commodity}>
                    <h3 className="font-bold">{commodity}</h3>
                    <div className="w-full h-[1px] bg-slate-400 my-3" />
                    <div className="flex flex-col justify-between items-start mb-2">
                      <p className="font-semibold">Preferred sale time</p>
                      <p className="ps-2 capitalize">{commodityDetails[commodity].preferredTime}</p>
                    </div>
                    <div className="flex flex-col justify-between items-start mb-2">
                      <p className="font-semibold">Quantity</p>
                      <p className="ps-2">{commodityDetails[commodity].quantity} 100Kg bag</p>
                    </div>
                    <div className="flex flex-col justify-between items-start">
                      <p className="font-semibold">Farm Name</p>
                      <p className="ps-2 capitalize">{commodityDetails[commodity]?.id_farmdata?.split(', ')[1]}</p>
                    </div>
                  </div>
                )
                }
              )
            }
          </div>
        </div>
      )
}
