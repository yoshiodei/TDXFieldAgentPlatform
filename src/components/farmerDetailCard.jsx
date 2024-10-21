import React, { useState, useEffect } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { regionsArray } from '../config';

const FarmerDetailCard = ({ farmerData, f7router }) => {
    const {
      account_type,
      firstname, 
      lastname, 
      age,
      gender, 
      mobilenumber, 
      community, 
      network, 
      experience_year,
      idcardnumber,
      idcardtype,
    } = farmerData;

    return (
        <div className="bg-blue-100 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center w-full">
            <h6 className="font-bold">Farmer Details</h6>  
            <button
              onClick={() => f7router.navigate('/editFarmerRegistration/')}
              className="w-auto h-auto flex gap-x-2 items-center text-primary"
            >
              <FiEdit3 className="" />  
              <h6>Edit</h6>
            </button>  
          </div>
          <div className="w-full h-[1px] bg-slate-400 my-2" />
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center h-[1.2em]">
              <h6>Account Type:</h6>
              <p>{account_type}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <h6>Name:</h6>
              <p>{`${firstname} ${lastname}`}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Gender:</p>
              <p>{gender}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Birth Year</p>
              <p>{new Date().getFullYear() - age}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Network:</p>
              <p>{network}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Phone:</p>
              <p>{mobilenumber}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Community:</p>
              <p>{community?.split(', ')[1]}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>District:</p>
              <p>{community?.split(', ')[2]}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Region:</p>
              <p>{community?.split(', ')[3]}</p>
            </div> 
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Year Began:</p>
              <p>{experience_year}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>ID Card Type</p>
              <p>{idcardtype ? idcardtype : 'N/A'}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>ID Card Number</p>
              <p>{idcardnumber ? idcardnumber : 'N/A'}</p>
            </div>
          </div>
        </div>
      )
}

export default FarmerDetailCard;