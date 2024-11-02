import React, { useEffect, useState } from 'react'
import { f7, Page } from 'framework7-react'
import { FaChevronLeft } from "react-icons/fa6"
import PageTitle from '../components/pageTitle'
import axios from 'axios'
import store from '../js/store'
import NotificationPanel from '../components/notificationPanel'

export default function notificationsPage({ f7router }) {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
          const response = await axios.post(
            `https://torux.app/api/user/notifications/${store.state.user.token}`,
            {}, // This is the request body, currently empty
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.state.user.access_token}`,
              },
            }
          );
          const notificationData = response.data;
          console.log('notification Data', notificationData);
          setNotifications(notificationData);
        } catch (error) {
          console.error('Error fetching farmer:', error);
          f7.dialog.alert('Unable to fetch transaction data');
        }
    }
    
    useEffect(() => {
      fetchNotifications();
    }, []);

    if(notifications.length === 0){
        return (
            <Page name="notification">
              <div className="w-full h-auto">
                <div className="px-5 flex items-center bg-white h-[60px]">
                  <button
                    className="flex items-center gap-x-2"
                    onClick={() => f7router.navigate('/welcome/') }
                  >
                    <FaChevronLeft className="text-[0.8em] text-primary-dark" />
                    <h6>Back to Welcome</h6>
                  </button>  
                </div>     
                <PageTitle title="Notifications" />
                <div className="h-full w-full p-5 flex flex-col gap-y-5">
                  <h1 className="text-center font-bold text-xl mt-7 text-slate-400">There are no notifications</h1>
                </div>
              </div>
            </Page>  
          )
    }

    return (
        <Page name="notification">
          <div className="w-full h-auto">
            <div className="px-5 flex items-center bg-white h-[60px]">
              <button
                className="flex items-center gap-x-2"
                onClick={() => f7router.navigate('/welcome/') }
              >
                <FaChevronLeft className="text-[0.8em] text-primary-dark" />
                <h6>Back to Welcome</h6>
              </button>  
            </div>     
            <PageTitle title="Notifications" />
            <div className="h-full w-full p-5 flex flex-col gap-y-5">
              {notifications.map((notification) => (
                <NotificationPanel
                  f7router={f7router}
                  key={notification.id}
                  notificationData={notification} 
                />
              ))}
            </div>
          </div>
        </Page>  
      )
}
