import React, { useEffect } from 'react';

import { FaChevronRight } from "react-icons/fa6"
import store from '../js/store'
import FooterImg from '../assets/cultivating.png'
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Button
} from 'framework7-react';
import { registerPushNotifications, setupPushNotificationListeners } from '../config/utils';

 const HomePage = ({ f7router }) => {
  const handleNavigate = () => {
    f7router.navigate('/login/');
  }

  useEffect(() => {
    registerPushNotifications();
    setupPushNotificationListeners();  
  }, []);

  return (
  <Page name="home"> 
   <div className="h-[100vh] w-[100vw] bg-primary p-5 relative">
      <div className="mb-5 mt-[10vh] w-[65vw] text-font-light">  
        <h1 className="text-lg font-bold">Hi TDX Field Agent!</h1>
        <p>Use this platform to collect farm and farmer data in your community.</p>
      </div>
      <button
        onClick={() => handleNavigate()}
        className="w-full h-11 p-[5px] rounded bg-primary-light text-font-light flex justify-between items-center px-5"
      >
        <h6 className="text-base font-bold">Get Started</h6>
        <FaChevronRight />
      </button>
      <img 
        src={FooterImg}
        alt="footer"
        className="absolute z-10 bottom-0 w-[100vw] left-0"
      />
    </div>
  </Page>
)};
export default HomePage;