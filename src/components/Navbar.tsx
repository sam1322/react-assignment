import Link from "next/link";
import { Button } from "./ui/button";
import SearchBar from "./SearchBar";
import { Bell, Download, Plus } from "lucide-react";

const Navbar = async () => {
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-4 px-4">
      {/* this one is for width full  */}
      <div className=" h-full mx-auto flex items-center justify-between  gap-2 ">
        {/* this one is for max width 1240px */}
        {/* <div className="container max-w-7xl h-full mx-auto flex items-center justify-between  gap-2">  */}
        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <p className="text-zinc-700 text-sm font-medium md:block">WareIQ </p>
        </Link>

        <div className="flex gap-4 items-center">
          <Button variant={"outline2"} className="flex items-center h-8 ">
            App Credits: <span className="pl-1 text-red-700"> ₹0</span>
          </Button>
          <Button variant={"default2"} className="h-8 ">
            Recharge
          </Button>
          <SearchBar />
          <div className="bg-slate-300 p-2 rounded-md">
            <Plus size={15} stroke="rgb(107 114 128  / 1)" />
          </div>
          <div className="bg-slate-300 p-2 rounded-md">
            <Download size={15} stroke="rgb(107 114 128  / 1)" />
          </div>
          <div className="bg-slate-300 p-2 rounded-md">
            <Bell size={15} stroke="rgb(107 114 128  / 1)" />
          </div>
        </div>

        <div className="flex items-end gap-2 font-serif ">
          <div className="text-darkblue font-bold text-sm">Switch Back</div>
          <div className="text-gray-400 text-[12px]">
            Signed in as Abhay@gmail.com
          </div>
          <div className="text-gray-700 text-sm ">Abhay Nayak</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
