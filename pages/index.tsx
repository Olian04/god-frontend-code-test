import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Car } from 'src/types/Car';

const CarCarousel = dynamic(() => import('src/components/CarCarousel'), {
  ssr: false,
});

const Home = () => {
  const [carsData, setCarsData] = useState<Car[]>([]);

  useEffect(() => {
    fetch('/api/cars')
      .then(res => res.json())
      .then(setCarsData);
  }, []);

  return (
    <div className="sm:m-6">
      <CarCarousel carsData={carsData} />
    </div>
  );
};

export default Home;
