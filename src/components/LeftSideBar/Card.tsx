import { SideBarIcon } from "@/constants/types";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  LayoutPanelLeftIcon,
  LogOutIcon,
  PackageOpenIcon,
  PersonStandingIcon,
  ReceiptIndianRupeeIcon,
  Settings2Icon,
  SettingsIcon,
  ShoppingCartIcon,
  TruckIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { FC } from "react";

interface CardProps {
  icon: SideBarIcon;
  newCard?: boolean;
  selected: boolean;
  onClick: () => void;
}

const Card: FC<CardProps> = ({ icon, selected, newCard, onClick }) => {
  let Icon = null;
  switch (icon) {
    case "Home":
      Icon = HomeIcon;
      break;
    case "Inventory":
      Icon = PackageOpenIcon;
      break;
    case "Cart":
      Icon = ShoppingCartIcon;
      break;
    case "Control Tower":
      Icon = TruckIcon;
      break;
    case "Billing":
      Icon = ReceiptIndianRupeeIcon;
      break;
    case "Customers":
      Icon = UsersIcon;
      //   Icon = PersonStandingIcon;
      break;
    case "App Store":
      Icon = LayoutPanelLeftIcon;
      break;
    case "Settings":
      Icon = SettingsIcon;
      break;
    case "Signout":
      Icon = LogOutIcon;
      break;
  }

  return (
    <div
      className={cn(
        "cursor-pointer p-6 px-4 flex flex-col justify-center items-center text-white rounded-lg relative",
        selected ? "text-darkblue bg-white cursor-default" : ""
      )}
      onClick={onClick}
    >
      <Icon /> {icon}
      {newCard && (
        <div className="rounded-md bg-green-400 text-sm p-2 py-1 absolute top-0 right-0">
          {" "}
          New
        </div>
      )}
    </div>
  );
};

export default Card;
