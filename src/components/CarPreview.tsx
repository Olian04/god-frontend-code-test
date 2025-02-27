import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Car } from "src/types/Car";
import { Chevron } from "./icons/Chevron";

interface Props {
  carData: Car;
  width: number;
  className: string;
}

export const CarPreview = ({ carData, width, className }: Props) => {
  return (
    <div className={`inline-flex flex-col space-y-2 ${className}`}>
      <h2 className="text-2xl text-gray-600 font-medium">{carData.bodyType}</h2>
      <span className="flex items-center flex-wrap">
        <h1 className="text-2xl font-bold pr-2">{carData.modelName}</h1>
        <h2 className="text-xl text-gray-600">{carData.modelType}</h2>
      </span>
      <span className="pt-6">
        <Image src={carData.imageUrl} width={width} height={width * 0.75} layout="responsive" alt={`Picture of ${carData.modelName} ${carData.modelType}`}/>
      </span>
      <span className="flex justify-around w-full py-4">
        <span className="flex justify-between w-[70%] lg:w-[55%] ">
          <Link href={carData.learnUrl}>
            <a className="text-[steelblue] text-xl font-semibold border-b-2 border-[transparent] hover:border-[steelblue]">
              LEARN
              <span className="h-full inline-flex align-middle justify-center">
                <Chevron direction="right" className="w-6 h-6 inline-block" />
              </span>
            </a>
          </Link>
          <Link href={carData.shopUrl}>
            <a className="text-[steelblue] text-xl font-semibold border-b-2 border-[transparent] hover:border-[steelblue]">
              SHOP
              <span className="h-full inline-flex align-middle justify-center">
                <Chevron direction="right" className="w-6 h-6 inline-block" />
              </span>
            </a>
          </Link>
        </span>
      </span>
    </div>
  );
};
