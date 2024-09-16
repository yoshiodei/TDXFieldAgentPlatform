import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { commodityArray, communityArray, regionsArray } from '../config';
import { getYearArray } from '../config/utils';
import axios from 'axios';
import store from '../js/store';

export default function FarmDataForm({index, setFarmData, farmData, data}) {
  const count = index + 1;

  const handleFarmFormChange = (e, index) => {
    const { value, name } = e.target;
    const newFarmData = [...farmData];
    newFarmData[index][name] = value;
    setFarmData(newFarmData);
  }

  const handleDelete = (e, index) => {
    e.preventDefault();
    const newFarmData = farmData.filter((_, i) => (i !== index));
    setFarmData(newFarmData);
  }

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-between items-center">
        <h6 className="font-bold">{`${count}. Farm 0${count}`}</h6>
        {
         (farmData.length === count && count !== 1) && (
           <button
             onClick={(e) => handleDelete(e, index)} 
             className="h-[30px] w-[30px] rounded bg-slate-200 flex justify-center items-center"
            >
             <MdDelete className="text-red-400 text-[1.5em]" />    
           </button>
          )
        }    
      </div>
      <hr /> 
      <div className="flex flex-col">
        <label className="font-semibold">Farm Name</label>
        <input
          name="farmName"
          value={data.farmName}
          placeholder="Please enter name"
          className="border border-slate-200 w-full h-[2.8em] px-3 rounded"
          onChange={(e) => handleFarmFormChange(e, index)} 
        />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold">Farm Location</label>
        <div className="w-full rounded border border-slate-200 overflow-hidden">
          <select 
            className="bg-white w-full h-[2.8em] px-3"
            name="location"
            value={data.location}
            onChange={(e) => handleFarmFormChange(e, index)}
          >
            {communityArray.map((item) => (
              <option
                value={`${item?.id}, ${item?.name}, ${item?.location}, ${regionsArray[Number(item?.region)-1]}`}
                key={item?.id}
              >
                {`${item?.name}, ${item?.location}, ${regionsArray[Number(item?.region)-1]}`}
              </option>
            )
            )}
          </select>
        </div>    
      </div>
      <div className="flex flex-col">
        <label className="font-semibold">Size</label>
        <div className="w-full rounded border border-slate-200 overflow-hidden relative">
        <p className="absolute right-[10px] text-slate-500 top-[25%] font-semibold z-20">acres</p>
        <div className="bg-white w-auto h-auto border border-slate-200 rounded px-3 relative">
          <input 
            name="size"
            type="number"
            placeholder="Please enter farm size"
            value={data.size}
            className="w-full h-[2.8em]"
            onChange={(e) => handleFarmFormChange(e, index)}
          />
        </div>
        </div>    
      </div>
      <div className="flex flex-col">
        <label className="font-semibold">Yield From Last Season</label>
        <div className="w-full rounded border border-slate-200 overflow-hidden relative">
        <p className="absolute right-[10px] text-slate-500 top-[25%] font-semibold z-20">100kg bags</p>  
        <div className="bg-white w-auto h-auto border border-slate-200 rounded px-3">
          <input 
            name="yieldFromLastSeason"
            placeholder="Please enter yield"
            className="w-full h-[2.8em]"
            type="number"
            value={data.yieldFromLastSeason}
            onChange={(e) => handleFarmFormChange(e, index)}
          />
        </div>
        </div>    
      </div>
      <div className="flex flex-col">
        <label className="font-semibold">Year Of Establishment</label>
        <div className="w-full rounded border border-slate-200 overflow-hidden">
        <select
          name="yearOfEstablishment"
          value={data.yearOfEstablishment}
          onChange={(e) => handleFarmFormChange(e, index)}
          className="bg-white w-full h-[2.8em] px-3">
          {getYearArray().map((item) => (
              <option value={item} key={item}>{item}</option>
            )
          )}
        </select> 
      </div>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold">Type Of Labour</label>
        <div className="w-full rounded border border-slate-200 overflow-hidden">
        <select
          name="typeOfLabour"
          value={data.typeOfLabour}
          onChange={(e) => handleFarmFormChange(e, index)}
          className="bg-white w-full h-[2.8em] px-3"
        >
          <option value="family labour">Family Labour</option>
          <option value="hired labour">Hired Labour</option>
          <option value="contract">Contract</option>
        </select> 
      </div>
    </div>
      <div className="flex flex-col">
        <label className="font-semibold">Commodity</label>
        <div className="w-full rounded border border-slate-200 overflow-hidden">
        <select
          value={data.commodity}
          name="commodity"
          onChange={(e) => handleFarmFormChange(e, index)}
          className="bg-white w-full h-[2.8em] px-3">
          {commodityArray.map((item) => (
              <option value={item.name.toLowerCase()} key={item.id}>{item.name}</option>
            )
          )}
        </select> 
      </div>
    </div>
    </div>
  )
}
