import React from 'react'
import { IoIosNotifications } from "react-icons/io"
import { trimStringToLength } from '../config/utils';
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en'


export default function NotificationPanel({ notificationData, f7router }) {
  const {body, created_at, is_read, title, id} = notificationData;
  TimeAgo.addLocale(en);

  return (
    <button
      className="rounded p-2 border border-slate-200 bg-slate-50 flex flex-col gap-y-1 relative"
      onClick={() => f7router.navigate(`/notification/${id}`)}
    >
      <div className="flex gap-x-2 items-center">
        <div className="rounded w-[37px] h-[37px] bg-slate-200 flex justify-center items-center">
          <IoIosNotifications className="text-[1.5em] text-slate-600" />    
        </div>
        <div className="flex-1">
          <h3 className="text-left font-bold text-slate-600">{trimStringToLength(25, title)}</h3>
          <p className="text-left text-[0.8em] font-semibold"><ReactTimeAgo date={new Date(created_at)} locale="en-US"/></p>
        </div>
      </div> 
      <div className="h-[1px] w-full bg-slate-100 my-1" />
      <div className="w-full">
        <p className="text-left">{trimStringToLength(28, body)}</p>
      </div>
      {(is_read === "0")  && (<div className="w-[12px] h-[12px] rounded-full bg-green-300 absolute z-10 top-[-5px] left-[-5px]" />)}
    </button>
  )
}
