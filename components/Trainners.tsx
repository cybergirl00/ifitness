import { trainners } from "@/data";
import { Star } from "lucide-react";
import Image from "next/image";

const Trainners = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold">
          Meet our <span className="text-red-500">Trainers</span>
        </h2>
        <h3 className="text-gray-600 text-lg font-medium mt-2 max-w-xl mx-auto">
          Get to know our expert trainers who are dedicated to guiding you on your fitness journey, offering personalized support and motivation.
        </h3>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {trainners.map((trainner, index) => (
          <div
            key={index}
            className="bg-white p-5 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={trainner?.imageUrl}
              width={300}
              height={200}
              alt={trainner?.name}
              className="w-full h-56 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold  mb-2 text-primary">
              {trainner?.name}
            </h2>
            <p className="text-gray-600 text-sm">{trainner?.about}</p>

           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainners;
