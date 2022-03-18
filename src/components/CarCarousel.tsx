import React, { useRef } from "react";
import { Car } from "src/types/Car";
import { CarPreview } from "./CarPreview";
import { ChevronButton } from "./ChevronButton";

interface Props {
  carsData: Car[];
}

export const CarCarousel_Desktop = ({ carsData }: Props) => {
  const scrollContainer = useRef<HTMLOListElement>(null);

  const scrollForward = () => {
    if (scrollContainer.current === null) return;
    const containerRightEdge = Math.floor(scrollContainer.current.getClientRects().item(0)?.right || 0);
    for (let child of scrollContainer.current.children) {
      const rightEdge =  Math.floor(child.getClientRects().item(0)?.right || 0);
      if (rightEdge > containerRightEdge) {
        child.scrollIntoView();
        return;
      }
    }
  }
  const scrollBackward =  () => {
    if (scrollContainer.current === null) return;
    for (let child of [...scrollContainer.current.children].reverse()) {
      const leftEdge =  Math.floor(child.getClientRects().item(0)?.left || 0);
      if (leftEdge < 0) {
        child.scrollIntoView();
        return;
      }
    }
  }
  return (
    <div className="flex flex-col">
      <ol ref={scrollContainer} className="no-scrollbar scroll-smooth h-[510px] flex overflow-x-auto snap-x snap-mandatory">
        {carsData.map((car, i) =>
          <li key={car.id} className={`inline-block p-4`}>
            <CarPreview carData={car} /> 
          </li>
        )}
      </ol>
      <div className="flex justify-end space-x-2">
        <ChevronButton  direction="left" size={60} onClick={scrollBackward}/>
        <ChevronButton  direction="right" size={60} onClick={scrollForward} />
      </div>
    </div>
  );
};


export const CarCarousel = ({ carsData }: Props)  => CarCarousel_Desktop({ carsData });
