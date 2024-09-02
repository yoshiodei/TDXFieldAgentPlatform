import React, { useState } from 'react'
import { Page } from 'framework7-react';
import { FaChevronLeft } from "react-icons/fa6"
import FarmDataForm from '../components/farmDataForm';
import { FaUser } from "react-icons/fa";
import PageTitle from '../components/pageTitle';
import store from '../js/store';
import ErrorMessage from '../components/errorMessage';
import { colorCodes } from '../config';
import useToast from '../components/toast';

const registerFarmFormPage = ({ f7router }) => {
    const initialState = [
        {    
          farmName: '',
          location: 'Samoa(Bongolo), Lambusie, Upper West',
          yieldFromLastSeason: '',
          yearOfEstablishment: '2024',
          typeOfLabour: 'family labour',
          size: '',
          commodity: 'white maize',
          colorCode: 'none'
        }
    ];

    const showToast = useToast();

    const [farmData, setFarmData] = useState(initialState);
    // const [errorMessage, setErrorMessage] = useState('');

    const assignColorCodes = () => {
      const commodityCount = {};
      
      farmData.forEach((farm, index) => {
        if (commodityCount[farm.commodity]) {
          commodityCount[farm.commodity].push(index);
        } else {
          commodityCount[farm.commodity] = [index];
        }
      });
  
      Object.keys(commodityCount).forEach((commodity) => {

        if(commodityCount[commodity].length > 1){
        commodityCount[commodity].forEach((farmIndex, i) => {
          farmData[farmIndex].colorCode = colorCodes[i % colorCodes.length];
        });
        }

        else {
          commodityCount[commodity].forEach((farmIndex) => {
            farmData[farmIndex].colorCode = 'none';
          });
        }

      });
  
      setFarmData([...farmData]);
    };

    const handleAddFarm = (e) => {
      e.preventDefault();

      const newFarmData = {
        farmName: '',
        location: 'Samoa(Bongolo), Lambusie, Upper West',
        yieldFromLastSeason: '',
        yearOfEstablishment: '2024',
        typeOfLabour: 'family labour',
        size: '',
        commodity: 'white maize',
        colorCode: 'none'
      };

      setFarmData([...farmData, newFarmData]);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const hasEmptyFields = farmData.some(
        (data) => (data.farmName.trim() === '' || data.yieldFromLastSeason.trim() === '' || data.size.trim() === '')
      );

      if(hasEmptyFields){
        // setErrorMessage('Fields cannot be empty');
        showToast('Fields cannot be empty');
      }
      else {
        // setErrorMessage('')
        assignColorCodes();
        store.dispatch('setFarmData', farmData)
        f7router.navigate('/reviewRegistration/');
      }
    };

    return (
        <Page name="registerFarmer">
      <div className="w-full h-full">
      <div className="px-5 flex items-center bg-white h-[60px]">
        <button
          className="flex items-center gap-x-2"
          onClick={() => f7router.back() }
        >
          <FaChevronLeft className="text-[0.8em] text-primary-dark" />
          <h6>Back</h6>
        </button>  
      </div>     
      <PageTitle title="Register farms for" farmer={store.getters.farmerName.value} />
      {/* {errorMessage && (<ErrorMessage title={errorMessage} />)}   */}
      <div className="h-full w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-10 bg-blue-50 p-5"> 
            {
             farmData.map((data, index) => (
               <FarmDataForm 
                 index={index}
                 data={data}
                 farmData={farmData}
                 setFarmData={setFarmData}
                 key={index}
               />  
             ))   
            } 
          </div>
          <div className="flex justify-end py-3 px-5">
            <button 
              className="p-2 rounded-full bg-slate-50 w-auto h-auto"
              onClick={(e) => handleAddFarm(e)}
            >
              <h6 className="font-semibold text-[0.9em]">+ Add another farmer</h6>    
            </button>
          </div>
          <div className="flex justify-between gap-x-3 px-5">  
            <button
              type="submit"
              className="w-full h-10 p-[5px] rounded bg-primary text-font-light flex justify-center items-center px-5 mt-10"
            >
              <h6 className="text-base font-bold">Submit</h6>
            </button>
          </div>
        </form>
      </div>
      </div>
    </Page>
      )
}

export default registerFarmFormPage;