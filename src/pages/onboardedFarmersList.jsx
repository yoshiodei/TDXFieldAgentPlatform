import React, { useState, useEffect } from 'react'
import { Page } from 'framework7-react';
import { FaChevronLeft } from "react-icons/fa6"
import PageTitle from '../components/pageTitle';
import axios from 'axios';

export default function onboardedFarmersList({ f7router }) {
  const [farmersList, setFarmersList] = useState([]);

  const fetchAggregatedFarmer = async () => {
    try {
      const response = await axios.post(
        `https://torux.app/api/user/farmers/${store.state.user.token}`,
        {}, // This is the request body, currently empty
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.access_token}`,
          },
        }
      );
      const filteredFarmerList = response.data.filter((farmer) => (
        farmer.token === store.state.user.token
      ));
      setFarmersList(filteredFarmerList);
    } catch (error) {
      console.error('Error fetching farmer:', error.response.data);
      f7.dialog.alert('Unable to fetch communities');
    }
  }

  useEffect(
    () => {
      fetchAggregatedFarmer();
  }, [])

  if(farmersList.length === 0){
    return(
      <Page name="registerFarmer">
      <div className="w-full h-full">
        <div className="px-5 flex items-center bg-white h-[60px]">
          <button
            className="flex items-center gap-x-2"
            onClick={() => f7router.navigate('/welcome/') }
          >
            <FaChevronLeft className="text-[0.8em] text-primary-dark" />
            <h6>Back</h6>
          </button>  
        </div> 
        <PageTitle title="Farmers Onboarded" />
        <div className="h-auto w-full flex justify-center">
            <h4 className="p-5 text-center font-bold text-xl mt-7">
              No farmer has been onboarded
            </h4>
         </div> 
      </div>
    </Page>   
    )
  }

  return (
    <Page name="registerFarmer">
      <div className="w-full h-full">
        <div className="px-5 flex items-center bg-white h-[60px]">
          <button
            className="flex items-center gap-x-2"
            onClick={() => f7router.navigate('/welcome/') }
          >
            <FaChevronLeft className="text-[0.8em] text-primary-dark" />
            <h6>Back</h6>
          </button>  
        </div> 
        <PageTitle title="Farmers Onboarded" />
        <div className="h-auto w-full flex justify-center p-5">
          {
            farmersList.map((farmer, index) => (
              <div className="p-5 flex flex-col gap-y-2 border border-slate-300 rounded">
                <div>
                  <h5>{`Farmer ${index + 1}`}</h5>
                </div>
                <div className="h-[1px] w-full bg-slate-400" />
                <div>
                  <div>Name</div>
                  <div>{`${farmer.first_name} ${farmer.last_name}`}</div>
                </div>  
                <div className="h-[1px] w-full bg-slate-100" />
                <div>
                  <div>Mobile</div>
                  <div>{farmer.paymentnumbers.main}</div>
                </div> 
              </div>
            ))
          }    
        </div> 
      </div>
    </Page>   
  )
}
