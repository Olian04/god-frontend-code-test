import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useUserAgent } from 'next-useragent';
import { useState } from 'react';
import { CarCarousel } from 'src/components/CarCarousel';
import { CarFilter } from 'src/components/CarFilter';
import { loadCarsData } from 'pages/api/cars';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {
      uaString: context.req.headers['user-agent'],
      carsData: await loadCarsData(),
    }
  }
}

const Home = ({ uaString, carsData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedBodyType, setSelectedBodyType] = useState<string>('');
  const [filteredCardsData, setFilteredCarsData] = useState(carsData);
  const userAgent = useUserAgent(uaString || window.navigator.userAgent);

  const filterCarsDataOnBodyType = (bodyType: string) => {
    setSelectedBodyType(bodyType);
    setFilteredCarsData(carsData.filter(car => car.bodyType === bodyType));
  }

  const clearSelectedBodyType = () => {
    setFilteredCarsData(carsData);
    setSelectedBodyType('');
  }

  return (
    <div className="sm:m-6 flex flex-col">
      <span className="flex items-center justify-center p-2">
        <button onClick={clearSelectedBodyType} aria-label='clear search' className='p-1'>
          <svg xmlns="http://www.w3.org/2000/svg" className="text-[steelblue] w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <CarFilter carsData={carsData} selected={selectedBodyType} onChange={filterCarsDataOnBodyType} />
      </span>
      <CarCarousel carsData={filteredCardsData} isMobile={userAgent.isMobile} />
    </div>
  );
};

export default Home;
