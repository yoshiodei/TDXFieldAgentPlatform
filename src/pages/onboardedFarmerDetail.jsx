import React, { useState, useEffect } from 'react'
import { f7, Page } from 'framework7-react'
import store from '../js/store'
import { FaChevronLeft } from "react-icons/fa6"
import { FiEdit3 } from 'react-icons/fi'
import axios from 'axios';
import { regionsArray } from '../config'



export default function onboardedFarmerDetail({ f7route, f7router }) {
  const {id, phone} = f7route.params;
  const [farmerDetail, setFarmerDetail] = useState({});
  const [communities, setCommunities] = useState([]);
  console.log('farmerId:', id);
  console.log('phone:', phone);

  const fetchCommunities = async () => {
    try {
      const response = await axios.post(
        `https://torux.app/api/user/communities/${store.state.user.token}`,
        {}, // This is the request body, currently empty
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.access_token}`,
          },
        }
      );
      const communityList = response.data;
      console.log('all communities', communityList);
      setCommunities(communityList);
    } catch (error) {
      console.error('Error fetching farmer:', error.response.data);
      f7.dialog.alert('Unable to fetch communities');
    }
  }

  const fetchFarmer = async () => {
    try {
      const response = await axios.post(
        `https://torux.app/api/user/findfarmer/${id}`,
        {
          find: phone,   
        }, // This is the request body, currently empty
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.access_token}`,
          },
        }
      );
      const data = response.data;
      console.log('farmer detail:', data);
      setFarmerDetail(data);
    } catch (error) {
      console.error('Error fetching farmer:', error);
      f7.dialog.alert('Unable to fetch farmer detail');
    }
  }

  useEffect(() => {
    fetchFarmer();
    fetchCommunities();
  }, []);
  
  const newCommunityList = communities.filter((community) => (
    community?.id === farmerDetail?.community_id   
  )); 

  if(!farmerDetail?.token && newCommunityList.length < 1){
    return (
      <Page name="onboardedFarmerDetail">
        <div className="px-5 flex items-center bg-white h-[60px]" />
        <div className="w-full h-screen">
           <div className="mt-14 px-5 flex flex-col gap-y-2 items-center">
             <h4 className="text-center text-xl font-bold text-slate-400">
               No farmer was fetched   
             </h4> 
             <button 
               className="rounded-full bg-slate-300 font-bold text-slate-400 flex justify-center items-center w-[150px] h-[35px]"
               onClick={() => f7router.navigate('/onboardedFarmers/') }
             >
               Go Back   
             </button>
           </div> 
        </div>
      </Page>
    );
  }

  return (
    <Page name="onboardedFarmerDetail">
      <div className="w-full h-full">  
      <div className="px-5 flex items-center bg-white h-[60px]">
          <button
            className="flex items-center gap-x-2"
            onClick={() => f7router.navigate('/onboardedFarmers/') }
          >
            <FaChevronLeft className="text-[0.8em] text-primary-dark" />
            <h6>Back</h6>
          </button>  
        </div>   
      <div className="bg-blue-100 rounded-lg p-3 m-4">
          <div className="flex justify-between items-center w-full">
            <h6 className="font-bold">Farmer Details</h6>  
            <button
              onClick={() => f7router.navigate(`/editOnboardedFarmerDetail/${id}/${phone}`)}
              className="w-auto h-auto flex gap-x-2 items-center text-primary"
            >
              <FiEdit3 className="" />  
              <h6>Edit</h6>
            </button>  
          </div>
          <div className="w-full h-[1px] bg-slate-400 my-2" />
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center h-[1.2em]">
              <h6>Name:</h6>
              <p>{`${farmerDetail.first_name} ${farmerDetail.last_name}`}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Gender:</p>
              <p>{farmerDetail.gender || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Age</p>
              <p>{farmerDetail.date_birth || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Network:</p>
              <p>{farmerDetail.banknamemain || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Phone:</p>
              <p>{farmerDetail.mobile || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Alternate Number Network:</p>
              <p>{farmerDetail.banknamealtnumber || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Alternate Number:</p>
              <p>{farmerDetail.altrnumber || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Email:</p>
              <p>{farmerDetail.email || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Community:</p>
              <p>{newCommunityList[0]?.name || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>District:</p>
              <p>{newCommunityList[0]?.location || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>Region:</p>
              <p>{regionsArray[(Number(newCommunityList[0]?.region))] || 'N/A'}</p>
            </div> 
            <div className="flex justify-between items-center h-[1.2em]">
              <p>ID Card Type</p>
              <p>{farmerDetail?.idcard_type || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-center h-[1.2em]">
              <p>ID Card Number</p>
              <p>{farmerDetail?.idcard_number || 'N/A'}</p>
            </div>
            <h3 className="mb-1 mt-4 font-bold">{`Farms (${farmerDetail.farm_data.length})`}</h3>
            <div className="mb-1 h-[1px] w-full bg-slate-500" />
            <div className="flex flex-col gap-y-2">
              {
                farmerDetail.farm_data.map((farm, index) => (
                  <div key={farm.farmdata} className="flex justify-between">
                    <p>Farm {index + 1}:</p>
                    <p>{farm.farmname}</p>
                  </div>
                ))
              }
            </div>
          </div>
          </div>
      </div>
    </Page>    
  )
}
