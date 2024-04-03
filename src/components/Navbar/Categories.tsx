"use client";

import React from "react";
import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiPaperWindmill } from "react-icons/gi";
import { MdOutlineHolidayVillage } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { MdOutlinePool } from "react-icons/md";
import { FaMountain } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";
import { GiRiver } from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { MdOutlineCastle } from "react-icons/md";
import { GiCampingTent } from "react-icons/gi";

import { GiColdHeart } from "react-icons/gi";
export const categories = [
  {
    lable: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach !",
  },
  {
    lable: "windmills",
    icon: GiPaperWindmill,
    description: "This property has windmill",
  },
  {
    lable: "modern",
    icon: MdOutlineHolidayVillage,
    description: "This property is modern !",
  },
  {
    lable: "Countryside",
    icon: FaMountain,
    description: "This property is modern !",
  },
  {
    lable: "Pools",
    icon: MdOutlinePool ,
    description: "This property is modern !",
  },
  {
    lable: "Island",
    icon: GiIsland,
    description: "This property is modern !",
  },
  {
    lable: "Artic",
    icon: GiColdHeart,
    description: "This property is modern !",
  },
  {
    lable: "Lake",
    icon: GiRiver,
    description: "This property is modern !",
  },
  {
    lable: "skiing",
    icon: FaSkiing,
    description: "This property is modern !",
  },
  {
    lable: "Castles",
    icon: MdOutlineCastle,
    description: "This property is modern !",
  },
  {
    lable: "Camping",
    icon: GiCampingTent,
    description: "This property is modern !",
  },
 
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("Category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
    pt-4
    flex
    flex-row
    items-center
    justify-between
    overflow-x-auto
    
    "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.lable}
            label={item.lable}
            selected={category === item.lable}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
