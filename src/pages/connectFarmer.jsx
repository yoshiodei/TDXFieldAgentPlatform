import React, { useState, useEffect } from 'react'
import { FaChevronLeft } from 'react-icons/fa6'
import { Input, Page } from 'framework7-react'
import PageTitle from '../components/pageTitle'
import { commoditiesArray, monthsArray, regionsArray } from '../config'
import store from '../js/store'
import ErrorMessage from '../components/errorMessage'
import axios from 'axios';
import useToast from '../components/toast'

export default function connectFarmer({ f7router }) {
  const initialState = {
    community: 'Samoa(Bongolo), Lambusie, Upper West',
    name: '',
    phone: '',
  };

  const [formData, setFormData] = useState({});

  const [farmerData, setFarmerData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');
  const [locationsArray, setLocationsArray] = useState([]);

  const showToast = useToast();

  const handleChangeForm = (e) => {
    const { value, name } = e.target;
    setErrorMessage('');
    setFarmerData({...farmerData, [name]: value});
  }

  useEffect(() => {
    const fetchLocations = async () => {
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
        setLocationsArray(response.data);
      } catch (error) {
        console.error('Error fetching commodities:', error);
      }
    };
    
    fetchLocations();
  }, []);

  const handleClearSelection = () => {
    setFormData({});
  };

  const formDataIsValid = (formData) => {
    if (Object.keys(formData).length === 0){
      return false;
    }

    for (const option in formData) {
      if (formData[option].checked) {
        if (!formData[option].preferredTime || !formData[option].quantity) {
          return false;
        }
      }
    }
    return true;
  };

  const isValid = (farmerData) => {
    const {name, phone} = farmerData;

    if( name.trim() === '' || phone.trim() === ''){
      return {
        errorMessage: 'Fields cannot be empty',
        valid: false
      }
    }
    
    if( phone.trim().length < 10){
      return {
        errorMessage: 'Phone number too short',
        valid: false
      }
    }

    return {
      errorMessage: '',
      valid: true
    }
  };

  const handleSubmit = () => {
    const { valid } = isValid(farmerData);
    const validForm = formDataIsValid(formData);

    if(!valid || !validForm){
      showToast('Fields cannot be empty');
    }

    if(valid && validForm){
      const newConnection = {...farmerData, commodityDetails: formData};
      store.dispatch('setFarmerConnection', newConnection);
      f7router.navigate('/reviewFarmerConnection/');
      setErrorMessage('');
    }
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        checked, // Toggle the checkbox state
        preferredTime: 'january', // Initialize preferredTime if not present
        quantity: prevState[name]?.quantity || '', // Initialize quantity if not present
      },
    }));
  };

  const handleInputChange = (event, option) => {
    
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [option]: {
        ...prevState[option],
        [name]: value, // Set the input value dynamically
      },
    }));

    console.log('formData is ==>', formData);
  };

  return (
    <Page name="connectFarmer">
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
      <PageTitle title="Connect Farmer with TDX" />
      { errorMessage && (<ErrorMessage title={errorMessage} />)}
      <div className="p-5 bg-blue-50">
        <div>
          <h6 className="font-bold">1. Farmer Detail</h6>
        </div>
        <div className="w-full h-[1px] bg-slate-200 my-2" />
        <div className="flex flex-col gap-y-4">
        <div>
          <label className="font-semibold">Name</label>
          <input
            onChange={handleChangeForm}
            name="name"
            placeholder="Please enter name"
            className="border border-slate-200 w-full h-[2.8em] px-3 rounded"
          />
        </div>
        <div>
          <label className="font-semibold">Phone Number</label>
          <div className="w-auto h-auto border bg-white border-slate-200 rounded px-3">
            <input 
              onChange={handleChangeForm}
              name="phone"
              placeholder="Please enter mobile number"
              type="number"
              className="w-full h-[2.8em]"
            />
          </div>
        </div>
        <div>
          <label className="font-semibold">Community</label>
          <div className="w-full rounded border border-slate-200 overflow-hidden">
            <select
              className="bg-white w-full h-[2.8em] px-3"
              name="community"
              onChange={handleChangeForm}
            >
              {locationsArray.map((item) => (
                <option
                  value={`${item?.name}, ${item?.location}, ${regionsArray[Number(item?.region)-1]}`}
                  key={item?.id}
                >
                  {`${item?.name}, ${item?.location}, ${regionsArray[Number(item?.region)-1]}`}
                </option>
              )
            )}
            </select>
          </div>    
        </div>
        </div>
      </div>
      <div className="p-5 bg-blue-50 mt-3">
        <div>
          <h6 className="font-bold">2. Commodity Detail</h6>
        </div>
        <div className="w-full h-[1px] bg-slate-200 my-2" />
        <div>
          <p className="font-semibold">Commodities stored (Select all that apply)</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {
              commoditiesArray.map((option) => (
                <div key={option} className="flex gap-x-2">
                  <input
                    type="checkbox"
                    value={option.toLowerCase()}
                    className=""
                    name={option}
                    checked={formData[option]?.checked || false}
                    onChange={handleCheckboxChange}
                  />
                  <h6>{option}</h6>
                </div>
              ))
            }
          </div>
          <div className="flex justify-end py-3">
            <button onClick={handleClearSelection} className="w-auto px-2 py-1 rounded bg-slate-200"><h6 className="text-underline">Clear all</h6></button>
          </div>  
        </div>
        <div>
        {Object.keys(formData).map(
          (option) =>
            formData[option].checked && (
              <div key={option}>
              <h3 className="font-bold text-lg">{option.charAt(0).toUpperCase() + option.slice(1)}</h3>
              <div className="w-full bg-slate-300 h-[1px] my-3" />
              <div className="mb-5">
                <div className="mb-3">
                  <label className="font-semibold mb-3">Preferred Time</label>
                  <div className="w-full rounded border border-slate-200 overflow-hidden">
                    <select
                      name="preferredTime"
                      value={formData[option].preferredTime}
                      className="bg-white w-full h-[2.8em] px-3"
                      onChange={(event) => handleInputChange(event, option)}
                    >
                    {
                      monthsArray.map((item) => (
                        <option key={item} value={item.toLowerCase()}>{item}</option>
                      ))
                    }
                    </select>
                  </div> 
                </div>
                <div>
                  <label className="font-semibold mb-3">Quantity</label>
                  <div className="w-full rounded border border-slate-200 overflow-hidden relative">
                    <p className="absolute right-[10px] text-slate-500 top-[25%] font-semibold z-20">100kg bags</p>  
                    <div className="bg-white w-auto h-auto border border-slate-200 rounded px-3">
                      <input 
                        type="number"
                        name="quantity"
                        placeholder="Enter quantity"
                        className="border border-slate-200 w-full h-[2.8em] px-3 rounded"
                        value={formData[option].quantity}
                        onChange={(event) => handleInputChange(event, option)}
                      />
                    </div>
                  </div>  
                </div>
              </div>
            </div>
            ))}
        </div>
        </div>
        <div className="p-5">
          <button
            onClick={handleSubmit}
            className="w-full h-10 rounded bg-primary text-font-light flex justify-center items-center mt-5"
          >
            <h6 className="text-base font-bold">Continue</h6>
          </button>
        </div>
      </div>    
    </Page>    
  )
}