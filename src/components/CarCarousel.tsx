import React, { useRef, useState } from "react";
import { Car } from "src/types/Car";
import { CarPreview } from "src/components/CarPreview";
import { ChevronButton } from "src/components/ChevronButton";

interface Props {
  carsData: Car[];
  isMobile: boolean;
}

export const DesktopCarCarousel = ({ carsData }: Props) => {
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
        {carsData.map(car =>
          <li key={car.id} className="inline-block p-4">
            <CarPreview carData={car} width={400} className="w-[400px]" /> 
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

export const MobileCarCarousel = ({ carsData }: Props) => {
  const scrollContainer = useRef<HTMLOListElement>(null);
  const [scrollIndicator, setScrollIndicator] = useState(0);

  const updateScrollIndicator = () => {
    if (scrollContainer.current === null) return;
    const containerRightEdge = Math.floor(scrollContainer.current.getClientRects().item(0)?.right || 0);
    for (let i = 0; i < scrollContainer.current.children.length; i ++) {
      const child =  scrollContainer.current.children.item(i);
      if (child === null) continue;
      const rect = child.getClientRects().item(0);
      const childWidth = Math.floor(rect?.width || 0);
      const rightEdge =  Math.floor(rect?.right || 0);
      const leftEdge =  Math.floor(rect?.left || 0);
      const overflowLeft = Math.abs(leftEdge);
      const overflowRight = Math.abs(rightEdge - containerRightEdge);
      if (
        overflowLeft < 0.25*childWidth
        &&
        overflowRight < 0.25*childWidth
        ) {
          // Child is strictly inside of scroll container
          setScrollIndicator(i);
          return;
        }
    }
  }
  return (
    <div className="flex flex-col">
      <ol ref={scrollContainer}  onScroll={updateScrollIndicator} className="no-scrollbar scroll-smooth h-[510px] flex overflow-x-auto snap-x snap-mandatory">
        {carsData.map(car =>
          <li key={`preview-${car.id}`} className="inline-block p-4">
            <CarPreview carData={car} width={300} className="w-[300px]" /> 
          </li>
        )}
      </ol>
      <div className="flex justify-center space-x-2 w-full">
        {
          carsData.map(({ id }, i) => {
            const bg = {
              selected:  'bg-black',
              idle: 'bg-gray-300',
            }
            return (
              <span key={`indicator-${id}`} aria-hidden='true' className={`rounded-full w-4 h-4 ${scrollIndicator === i ? bg.selected : bg.idle}`}></span>
            );
          })
        }
      </div>
    </div>
  );
};

export const CarCarousel = (props: Props)  => {
  if (props.isMobile) {
    return <MobileCarCarousel {...props} />;
  }
  return <DesktopCarCarousel {...props} />;
};

export default CarCarousel;
