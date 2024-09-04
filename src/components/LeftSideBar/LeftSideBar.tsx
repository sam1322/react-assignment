"use client";
import { cn } from "@/lib/utils";
import { HomeIcon, PackageOpenIcon, ShoppingCartIcon } from "lucide-react";
import { FC, useState } from "react";
import Card from "./Card";
import { SideBarIcon, SideBarIconArr } from "@/constants/types";

interface LeftSideBarProps {}

const LeftSideBar: FC<LeftSideBarProps> = ({}) => {
  const [selected, setSelected] = useState<SideBarIcon>("Home");
  const handleSelect = (icon: SideBarIcon) => {
    setSelected(icon);
  };
  return (
    <div className="fixed left-0 top-16 h-fit bg-darkblue  z-[20] px-4 py-6 ">
      {/* <Card icon="Home" selected= />
      <Card icon="Inventory" />
      <Card icon="Cart" /> */}
      {SideBarIconArr.map((icon) => (
        <Card
          icon={icon}
          key={icon}
          selected={selected == icon}
          newCard={icon == "App Store"}
          onClick={() => handleSelect(icon)}
        />
      ))}
    </div>
  );
};

export default LeftSideBar;
