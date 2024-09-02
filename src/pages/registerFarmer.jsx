import React from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import {
    Page,
    Navbar,
  } from 'framework7-react'
import PageTitle from '../components/pageTitle'

export default function RegisterFarmerPage({ f7router }) {
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
      <PageTitle title="Register New Farmer" />  
      <div className="h-full w-full p-5">
        <div className="mt-20 flex flex-col items-center gap-y-1">
          <h6 className="font-bold text-lg">Let's start!</h6>
          <p className="w-[80%] text-center text-[1.1em]">To register a farmer please take a picture of their national ID</p>
          <button
           onClick={() => f7router.navigate('/registerFarmerForm/')}
           className="mt-10 w-full h-11 p-[5px] rounded bg-primary text-font-light flex justify-center items-center px-5"
       >
        <h6 className="text-base font-bold">Continue</h6>
      </button>
        </div>
      </div>
      </div>
    </Page>    
  )
}
