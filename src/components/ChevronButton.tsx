import { PropsWithChildren } from 'react';
import { Chevron, Props as ChevronProps } from './icons/Chevron';

interface Props {
  direction: ChevronProps['direction'];
  size: number;
  onClick?: () => void;
}

export const ChevronButton = ({ size, direction, onClick }: PropsWithChildren<Props>) => {
  return (
  <button className="rounded-full border-2 border-black flex justify-center align-middle shadow-sm hover:bg-[steelblue] hover:border-[steelblue] hover:text-white active:border-black active:text-black" style={{
    height: `${size}px`,
    width: `${size}px`,
  }} onClick={onClick}>
    <div className="h-full inline-flex items-center justify-center">
        <Chevron direction={direction} />
      </div>
  </button>
  );
}