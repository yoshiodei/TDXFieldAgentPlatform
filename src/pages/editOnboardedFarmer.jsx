import React, { useState, useEffect } from 'react'
import { f7, Page } from 'framework7-react'
import store from '../js/store'
import { FaChevronLeft } from "react-icons/fa6"
import { FiEdit3 } from 'react-icons/fi'
import axios from 'axios';
import { mobileNetworks, regionsArray } from '../config'
import { retry } from '@reduxjs/toolkit/query'

export default function editOnboardedFarmer({ f7route, f7router }) {
  const [farmerDetail, setFarmerDetail] = useState({
    deviceId: '',
    first_name: '',
    last_name: '',
    gender: 'male',
    date_birth: '',
    community_id: '',
    altrnumber: '',
    banknamealtnumber: '',
    idcard_type: '', 
    card_number: '',  
  });  
  const [communities, setCommunities] = useState([]);
  const {id, phone} = f7route.params;

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

  const detectNetwork = (number)  => {
    if(!number){ return '' }

    const prefix = number.slice(0, 3);
  
    for (let network in mobileNetworks) {
      
      if (mobileNetworks[network].includes(prefix)) {
        return network;
      }
    }
  
    return '';
  }

  const updateFarmer = async (newFarmer) => {
    try {
      const response = await axios.post(
        `https://torux.app/api/user/profileedit/${id}`,
        {
          ...newFarmer
        }, // This is the request body, currently empty
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.access_token}`,
          },
        }
      );
      const data = response.data;
      console.log('farmer update >>>:', data);
    } catch (error) {
      console.error('Error updating farmer:', error);
      f7.dialog.alert('Unable to update farmer detail');
    }
  }

  useEffect(() => {
    fetchFarmer();
    fetchCommunities();
  }, []);

  //   const newCommunityList = communities.filter((community) => (
  //     community?.id === farmerDetail?.community_id   
  //   ));
  const handleChangeForm = (e) => {
    const { value, name } = e.target;
    setFarmerDetail({ ...farmerDetail, [name]: value });
    console.log('changed farmer detail >>>', farmerDetail);
  };

  const isFarmerValid = (data) => {
    if(!data.first_name || !data.last_name){
        return {isValid: false, message:'Name fields cannot be left empty'};
    }

    if(!data.idcard_type && data.card_number){
      return {isValid: false, message:'ID card type field is empty'};
    }

    if(data.idcard_type && !data.card_number){
      return {isValid: false, message:'ID card number field is empty'};
    }

    else {
        return {isValid: true, message: ''}
    }
  }

  const handleSubmit = () => {

    const altNumberNetwork = detectNetwork(farmerDetail.altrnumber);

    const updatedFarmer = {
        deviceId: "",
        id_user: id,
        first_name: farmerDetail.first_name,
        last_name: farmerDetail.last_name,
        gender: farmerDetail.gender,
        date_birth: farmerDetail.date_birth || '',
        community_id: farmerDetail.community_id  || '',
        altrnumber: farmerDetail.altrnumber  || '',
        banknamealtnumber: altNumberNetwork || '',
        idcard_type: farmerDetail.idcard_type || '', 
        card_number: farmerDetail.card_number  || '',  
      }

    const { isValid, message } = isFarmerValid(updatedFarmer);

    if(!isValid){
        f7.dialog.alert(message);
    }

    if(isValid) {
      console.log('the updated farmer >>', updatedFarmer);
      updateFarmer(updatedFarmer);
      f7router.navigate('/onboardedFarmers/');
    }
  }

  return (
        <Page name="onboardedFarmerDetail">
          <div className="w-full h-full">  
          <div className="px-5 flex items-center bg-white h-[60px]">
              <button
                className="flex items-center gap-x-2"
                onClick={() => f7router.navigate(`/onboardedFarmer/${id}/${phone}`) }
              >
                <FaChevronLeft className="text-[0.8em] text-primary-dark" />
                <h6>Back</h6>
              </button>  
            </div>   
          <div className="rounded-lg p-0 m-4">
              <div className="flex justify-between items-center w-full">
                <h6 className="font-bold">Edit Farmer Details</h6>  
              </div>
              <div className="w-full h-[1px] bg-slate-400 my-2" />
              <div className="flex flex-col gap-y-3">
              <div className="flex flex-col">
                <label className="font-semibold">First Name</label>
                <input 
                    name="first_name"
                    value={farmerDetail.first_name}
                    onChange={handleChangeForm}
                    placeholder="Please enter first name"
                    className="border border-slate-200 w-full h-[2.8em] px-3 rounded"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Last Name</label>
                <input 
                    name="last_name"
                    value={farmerDetail.last_name}
                    onChange={handleChangeForm}
                    placeholder="Please enter last name"
                    className="border border-slate-200 w-full h-[2.8em] px-3 rounded"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Gender</label>
                <div className="w-full rounded border border-slate-200 overflow-hidden">
                  <select 
                    name="gender"
                    value={farmerDetail.gender}
                    onChange={handleChangeForm}
                    className="bg-white w-full h-[2.8em] px-3"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>    
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Age</label>
                <div className="w-auto h-auto bg-white border border-slate-200 rounded px-3">
                <input 
                    name="date_birth"
                    value={farmerDetail.date_birth || ''}
                    onChange={handleChangeForm}
                    placeholder="Please enter age"
                    min={1}
                    type="number"
                    className="w-full h-[2.8em]"
                />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Alternative Number</label>
                <div className="w-auto bg-white h-auto border border-slate-200 rounded px-3">
                <input 
                    name="altrnumber"
                    value={farmerDetail.altrnumber || ''}
                    onChange={handleChangeForm}
                    placeholder="Please enter alt number"
                    type="number"
                    className="w-full h-[2.8em]"
                />
                </div>
              </div>

              {/* <div className="flex flex-col">
                <label className="font-semibold">Email</label>
                <input 
                    name="email"
                    value={farmerDetail.email}
                    onChange={handleChangeForm}
                    placeholder="Please enter email"
                    className="border border-slate-200 w-full h-[2.8em] px-3 rounded"
                />
              </div> */}

              <div className="flex flex-col">
                <label className="font-semibold">Community</label>
                  <div className="w-full rounded border border-slate-200 overflow-hidden">
                    <select 
                      className="bg-white w-full h-[2.8em] px-3"
                      name="community_id"
                      value={farmerDetail.community_id}
                      onChange={handleChangeForm}
                    >
                      {communities.map((item) => (
                        <option
                          value={item?.id}
                          key={item?.id}
                         >
                            {`${item?.name}, ${item?.location}, ${regionsArray[Number(item?.region)-1]}`}
                          </option>
                        )
                      )}
                    </select>
                  </div>    
                 </div>

                 <div className="flex flex-col">
                <label className="font-semibold">ID Card Type</label>
                <div className="w-full rounded border border-slate-200 overflow-hidden">
                <select 
                  name="idcard_type"
                  value={farmerDetail.idcard_type}
                  onChange={handleChangeForm}
                  className="bg-white w-full h-[2.8em] px-3">
                    <option value="">No Card Selected</option>     
                    <option value="ghana card">Ghana Card</option>     
                    <option value="voters">Voters' ID</option>    
                </select>
                </div>    
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">ID Card Number</label>
                <input 
                    name="card_number"
                    value={farmerDetail.card_number}
                    onChange={handleChangeForm}
                    placeholder="Please enter card number"
                    className="border border-slate-200 w-full h-[2.8em] px-3 rounded"
                />
              </div>

              </div>
                <button
                  onClick={handleSubmit}
                  className={`w-full h-10 p-[5px] rounded bg-primary text-font-light flex justify-center items-center px-5 mt-10`}
                >
                  <h6 className="text-base font-bold">Update farmer data</h6>
                </button>
              </div>
          </div>
        </Page>    
  )
}
