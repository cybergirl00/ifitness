'use client'
import Image from "next/image";
import { Button } from "./ui/button";
import { BackgroundLines } from "./background-lines.tsx";

const Hero = () => {
  return (
    <div className="">
    <div className="mx-auto  flex flex-col lg:flex-row items-center gap-24 p-8 lg:p-16 bg-gray-100 rounded-lg">
      {/* Text Section */}
      <div className="lg:w-1/2 px-3">
      <BackgroundLines>
      <h3 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          Achieve Your <span className='text-red-500'>Goals</span>, One Workout at a Time
        </h3>
      </BackgroundLines>
        <h2 className="text-xl text-gray-700 leading-relaxed">
          Daily challenges and progress tracking to keep you on track. Train
          smart, train hard, and <span className="text-red-500 font-light">unlock</span>  your full potential.
        </h2>

       <div className="pt-6">
       <Button className="bg-red-500 w-full hover:bg-red-400">Explore</Button>
       </div>
       
      
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 p-2">
        <Image
          src={"/girl1.jpg"}
          width={400}
          height={400}
          alt="fitness girl"
          className="rounded-lg object-cover hover:scale-105 transition-transform duration-300 rounded-bl-[50%]"
        />
      </div>
    </div>
    </div>
  );
};

export default Hero;
