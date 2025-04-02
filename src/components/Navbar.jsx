import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-900 flex flex-col sm:flex-row justify-between md:justify-around text-white items-center'>
        <div className="logo font-bold text-3xl cursor-default">
          <span className='text-green-600'>&lt;</span>
            iPass
          <span className='text-green-600'>/&gt;</span>
        </div>

        <ul className='flex gap-5 text-2xl items-center'>
            <li><a href="" className='hover:text-green-300'>Home</a></li>
            <li><a href="" className='hover:text-green-300'>About</a></li>
            <li><a href="" className='hover:text-green-300'>Contact</a></li>
        </ul>
    </nav>
  )
}

export default Navbar