import React from 'react'
import store from '../js/store'
import TDXLogo from '../assets/tdx_logo.png'
import ConnectFarmerImage from '../assets/Connect_Farmer.png'
import RegisterFarmerImage from '../assets/Register_Farmer.png'
import { FaChevronRight } from "react-icons/fa6"
import { ImSwitch } from "react-icons/im"
import {
    Page,
  } from 'framework7-react'
import { successToast } from '../js/toast'

const WelcomePage = ({ f7router }) => {
  const navigateToRegisterFarmer = () => {
    f7router.navigate('/registerFarmer/');
  }

  const navigateToConnectFarmer = () => {
    f7router.navigate('');
  }

  const handleLogout = () => {
    f7router.navigate('/');
    store.dispatch('resetState');
    successToast('You are Logged out');
  }

  return (
    <Page name="welcome">
      <div className="h-[100vh] w-[100vw] p-5 relative">
        <img
          src={TDXLogo}
          alt="TDX logo"
          className="w-[150px]"
        />
        <div className="flex flex-col items-center mt-24 mb-10">
          <h1 className="text-lg font-bold text-gray-700 text-xl">Welcome <span className="text-primary">{store.state.user.firstname}</span></h1>
          <p className="text-gray-500 font-semibold">What would you like to do today?</p>
        </div>
        <div className="flex flex-col gap-y-4">
          <button
            className="px-3 flex justify-between items-center rounded-lg bg-primary h-20 w-full"
            onClick={() => f7router.navigate('/registerFarmer/')}
          >
            <div className="flex gap-x-8 items-center">
              <div className="h-[60px] w-[60px] bg-white rounded-full overflow-hidden">
                <img src={RegisterFarmerImage} alt="register farmer" />
              </div>
              <h6 className="font-bold text-[1.1em] text-white w-[120px] text-left">Register new farmer</h6>
            </div>
            <div className="flex justify-center items-center">
             <FaChevronRight className="text-[1.2em] text-white" />
            </div>
          </button>
          <button
            className="px-3 flex justify-between items-center rounded-lg bg-primary h-20 w-full"
            onClick={() => f7router.navigate('/connectFarmer/')}
          >
            <div className="flex gap-x-8 items-center">
              <div className="h-[60px] w-[60px] bg-white rounded-full overflow-hidden">
                <img src={ConnectFarmerImage} alt="register farmer" />
              </div>
              <h6 className="font-bold text-[1.1em] text-white w-[120px] text-left">Connect farmer to TDX</h6>
            </div>
            <div className="flex justify-center items-center">
             <FaChevronRight className="text-[1.2em] text-white" />
            </div>
          </button>
        </div>
        <div className="flex justify-center items-end w-full mt-32">
          <button 
            className="flex gap-x-2 w-auto text-primary items-center"
            onClick={handleLogout}
          >
            <ImSwitch className="text-[1.4em]"  />
            <h6 className="text-[1.4em]">Logout</h6>
          </button>
        </div>  
      </div>    
    </Page>    
  )
}

export default WelcomePage;
