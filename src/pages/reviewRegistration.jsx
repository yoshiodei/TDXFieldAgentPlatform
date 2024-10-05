import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import {
    Page,
  } from 'framework7-react'
import FarmDetailCard from '../components/farmDetailCard'
import FarmerDetailCard from '../components/farmerDetailCard'
import store from '../js/store'
import { commoditiesArray } from '../config'
import useToast from '../components/toast'
import axios from 'axios'

const ReviewRegistrationPage = ({ f7router }) => {
  const [farmData, setFarmData] = useState([]);
  const [farmerData, setFarmerData] = useState({});

  const showToast = useToast();

  useEffect(() => {
      setFarmData(store.getters.farmData.value);
      setFarmerData(store.getters.farmerData.value);
  }, []);

const commodityPosition = (commodityName) => {

  for (let i = 0; i < commoditiesArray.length; i++) {
    if (commoditiesArray[i].toLowerCase().trim() === commodityName.toLowerCase().trim()) {
      return [i + 1];
    }
  }
  return [];
}

  const getBioData = (farmerData, farmData) => {
    const biodata = {
      fullname: `${farmerData.firstname} ${farmerData.lastname}`,
      mobilenumber: farmerData.mobilenumber,
      network: farmerData.network, 
      altmobilenumber: '',
      altnetwork: '',
      gender: farmerData.gender,
      community: farmerData.community.split(", ")[0],
      experience_year: farmerData.experience_year,
      idcardtype: farmerData.idcardtype,
      idcardnumber: farmerData.idcardnumber,
    }

    let farmdata = {};
      
    farmData.forEach((data, index) => {

      farmdata[(index + 1)] = {
        farmname: data.farmName,
        yield_from_last_season: data.yieldFromLastSeason,
        year_of_establishment: data.yearOfEstablishment,
        commodity: commodityPosition(data.commodity),
        farmsize: data.size,
        labour: data.typeOfLabour,
        community: data.location.split(', ')[0],
        holdingstock:"NO",
        stocksheld:{},
        color: data.colorCode
      }

    }
    )

    const newData = { biodata, farmdata };
    return newData;
  }

  const addBioData = async (bioData) => {  
    try {
      const response = await axios.post(
        `https://torux.app/api/user/addfarmer/${store.state.user.token}`,
        bioData,
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
    console.log('final Data', getBioData(farmerData, farmData));
    
    const response =  await addBioData(getBioData(farmerData, farmData));

    if(response.error){
      console.log('response', response);
      showToast('Sorry an error occurred. Try again later');
    }

    if(!response.error){
      console.log('response', response);
      store.dispatch('farmerRegistrationComplete');
      f7router.navigate('/registrationComplete/');
    }
  }

  return (
    <Page name="welcome">
      <div className="h-full w-full relative">
        <div className="px-5 flex items-center bg-white h-[60px]">
          <button
            className="flex items-center gap-x-2"
            onClick={() => f7router.navigate('/welcome/') }
          >
            <FaChevronLeft className="text-[0.8em] text-primary-dark" />
            <h6>Back To Welcome</h6>
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
