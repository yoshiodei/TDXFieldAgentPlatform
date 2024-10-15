import React, { useState, useEffect } from 'react'
import { Page, f7 } from 'framework7-react';
import { FaChevronLeft } from "react-icons/fa6"
import PageTitle from '../components/pageTitle';
import axios from 'axios';
import store from '../js/store';

export default function onboardedFarmersList({ f7router }) {
  const [farmersList, setFarmersList] = useState([]);
  const [search, setSearch] = useState("");

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
      // const filteredFarmerList = response.data.filter((farmer) => (
      //   farmer.token === store.state.user.token
      // ));
      const filteredFarmerList = response.data.data;
      console.log(filteredFarmerList);
      setFarmersList(filteredFarmerList);
    } catch (error) {
      console.error('Error fetching farmer:', error);
      f7.dialog.alert('Unable to fetch farmers list');
    }
  }

  const handleChangeForm = (e) => {
    const { value } = e.target;
    setSearch(value); 
  }

  useEffect(
    () => {
      fetchAggregatedFarmer();
  }, [])

  const filteredFarmers = farmersList.filter((farmer) => {
    const fullName = `${farmer.first_name} ${farmer.last_name}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  if(farmersList.length === 0 || filteredFarmers.length === 0){
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
        <PageTitle title={`Farmers Onboarded (${farmersList.length})`} />
        <div className="flex justify-center items-center">
          <input
            value={search}
            onChange={handleChangeForm}
            placeholder="Search farmer name"
            className="border border-slate-200 w-[90vw] h-[2.8em] px-3 rounded my-4"
          />
        </div>
        <div className="h-auto w-full flex justify-center">
            <h4 className="p-5 text-center font-bold text-xl mt-7 text-slate-400">
              There are no farmers in this list
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
        <PageTitle title={`Farmers Onboarded (${farmersList.length})`} />
        <div className="flex justify-center items-center">
          <input
            value={search}
            onChange={handleChangeForm}
            placeholder="Search farmer name"
            className="border border-slate-200 w-[90vw] h-[2.8em] px-3 rounded my-4"
          />
        </div>
        <div className="h-auto w-full flex flex-col gap-y-4 justify-center p-5">
          {
            filteredFarmers.map((farmer, index) => (
              <div key={farmer.token} className="bg-white p-5 flex flex-col gap-y-2 border border-slate-300 rounded">
                <div>
                  <h5>{`Farmer ${index + 1}`}</h5>
                </div>
                <div className="h-[1px] w-full bg-slate-400" />
                <div className="flex gap-x-4">
                  <div className="w-[60px] font-bold">Name:</div>
                  <div>{`${farmer.first_name} ${farmer.last_name}`}</div>
                </div>  
                <div className="flex gap-x-4">
                  <div className="w-[60px] font-bold">Mobile:</div>
                  <div>{farmer.paymentnumbers.main}</div>
                </div> 
                <div className="flex gap-x-4">
                  <div className="w-[60px] font-bold">Farms:</div>
                  <div>{farmer.farms.length}</div>
                </div> 
                <button
                  className="mt-3 h-[2.3em] w-full bg-primary rounded flex justify-center items-center"
                  onClick={() => f7router.navigate(`/onboardedFarmer/${farmer.token}/${farmer.paymentnumbers.main}`)}
                >
                  <h5 className="font-bold text-white">View Farmer</h5>
                </button>
              </div>
            ))
          }    
        </div> 
      </div>
    </Page>   
  )
}
