import React, { useEffect, useState } from 'react'
import store from '../js/store'
import TDXLogo from '../assets/tdx_logo.png'
import ConnectFarmerImage from '../assets/Connect_Farmer.png'
import RegisterFarmerImage from '../assets/Register_Farmer.png'
import OnboardFarmerImage from '../assets/farmers_shaking_hands.png'
import { IoIosNotifications } from "react-icons/io"
import { FaChevronRight } from "react-icons/fa6"
import { ImSwitch } from "react-icons/im"
import {
    Page, f7
  } from 'framework7-react'
import { successToast } from '../js/toast'
import axios from 'axios'


const WelcomePage = ({ f7router }) => {

  const [transaction, setTransaction] = useState({account_balance: "0.00", total_pendingpayout: "0.00"});
  const {account_balance, total_pendingpayout} = transaction; 
  const fetchTransactions = async () => {
    try {
      const response = await axios.post(
        `https://torux.app/api/user/agentmilestones/${store.state.user.token}`,
        {}, // This is the request body, currently empty
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.access_token}`,
          },
        }
      );
      const transactionData = response.data;
      console.log('transaction Data', transactionData);
      setTransaction(transactionData);
    } catch (error) {
      console.error('Error fetching farmer:', error);
      f7.dialog.alert('Unable to fetch transaction data');
    }
  }  

  useEffect(() => {
    fetchTransactions();    
  }, [])


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
        <div className="flex justify-between items-center">
          <img
            src={TDXLogo}
            alt="TDX logo"
            className="w-[120px]"
          />
          <button 
            onClick={() => f7router.navigate('/notifications/')}
            className="h-[40px] w-[40px] rounded-full bg-slate-100 flex justify-center items-center relative"
          >
            {/* <div className="absolute min-w-[12px] h-[12px] p-[3px] rounded-full top-[-2px] right-[0px] bg-green-400 z-10">
              <p className="text-[0.75em] text-white"></p>
            </div> */}
            <IoIosNotifications className="text-[1.6em] text-primary" />
          </button>
        </div>
        <div className="flex flex-col items-center mt-8 mb-5">
          <h1 className="font-bold text-gray-700 text-2xl">Welcome <span className="text-primary">{store.state.user.firstname}</span></h1>
          <p className="text-gray-500 font-semibold">What would you like to do today?</p>
        </div>
        <div className="w-full h-auto p-3 bg-white flex flex-col rounded-lg mb-20 border border-slate-100">
          <div>
            <h4 className="font-bold text-slate-500">Available Balance</h4>
            <h2 className="text-4xl font-bold text-primary">{`Ghc ${account_balance || '0.00'}`}</h2>
            <div className="w-full h-[1px] bg-slate-400 my-3" />
          </div>
          <div>
            <h4 className="font-bold text-slate-500">Pending Payout</h4>
            <h2 className="text-4xl font-bold text-primary">{`Ghc ${total_pendingpayout || '0.00'}`}</h2>
            <div className="w-full h-[1px] bg-slate-400 my-3" />
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              className="w-[45vw] py-2 px-4 rounded-full bg-primary opacity-75"
              onClick={() => f7router.navigate('/transactionDetail/')}   
            >
              <p className="text-white font-bold text-lg">View Details</p>
            </button>
          </div>
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
            onClick={() => f7router.navigate('/verifyFarmer/')}
          >
            <div className="flex gap-x-8 items-center">
              <div className="h-[60px] w-[60px] bg-white rounded-full overflow-hidden">
                <img src={ConnectFarmerImage} alt="register farmer" />
              </div>
              <h6 className="font-bold text-[1.1em] text-white w-[120px] text-left">Connect farmer to aggregator</h6>
            </div>
            <div className="flex justify-center items-center">
             <FaChevronRight className="text-[1.2em] text-white" />
            </div>
          </button>
          <button
            className="px-3 flex justify-between items-center rounded-lg bg-primary h-20 w-full"
            onClick={() => f7router.navigate('/onboardedFarmers/')}
          >
            <div className="flex gap-x-8 items-center">
              <div className="h-[60px] w-[60px] bg-white rounded-full overflow-hidden">
                <img src={OnboardFarmerImage} alt="onboard farmer" />
              </div>
              <h6 className="font-bold text-[1.1em] text-white w-[140px] text-left">List of onboarded farmers</h6>
            </div>
            <div className="flex justify-center items-center">
             <FaChevronRight className="text-[1.2em] text-white" />
            </div>
          </button>
        </div>
        <div className="flex justify-center items-end w-full mt-20">
          <button 
            className="flex gap-x-2 w-auto text-primary items-center bg-white py-2 px-5 rounded-full"
            onClick={handleLogout}
          >
            <ImSwitch className="text-[1.4em]"  />
            <h6 className="text-[1.4em] font-bold">Logout</h6>
          </button>
        </div>  
      </div>    
    </Page>    
  )
}

export default WelcomePage;
