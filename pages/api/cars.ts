import { NextApiHandler } from "next";

export const loadCarsData = async () => {
  const { default: rawCarsData } = await import('public/api/cars.json');
  const carsData = rawCarsData.map(rawCar => ({
      ...rawCar,
      learnUrl: `/learn/${rawCar.id}`,
      shopUrl: `/shop/${rawCar.id}`,
  }));
  return carsData;
}

const handler: NextApiHandler = async (req, res) => {
  const carsData = await loadCarsData();
  res.json(carsData);
}

export default handler;