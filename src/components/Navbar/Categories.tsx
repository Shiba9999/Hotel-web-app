"use client"


import React from 'react'
import Container from '../Container'
import { TbBeach } from "react-icons/tb";
import { GiPaperWindmill } from "react-icons/gi";
import { MdOutlineHolidayVillage } from "react-icons/md";
import CategoryBox from '../CategoryBox';


export const categories=[
    {
        lable:"Beach",
        icon:TbBeach,
        description:"This property is close to the beach !"
    },
    {
        lable:"windmill",
        icon:GiPaperWindmill,
        description:"This property has windmill"
    },
    {
        lable:"villa",
        icon:MdOutlineHolidayVillage,
        description:"This property is close to the beach !"
    }
]

const Categories = () => {
  return (
   <Container>
    <div className='
    pt-4
    flex
    flex-row
    items-center
    justify-between
    overflow-x-auto
    
    '>
       {categories.map((item)=>(
        <CategoryBox
        key={item.lable}
        label={item.lable}
        description={item.description}
        icon={item.icon}


        />
       ))}
    </div>

   </Container>
  )
}

export default Categories