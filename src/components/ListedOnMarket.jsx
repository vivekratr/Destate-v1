import React from 'react'

const ListedOnMarket = () => {
  return (
    <div className="flex w-[550px] h-[180px]">
      <img
        className="w-[250px] h-auto object-cover"
        src="https://i.imgur.com/qp9Aifg.png"
        alt=""
      />
      <div className="flex flex-col gap-2 p-2">
        <div className="w-[13.75rem] relative text-[0.875rem] font-medium font-inter text-black text-left inline-block">
          Xaverian palace, 2bhk, Kandiwali
        </div>
        <div className="w-[18rem] relative text-[0.75rem] font-inter text-[#8a8a8a] text-left inline-block">{`Samtanagar, in Radhika , Sector 17 Vashi, Navi Mumbai, Maharashtra `}</div>
        <div className="flex gap-2">
          <div className="w-full flex items-center justify-center relative rounded bg-[#FF0000] h-[1.875rem] overflow-hidden text-left text-[0.75rem] text-black font-inter">
            <div className="">Withdraw Listing</div>
          </div>
          <div className="w-full flex items-center justify-end px-1 gap-1 relative rounded bg-[#d5d5d5] h-[1.875rem] overflow-hidden text-left text-[0.75rem] text-black font-inter">
            <div className="">
              Property Papers
            </div>
            <img
              className="absolute h-3/5 w-[13.33%] top-[20%] right-[89.26%] bottom-[20%] left-[7.41%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="https://i.imgur.com/DJYbzqA.png"
            />
          </div>
        </div>
        <div className="w-[8.313rem] relative text-[0.75rem] font-inter text-black text-left inline-block">Owned on 17 Dec 2023</div>
      </div>
    </div>
  )
}

export default ListedOnMarket
