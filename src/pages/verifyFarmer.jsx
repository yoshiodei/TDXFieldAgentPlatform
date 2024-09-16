import React, { useState, useEffect } from 'react'
import { FaChevronLeft } from "react-icons/fa6"
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import {
    Page,
    f7,
    Navbar,
  } from 'framework7-react'
import PageTitle from '../components/pageTitle';
import store from '../js/store';
import useToast from '../components/toast';

const VerifyFarmerPage = ({f7router}) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const showToast = useToast();

  const farmerExists = async (phone) => {  
    try {
      const response = await axios.post(
        `https://torux.app/api/user/findfarmer/${store.state.user.token}`,
        { find: phone }, // This is the request body, currently empty
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.access_token}`,
          },
        }
      );
      const farmerInfo = response.data;
      return farmerInfo;
    } catch (error) {
      console.error('Error fetching farmer:', error.response.data);
      return { 
           error: true,
           message: "Error fetching farmer"
        }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const farmerData = await farmerExists(mobileNumber);

    if(farmerData?.token){
      console.log('farmer exists');  
      store.dispatch('setVerifiedFarmer', farmerData);
      f7router.navigate('/connectFarmer/');
    }

    if(!farmerData?.token){
      console.log('farmer does not exist', farmerData);
      showToast('Farmer does not exist');
      f7router.navigate('/welcome/');
    }
  }

  return (
    <Page name="registerFarmer">
      <div className="w-full h-auto">
      <div className="px-5 flex items-center bg-white h-[60px]">
        <button
          className="flex items-center gap-x-2"
          onClick={() => f7router.navigate('/welcome/') }
        >
          <FaChevronLeft className="text-[0.8em] text-primary-dark" />
          <h6>Back to Welcome</h6>
        </button>  
      </div>     
      <PageTitle title="Verify Farmer" />
      <div className="h-full w-full p-5">
        <form className="mt-20" onSubmit={handleSubmit}>
          <div className="flex flex-col">  
            <div className="flex flex-col">
              <label className="font-semibold">Farmer Mobile Number</label>
                <div className="w-auto h-auto border border-slate-200 rounded px-3">
                  <input 
                    name="mobilenumber"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Please enter mobile number"
                    type="number"
                    className="w-full h-[2.8em]"
                  />
                </div>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full h-10 p-[5px] rounded bg-primary text-font-light flex justify-center items-center px-5 mt-5`}
          >
            <h6 className="text-base font-bold">Verify Farmer</h6>
          </button>
        </form>
      </div>
      </div>
    </Page>    
  )
}


export default VerifyFarmerPage;
