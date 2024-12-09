import React from 'react';
import { assets } from '../assets/assets';

export const Navbar = ({setToken}) => {
  return (
    <div className=' flex items-center py-2 px-[4%] justify-between'>
      <img className=" w-40" src={assets.logo} alt="Logo" />

      <div>
        <button onClick={()=> setToken('')} className=' bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full test-xs sm:text-sm'>Logout</button>
      </div>
    </div>
  );
};
