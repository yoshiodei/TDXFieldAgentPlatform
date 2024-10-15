import React from 'react'
import { commodityArray } from '../config';

export default function FarmDataCard({ farmData, index }) {
  const {
    farmName,
    size,
    typeOfLabour,
    location, 
    yieldFromLastSeason,
    yearOfEstablishment,
    commodity,
  } = farmData;

  const count = 1 + index;

  console.log('commo', commodity);

  return (
    <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center h-auto border-b border-slate-600 pb-2">
          <h6 className="font-bold">{`${count}. Farm 0${count}`}</h6>
          {/* <div className="flex gap-x-2 items-center">  
            { 
              colorCode.split(" ").map((colour) => (
                <div
                  key={colour}
                  className="w-[25px] h-[10px] rounded-full"
                  style={{backgroundColor: colour }}
                />
              ))
            }
          </div> */}
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>Farm Name:</p>
          <p>{farmName}</p>
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>Community:</p>
          <p>{location.split(", ")[1]}</p>
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>District:</p>
          <p>{location.split(", ")[2]}</p>
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>Region:</p>
          <p>{location.split(", ")[3]}</p>
        </div>
        <div className="flex justify-between items-start h-[auto]">
          <p>Commodity:</p>
          <div className="">
          {commodity.map((item) => (
            <div key={item.id} className="mb-1 flex items-center">
              <div className="me-2">{item.name}</div>

              {/* Display color codes */}
              <div className="flex mt-1">
                {item.colorCode.split(' ').map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-[0.85em] mr-2 rounded"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>Farm Size:</p>
          <p>{size} acres</p>
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>Yield from last Year:</p>
          <p>{yieldFromLastSeason} 100kg bag</p>
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>Year of Establishment:</p>
          <p>{yearOfEstablishment}</p>
        </div>
        <div className="flex justify-between items-start h-[auto]">
          <p>Type of Labour:</p>
          <div>
            <ul>
              {typeOfLabour.map((type) => (
                <li key={type} >{`- ${type}`}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  )
}
