import { getCars } from '../../filterdb/getcars';

export default async function models(req,res) {
  const cars = await getCars(req.query);
  console.log(req.query);
  
  res.json(cars);
}
