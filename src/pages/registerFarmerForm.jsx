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
import ErrorMessage from '../components/errorMessage';
import store from '../js/store';
import useToast from '../components/toast';
import { mobileNetworks, regionsArray } from '../config';

const registerFarmerFormPage = ({f7router}) => {
  const initialState = {
    firstname: '',
    lastname: '',
    community: '1, Samoa(Bongolo), Lambusie, Upper West',
    mobilenumber: '',
    gender: 'male',
    experience_year: '2024',
    idcardtype: '',
    idcardnumber: '',
  }

  const [farmerData, setFarmerData] = useState(initialState);
  const [locationsArray, setLocationsArray] = useState([]);
  const [communities, setCommunities] = useState([]);

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
      setCommunities(communityList);
    } catch (error) {
      console.error('Error fetching farmer:', error.response.data);
      f7.dialog.alert('Unable to fetch communities');
    }
  }

  useEffect(() => {
    setFarmerData(store.state.farmer)
    fetchCommunities();
  }, []);

  const showToast = useToast();
  
  const getYearArray = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for(let i = currentYear; i >= currentYear-100; i--){
        years.push(i);
    }
    return years;
  }  

  const handleChangeForm = (e) => {
    const { value, name } = e.target;
    setFarmerData({ ...farmerData, [name]: value });
  } 

  const validateFarmerData = (farmerData) => {
    const {firstname, lastname, mobilenumber, idcardtype, idcardnumber } = farmerData;

    if( !firstname.trim() || !lastname.trim() || !mobilenumber.trim()){
      console.log('error: Fields cannot be empty');
      showToast('Form incomplete');
      return {
        valid: false
      }
    }

    if(mobilenumber.length !== 10){
      console.log('error: Phone number is too short');
      f7.dialog.alert('Please enter a valid 10-digit mobile number');
      return {
        valid: false
      }  
    }

    if((!idcardnumber && idcardtype) || (idcardnumber && !idcardtype)){
      console.log('error: Fields cannot be empty');
      showToast('Optional field half filled');
      return {
        valid: false
      }
    }

    return { 
      valid: true
    }
  }

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

  function detectNetwork(number) {
    const prefix = number.slice(0, 3);
  
    for (let network in mobileNetworks) {
      
      if (mobileNetworks[network].includes(prefix)) {
        return { network: network };
      }
    }
  
    return { network: 'unknown' };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(farmerData.mobilenumber.length !== 10 || !(/^\d+$/.test(farmerData.mobilenumber))){
      f7.dialog.alert('Please enter a valid 10-digit mobile number');
    }

    else{

    const farmerList = await farmerExists(farmerData.mobilenumber);

    if(farmerList?.token){
      showToast('Farmer already exist');
      f7router.navigate('/welcome/');
    }

    if(farmerList?.error){
      const {valid} = validateFarmerData(farmerData);
      const network = detectNetwork(farmerData.mobilenumber);
      
      const newFarmerData = { ...farmerData, ...network }

      if(valid){
        store.dispatch('setFarmer', newFarmerData);
        f7router.navigate('/registerFarmForm/');
      }
    }

    else {
      f7.dialog.alert('Error:', farmerList);
    }
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
      <PageTitle title="Register New Farmer" />
      {/* {errorMessage && (<ErrorMessage title={errorMessage} />)}   */}
      <div className="h-full w-full p-5">
        <div className="flex gap-x-3 items-center mb-5">
          <div className="h-[35px] w-[35px] round bg-green-200 rounded flex justify-center items-end">
            <FaUser className="text-[1.8em] text-slate-600" />
          </div>
          <h6 className="font-bold text-lg text-slate-400">Farmer Details</h6>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-3">  
            <div className="flex flex-col">
                <label className="font-semibold">First Name</label>
                <input
                  name="firstname"
                  value={farmerData.firstname}
                  onChange={handleChangeForm}
                  placeholder="Please enter name"
                  className="border border-slate-200 w-full h-[2.8em] px-3 rounded"
                />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Last Name</label>
              <input
                name="lastname"
                value={farmerData.lastname}
                onChange={handleChangeForm}
                placeholder="Please enter name"
                className="border border-slate-200 w-full h-[2.8em] px-3 rounded"
              />
            </div>
            <div>
              <label className="font-semibold">Community</label>
              <div className="w-full rounded border border-slate-200 overflow-hidden">
                <select
                  className="bg-white w-full h-[2.8em] px-3"
                  name="community"
                  value={farmerData.community}
                  onChange={handleChangeForm}
                >
                  {communities.map((item) => (
                    <option
                      value={`${item?.id}, ${item?.name}, ${item?.location}, ${regionsArray[Number(item?.region)-1]}`}
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
                <label className="font-semibold">Gender</label>
                <div className="w-full rounded border border-slate-200 overflow-hidden">
                <select 
                  name="gender"
                  value={farmerData.gender}
                  onChange={handleChangeForm}
                  className="bg-white w-full h-[2.8em] px-3">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                </div>    
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">Phone Number</label>
                <div className="w-auto h-auto border border-slate-200 rounded px-3">
                <input 
                    name="mobilenumber"
                    value={farmerData.mobilenumber}
                    onChange={handleChangeForm}
                    placeholder="Please enter mobile number"
                    type="number"
                    className="w-full h-[2.8em]"
                />
                </div>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">Year Began</label>
                <div className="w-full rounded border border-slate-200 overflow-hidden">
                <select
                  name="experience_year"
                  value={farmerData.experience_year}
                  onChange={handleChangeForm}
                  className="bg-white w-full h-[2.8em] px-3">
                     {
                       getYearArray().map((item) => (
                         <option key={item} value={item}>{item}</option>
                       ))
                    }
                </select> 
                </div>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">ID Card Type (Optional)</label>
                <div className="w-full rounded border border-slate-200 overflow-hidden">
                <select
                  name="idcardtype"
                  value={farmerData.idcardtype}
                  onChange={handleChangeForm}
                  className="bg-white w-full h-[2.8em] px-3"
                >
                  <option value="">No Card Selected</option>     
                  <option value="ghana card">Ghana Card</option>     
                  <option value="voters">Voters' ID</option>     
                </select> 
                </div>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">ID Card Number (Optional)</label>
                <div className="w-auto h-auto border border-slate-200 rounded px-3">
                <input 
                    name="idcardnumber"
                    value={farmerData.idcardnumber}
                    onChange={handleChangeForm}
                    placeholder="Please enter mobile number"
                    className="w-full h-[2.8em]"
                />
                </div>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full h-10 p-[5px] rounded bg-primary text-font-light flex justify-center items-center px-5 mt-10`}
          >
            <h6 className="text-base font-bold">Continue</h6>
          </button>
        </form>
      </div>
      </div>
    </Page>    
  )
}


export default registerFarmerFormPage;
