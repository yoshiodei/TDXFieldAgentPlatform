import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import {
    Page,
  } from 'framework7-react'
import FarmDetailCard from '../components/farmDetailCard'
import FarmerDetailCard from '../components/farmerDetailCard'
import store from '../js/store'

const ReviewRegistrationPage = ({ f7router }) => {
  const [farmData, setFarmData] = useState([]);
  const [farmerData, setFarmerData] = useState({});

  useEffect(() => {
      setFarmData(store.getters.farmData.value);
      setFarmerData(store.getters.farmerData.value);
  }, []);

  const handleClick = () => {
    f7router.navigate('/registrationComplete/');
  }

  return (
    <Page name="welcome">
      <div className="h-full w-full relative">
        <div className="px-5 flex items-center bg-white h-[60px]">
          <button
            className="flex items-center gap-x-2"
            onClick={() => f7router.back() }
          >
            <FaChevronLeft className="text-[0.8em] text-primary-dark" />
            <h6>Back</h6>
          </button>  
        </div> 
        <div className="p-5">
          <h6 className="font-bold text-lg">Review</h6>    
          <p className="font-semibold">Make sure the information below is accurate</p> 
          <hr className="bg-slate-400 my-2" />   
        </div>
        <div className="px-5">
          <FarmerDetailCard farmerData={farmerData} f7router={f7router} />  
          <FarmDetailCard farmData={farmData} f7router={f7router} />
        </div>
        <div className="p-5 mt-5">
          <button
            onClick={handleClick}
            className="h-[2.8em] w-full rounded bg-primary flex justify-center items-center">
            <h6 className="text-white">Submit</h6>
          </button>    
        </div>    
      </div>
    </Page>    
  )
}

export default ReviewRegistrationPage
