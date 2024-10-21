import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import {
    Page,
    Navbar,
    f7
  } from 'framework7-react'
import PageTitle from '../components/pageTitle'

export default function RegisterFarmerPage({ f7router }) {
  const [account, setAccount] = useState('');

  const navigateToRegisterFarmer = () => {
    if(!account){
      f7.dialog.alert('Please select an account type');
    }
    if(account){
      f7router.navigate(`/registerFarmerForm/${account}`);
    }
  }


  return (
    <Page name="registerFarmer">
      <div className="w-[100vw] h-[100vh]">
      <div className="px-5 flex items-center bg-white h-[60px]">
        <button
          className="flex items-center gap-x-2"
          onClick={() => f7router.back() }
        >
          <FaChevronLeft className="text-[0.8em] text-primary-dark" />
          <h6>Back</h6>
        </button>  
      </div>     
      <PageTitle title="Select Account Type" />  
      <div className="h-full w-full p-5">
        <div className="mt-20 flex flex-col items-center gap-y-1">
          <h6 className="font-bold text-lg">Let's start!</h6>
          <p className="w-[80%] text-center text-[1.1em]">To begin the registration please select the account type</p>
          <div className="flex flex-col w-full mt-5">
            <div className="w-full rounded border border-slate-200 overflow-hidden">
              <select 
                name="account_type"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="bg-white w-full h-[2.8em] px-3"
              >
                <option value="">Select Account Type</option>
                <option value="farmer">Farmer</option>
                <option value="aggregator">Aggregator</option>
              </select>
            </div>    
          </div>
          <button
            onClick={navigateToRegisterFarmer}
            className="mt-2 w-full h-11 p-[5px] rounded bg-primary text-font-light flex justify-center items-center px-5"
          >
            <h6 className="text-base font-bold">Continue</h6>
          </button>
        </div>
      </div>
      </div>
    </Page>    
  )
}
