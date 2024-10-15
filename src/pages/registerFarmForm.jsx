import React, { useState, useEffect } from 'react'
import { Page, f7 } from 'framework7-react';
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
          location: '1, Samoa(Bongolo), Lambusie, Upper West',
          yieldFromLastSeason: '',
          yearOfEstablishment: '2024',
          typeOfLabour: ['family labour'],
          size: '',
          commodity: [],
          colorCode: 'none'
        }
    ];

    const [farmData, setFarmData] = useState(initialState);
    // const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      setFarmData(store.state.farmData);
    }, [])

    const handleAddFarm = (e) => {
      e.preventDefault();

      const newFarmData = {
        farmName: '',
        location: '1, Samoa(Bongolo), Lambusie, Upper West',
        yieldFromLastSeason: '',
        yearOfEstablishment: '2024',
        typeOfLabour: ['family labour'],
        size: '',
        commodity: [],
        colorCode: 'none'
      };

      setFarmData([...farmData, newFarmData]);
    }

    const assignColorCode = (data) => {
      const commodityFrequency = {};
      let occurrenceTracker = {};
    
      // Step 1: Count the frequency of each commodity across all farms
      data.forEach(farm => {
        farm.commodity.forEach(commodity => {
          if (!commodityFrequency[commodity.id]) {
            commodityFrequency[commodity.id] = 0;
            occurrenceTracker[commodity.id] = 0; // Track occurrence for color code assignment
          }
          commodityFrequency[commodity.id] += 1;
        });
      });
    
      // Step 2: Assign color codes based on frequency
      return data.map(farm => {
        return {
          ...farm,
          commodity: farm.commodity.map(commodity => {
            const frequency = commodityFrequency[commodity.id];
            let colorCode = 'none';
    
            if (frequency > 1) {
              const colorIndex = occurrenceTracker[commodity.id]; // Use occurrence tracker
              colorCode = colorCodes[colorIndex] || 'none'; // Assign color based on occurrence
              occurrenceTracker[commodity.id] += 1; // Update occurrence tracker
            }
    
            return {
              ...commodity,
              colorCode
            };
          })
        };
      });
    };

    const hasUniqueNames = (data) => {
      const nameSet = new Set();
    
      for (const item of data) {
        if (nameSet.has(item.farmName)) {
          return false; // Duplicate found
        }
        nameSet.add(item.name);
      }
    
      return true;
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      const noDuplicateName = hasUniqueNames(farmData);

      const hasEmptyFields = farmData.some(
        (data) => (data.farmName.trim() === '' || data.yieldFromLastSeason.trim() === '' || data.size.trim() === '' || data.typeOfLabour.length === 0 || data.commodity.length === 0)
      );

      if(!noDuplicateName){
        f7.dialog.alert('Duplicate farm names found');
      }
      if(hasEmptyFields){
        // setErrorMessage('Fields cannot be empty');
        f7.dialog.alert('Fields cannot be empty');
      }

      else {
        const codes = assignColorCode(farmData);
        // setFarmData(codes);
        console.log('codes >>>>', codes);
        store.dispatch('setFarmData', codes)
        // console.log('Here are your codes', codes);
        // console.log('for review:', farmData);
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