import React, { useState } from 'react'
import { Page } from 'framework7-react';
import TDXLogo from '../assets/tdx_logo.png'

const LoginPage = ({ f7router }) => {
  const [disableButton, setDisableButton] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setPhoneNumber(value);
    if(phoneNumber.length >= 9){
        setDisableButton(true);
    }
    else {
        setDisableButton(false);
    }
  }

  const handleNavigate = () => {
    if (phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
        f7router.navigate(`/verifyOTP/${phoneNumber}`);
        setPhoneNumber('');
      } else {
        alert('Please enter a valid 10-digit mobile number');
      }
  }

  return (
    <Page name="login">
     <div className="h-[100vh] w-[100vw] p-5 relative">
      <img
        src={TDXLogo}
        alt="TDX logo"
        className="w-[150px]"
      />
      <h1 className="text-lg font-bold mt-2">Login to your account</h1>
      <div className="mt-24">
        <p className="text-base font-semibold mb-1">Phone Number</p>
        <div className="px-[10px] w-full h-[2.8em] rounded border border-slate-300 mb-3">    
          <input
            placeholder="Please your phone number"
            type="number"
            value={phoneNumber}
            onChange={handleChange}
            className="w-full h-[2.8em] rounded border border-slate-300 px-3 mb-5"
          />
        </div>
        <button
          onClick={() => handleNavigate()}
          disabled={phoneNumber.length <= 9}
          className={`${ phoneNumber.length > 9 ? '' : 'opacity-50' } w-full h-10 p-[5px] rounded bg-primary text-font-light flex justify-center items-center px-5`}
        >
          <h6 className="text-base font-bold">Request OTP</h6>
        </button>
      </div>
      </div>
    </Page>
  )};
  export default LoginPage;