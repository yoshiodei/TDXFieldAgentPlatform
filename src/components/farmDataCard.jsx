import React from 'react'

export default function FarmDataCard({ farmData, index }) {
  const {
    farmName,
    size,
    typeOfLabour,
    location, 
    yieldFromLastSeason,
    yearOfEstablishment,
    commodity,
    colorCode
  } = farmData;

  const count = 1 + index;

  return (
    <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center h-[1.2em]">
          <h6 className="font-semibold">{`${count}. Farm 0${count}`}</h6>
          <div className="flex gap-x-2 items-center">  
            { 
              colorCode.split(" ").map((colour) => (
                <div
                  key={color}
                  className="w-[25px] h-[10px] rounded-full"
                  style={{backgroundColor: colour }}
                />
              ))
            }
          </div>
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>Farm Name:</p>
          <p>{farmName}</p>
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>Community:</p>
          <p>{location.split(", ")[0]}</p>
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>District:</p>
          <p>{location.split(", ")[1]}</p>
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>Region:</p>
          <p>{location.split(", ")[2]}</p>
        </div>
        <div className="flex justify-between items-center h-[1.2em]">
          <p>Commodity:</p>
          <p>{commodity}</p>
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
        <div className="flex justify-between items-center h-[1.2em]">
          <p>Type of Labour:</p>
          <p>{typeOfLabour}</p>
        </div>
      </div>
  )
}
