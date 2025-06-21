
import { AiOutlineHome } from "react-icons/ai";
import Link from 'next/link'
import React from 'react'
import { FiPlusCircle } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-4 bg-gray-800 text-white p-4">
          <Link href={"/"} className="flex items-center justify-center gap-1"> <AiOutlineHome /> <span>Home</span></Link>
          <Link href={"/create"} className="flex items-center justify-center gap-1"> <FiPlusCircle /> <span>Create</span></Link>
    </div>
  )
}

export default Navbar
