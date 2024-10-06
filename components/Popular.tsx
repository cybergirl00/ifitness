import { getExcersice } from '@/actions/rapid.actions';
import { Card, Carousel } from './apple-cards-carousel';

const Popular = async () => {
  const exercises = await getExcersice();
//   console.log(exercises)

  const cards = exercises?.map((card: any, index: any) => (
    <Card key={card.gifUrl} card={card} index={index} />
  ));
  return (
    <div>
     <div className="p-4">
        <h1 className='font-bold text-3xl text-center p-4'><span className='text-primary'>Fitness </span>Routines</h1>
        <h2 className='text-center font-[400] text-gray-500 text-sm'>Discover Popular Exercises to Boost Your Fitness Journey.</h2>
     </div>

     <div className="">
     <Carousel items={cards} />
     </div>
    </div>
  );
};

export default Popular;
