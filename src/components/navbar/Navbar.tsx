import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex rounded-md justify-between items-center p-4 bg-purple-800 text-white'>
      <Link href={"/"}>YCoding</Link>
        <Link href={"/addtopic"} className=' rounded-md bg-white text-gray-800 py-2 px-4'> Add Topic</Link>
    </nav>
  )
}

export default Navbar
