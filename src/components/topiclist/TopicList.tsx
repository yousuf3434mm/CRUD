import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from '../removebtn/RemoveBtn';

const TopicList = () => {
    return (
        <div className='flex w-full justify-between p-4 border border-gray-200 rounded-lg shadow-md '>
                <div className='font-sans'>
                    <h2 className='font-bold text-2xl'>Topic Title</h2>
                    <p> Topic Description</p>

                </div>
            
            <div className='flex items-center gap-4'>
                <RemoveBtn />
                <Link href={"/edittopic/${id}"}>
                    <HiPencilAlt className='text-purple-800 text-2xl' size={24} />
                </Link>
            </div>

        </div>
    )
}

export default TopicList
