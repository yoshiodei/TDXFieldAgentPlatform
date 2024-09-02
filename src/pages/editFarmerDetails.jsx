import React, { useState, useEffect } from 'react'
import { FaChevronLeft } from "react-icons/fa6"
import { FaUser } from "react-icons/fa";
import {
    Page,
    f7,
    Navbar,
  } from 'framework7-react'
import PageTitle from '../components/pageTitle';
import ErrorMessage from '../components/errorMessage';
import store from '../js/store';
import useToast from '../components/toast';

const EditRegisterFarmerFormPage = ({f7router}) => {
  const initialState = {
    name: '',
    gender: 'male',
    phone: '',
    yearOfBirth: '2024',
    yearsOfExperience: 'less than 5 years',
  }
  const [farmerData, setFarmerData] = useState(initialState);

  useEffect(() => {
    setFarmerData(store.state.farmer);
  }, [])

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
    setFarmerData({...farmerData, [name]: value});
  } 

  const validateFarmerData = (farmerData) => {
    const {name, phone} = farmerData;

    if( name.trim().length === 0 || phone.trim().length === 0){
      console.log('error: Fields cannot be empty');
      showToast('Form incomplete');
      return {
        valid: false
      }
    }
    if(phone.trim().length < 10){
      console.log('error: Phone number is too short');
      showToast('Form incomplete');
      return {
        valid: false
      }  
    }

    return { 
      valid: true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {valid} = validateFarmerData(farmerData);
    if(valid){
      store.dispatch('setFarmer', farmerData)
      f7router.navigate('/reviewRegistration/');
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
                <label className="font-semibold">Name</label>
                <input
                  name="name"
                  value={farmerData.name}
                  onChange={handleChangeForm}
                  placeholder="Please enter name"
                  className="border border-slate-200 w-full h-[2.8em] px-3 rounded"
                />
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
                    name="phone"
                    value={farmerData.phone}
                    onChange={handleChangeForm}
                    placeholder="Please enter mobile number"
                    type="number"
                    className="w-full h-[2.8em]"
                />
                </div>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">Year of Birth</label>
                <div className="w-full rounded border border-slate-200 overflow-hidden">
                <select 
                  name="yearOfBirth"
                  value={farmerData.yearOfBirth}
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
                <label className="font-semibold">Years of Experience</label>
                <div className="w-full rounded border border-slate-200 overflow-hidden">
                <select
                  name="yearsOfExperience"
                  value={farmerData.yearsOfExperience}
                  onChange={handleChangeForm}
                  className="bg-white w-full h-[2.8em] px-3">
                    <option value="less than 5 years">Less than 5 years</option>
                    <option value="5 - 10 years">5 - 10 years</option>
                    <option value="more than 10 years">More than 10 years</option>
                </select> 
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


export default EditRegisterFarmerFormPage;
