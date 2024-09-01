"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Customer, newCustomerList } from "@/constants/customers";

interface Photo {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
}

export default function CustomerPage() {
  const [customer, setCustomer] = useState<Customer | null>(newCustomerList[0]);
  const [imageList, setImageList] = useState<Photo[]>([]);

  // useEffect(() => {
  //   getImages();
  //   const intervalId = setInterval(getImages, 10000);

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);

  const getImages = async () => {
    try {
      const result = await axios.get(
        `https://picsum.photos/v2/list?page=${
          Math.floor(Math.random() * 100) + 1
        }&limit=9`
      );
      const data: Photo[] = result.data;
      const shuffledPhotos = data.sort(() => 0.5 - Math.random());
      console.log("data", data);
      setImageList(shuffledPhotos);
    } catch (error) {
      console.error(error);
    }
  };

  const width = 400;
  const height = 400;

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl">Customers</h1>
      <div
        className="grid w-full max-h-[800px] border-t-2 border-t-zinc-200 "
        style={{ gridTemplateColumns: "2fr 6fr" }}
      >
        <div className="list max-h-[1000px] overflow-y-scroll scrollbar-custom -mr-[11px] hover:mr-0">
          {newCustomerList.map((item) => (
            <div
              className={
                customer?.id == item.id
                  ? "bg-slate-200 p-6 border-b-2 border-b-zinc-200 border-black border-r-2"
                  : "bg-slate-50 p-6 border-b-2 border-zinc-200  border-r-2 cursor-pointer "
              }
              onClick={() => setCustomer(item)}
              key={item.id}
            >
              <div className="text-2xl py-2 pt-0">{item.name}</div>
              <div className="text-block-ellipsis text-slate-500 ">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        <div className="details fle max-h-[1000px]  overflow-y-scroll scrollbar-custom bg-slate-200 flex flex-col items-center p-40 pt-14 gap-6">
          <div className="text-3xl">{customer?.name}</div>
          <div className="text-slate-500 ">{customer?.title}</div>
          <div className="text-slate-500 ">{customer?.address}</div>
          <div className="grid grid-cols-3 gap-8 p-8">
            {imageList.map((item) => (
              <Image
                key={item.id}
                // src={item?.download_url}
                src={`https://picsum.photos/id/${item.id}/${width}/${height}`}
                alt={"random image"}
                width={width}
                height={height}
                className="border rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
        .text-block-ellipsis {
          display: -webkit-box;
          -webkit-line-clamp: 5; 
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
 
        .scrollbar-custom {
          scrollbar-width: thin; /* For Firefox */
          scrollbar-color: transparent transparent; /* For Firefox */
        }
       .scrollbar-custom:hover {
          scrollbar-color:rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
          scrollbar-color: #4a5568 #e2e8f0; 
          scrollbar-color: #88888869 #f0f0f0;
        }
  `}
      </style>
    </main>
  );
}
