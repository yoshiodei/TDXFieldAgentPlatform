import React, { useEffect, useState } from 'react'
import { f7, Page } from 'framework7-react'
import { FaChevronLeft } from "react-icons/fa6"
import { IoIosNotifications } from "react-icons/io"
import PageTitle from '../components/pageTitle'
import axios from 'axios'
import store from '../js/store'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en'

export default function NotificationDetail({ f7route, f7router }) {
    const {id} = f7route.params;
    TimeAgo.addLocale(en);

    const [notificationDetail, setNotificationDetail] = useState({
        title: "",
        body: "",
        is_read: "",
        created_at: "",
    });

    const fetchNotificationDetail = async () => {
        try {
          const response = await axios.post(
            `https://torux.app/api/user/notifications/${store.state.user.token}?read=${id}`,
            {}, // This is the request body, currently empty
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.state.user.access_token}`,
              },
            }
          );
          const notificationData = response.data;
          console.log('single notification Data', notificationData);
          setNotificationDetail(...notificationData);
        } catch (error) {
          console.error('Error fetching farmer:', error);
          f7.dialog.alert('Unable to fetch transaction data');
        }
    }

    useEffect(() => {
      fetchNotificationDetail();
    }, []);

    if(notificationDetail?.title === ''){
        return (
        <Page name="notification detail">
        <div className="w-full h-auto">
          <div className="px-5 flex items-center bg-white h-[60px]">
            <button
              className="flex items-center gap-x-2"
              onClick={() => f7router.navigate('/notifications/') }
            >
              <FaChevronLeft className="text-[0.8em] text-primary-dark" />
              <h6>Go back</h6>
            </button>  
          </div>     
          <PageTitle title="Notification Detail" />
          <div className="h-full w-full p-5 flex flex-col gap-y-5">
            <h1 className="text-center font-bold text-xl mt-7 text-slate-400">...Loading</h1>
          </div>
        </div>
      </Page>  
      )
    }

    return (
        <Page name="notification detail">
          <div className="w-full h-auto">
            <div className="px-5 flex items-center bg-white h-[60px]">
              <button
                className="flex items-center gap-x-2"
                onClick={() => f7router.navigate('/notifications/') }
              >
                <FaChevronLeft className="text-[0.8em] text-primary-dark" />
                <h6>Go back</h6>
              </button>  
            </div>     
            <PageTitle title="Notification Detail" />
            <div className="h-full w-full p-5 flex flex-col gap-y-1">
              <div className="flex gap-x-2 items-center">
                <div className="rounded w-[37px] h-[37px] bg-slate-200 flex justify-center items-center">
                  <IoIosNotifications className="text-[1.5em] text-slate-600" />    
                </div> 
                <h2 className="font-bold flex-1 leading-tight">{notificationDetail?.title}</h2> 
              </div>
              <div className="h-[1px] w-full bg-slate-100 my-2" />
              <p>{notificationDetail?.body}</p>
              {notificationDetail?.created_at && (<p className="mt-3 text-slate-400 font-semibold text-left text-[0.85em]">
                <span>Posted{' '}</span>
                <ReactTimeAgo date={new Date(notificationDetail?.created_at)} locale="en-US"/>
              </p>)}
            </div>
          </div>
        </Page>  
      )
}
