import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { Page } from 'framework7-react'
import FarmerDetailCard from '../components/farmerDetailCard';
import CommodityDetailCard from '../components/commodityDetailCard';
import FarmerConnectionDetail from '../components/farmerConnectionDetail';
import store from '../js/store';
import { commoditiesArray } from '../config';
import useToast from '../components/toast';
import axios from 'axios';

const ReviewFarmerConnectionPage = ({ f7router }) => {
    const [farmerData] = useState(store.getters.connectFarmer.value);
    const showToast = useToast();

    const getLastDayOfMonth = (monthName) => {
    const currentYear = new Date().getFullYear();
    
    const monthIndex = new Date(`${monthName} 1, ${currentYear}`).getMonth();
    
    const lastDay = new Date(currentYear, monthIndex + 1, 0);
    
    const formattedDate = `${lastDay.getFullYear()}-${String(lastDay.getDate()).padStart(2, '0')}-${String(lastDay.getMonth() + 1).padStart(2, '0')} 00:00:00`;
    
    return formattedDate;
  }

  const commodityPosition = (commodityName) => {

    for (let i = 0; i < commoditiesArray.length; i++) {
      if (commoditiesArray[i].toLowerCase().trim() === commodityName.toLowerCase().trim()) {
        return (i + 1);
      }
    }
    return 0;
  }

  const getIntentionData = () => {
    const newIntention = { 
      farmertoken: farmerData.token,
    };

    let stocksObject = {};

    Object.keys(farmerData.commodityDetails).forEach((commodity) => {
      if(farmerData.commodityDetails[commodity].checked){
        stocksObject[commodityPosition(commodity)] = {
          commodityid: commodityPosition(commodity).toString(),
          qtyheld: farmerData.commodityDetails[commodity].quantity,
          releasedate:getLastDayOfMonth(farmerData.commodityDetails[commodity].preferredTime),
          farmid: farmerData.commodityDetails[commodity]?.id_farmdata?.split(', ')[0],
        }
      }
    })

    const newData = { ...newIntention, stocksheld: stocksObject };
    return newData;
  }

  const addFarmerIntention = async (intention) => {  
    try {
      const response = await axios.post(
        `https://torux.app/api/user/farmerintention/${store.state.user.token}`,
        intention,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.access_token}`,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching farmer:', error);
      return { 
           error: true,
           message: "Error fetching farmer"
        }
    }
  };


    const handleClick = async () => {
      console.log('final Data', getIntentionData());

      console.log('id token defined', store.state.user.token, store.state.user.access_token);

      const response = await addFarmerIntention(getIntentionData());
      
      if(response.error){
        console.log('response', response);
        showToast('Sorry an error occurred. Try again Later');
      }

      if(!response.error){
        console.log('response', response);
        store.dispatch('farmerIntentComplete');
        f7router.navigate('/registrationComplete/');
      }
    } 

    return (
        <Page name="welcome">
          <div className="h-auto w-full relative">
            <div className="px-5 flex items-center bg-white h-[60px]">
              <button
                className="flex items-center gap-x-2"
                onClick={() => f7router.back() }
              >
                <FaChevronLeft className="text-[0.8em] text-primary-dark" />
                <h6>Back</h6>
              </button>  
            </div> 
            <div className="p-5 h-auto">
              <h6 className="font-bold text-lg">Review</h6>    
              <p className="font-semibold">Make sure the information below is accurate</p> 
              <hr className="bg-slate-400 my-2" />   
            </div>
            <div className="px-5 h-auto">
              <FarmerConnectionDetail farmerData={farmerData} f7router={f7router} />
              <CommodityDetailCard farmerData={farmerData} f7router={f7router} />
            </div>
            <div className="p-5 mt-1">
              <button
                onClick={handleClick}
                className="h-[2.8em] w-full rounded bg-primary flex justify-center items-center"
              >
                <h6 className="text-white">Submit</h6>
              </button>    
            </div>    
          </div>
        </Page>    
      )
}

export default ReviewFarmerConnectionPage; 