import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { default: rawCarsData } = await import('public/api/cars.json');
  const carsData = rawCarsData.map(rawCar => ({
      ...rawCar,
      learnUrl: `/learn/${rawCar.id}`,
      shopUrl: `/shop/${rawCar.id}`,
  }));
  res.json(carsData);
}

export default handler;