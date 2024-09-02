import React from 'react'
import FarmerImage from '../assets/Registration_Complete.png' 
import { Page } from 'framework7-react';

export default function RegistrationCompletePage({ f7router }) {
  return (
    <Page name="registrationComlete">
      <div className="h-[100vh] w-[100vw] p-5 relative flex flex-col items-center justify-center bg-blue-50">
        <div className="h-[100px] w-[100px] overflow-hidden rounded-full bg-gray-200 mb-5">
          <img 
            src={FarmerImage} 
            alt="Farmer" 
            className="w-full h-full" 
          />
        </div>
        <div className="text-center mb-3">
          <h5 className="font-bold text-lg">Thank you!</h5>
          <p>Your input has been sent to TDX</p>
        </div>
        <button
          onClick={() => f7router.navigate('/welcome/') }  
          className="w-[200px] h-[2.8em] rounded text-white flex items-center justify-center bg-primary"
        >
          <h6 className="font-bold text-white">Back to Homepage</h6>
        </button>
      </div>  
    </Page>
  )
}
