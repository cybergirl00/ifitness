import React from 'react';
import { Compare } from './compare';

const Transformations = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Unleash Your Full Potential
        </h1>
        <h2 className="text-xl text-gray-600 mt-4">
          Real stories of transformation backed by our professional support.
        </h2>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        {/* Promise Section */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-extrabold mb-6">
            We <span className="text-red-500">Promise</span>
          </h2>
          <ul className="list-disc pl-5 space-y-4 text-lg text-gray-700">
            <li>Personalized Training Programs</li>
            <li>State-of-the-Art Equipment</li>
            <li>Certified Professional Trainers</li>
            <li>Flexible Membership Plans</li>
            <li>Clean and Safe Environment</li>
          </ul>
        </div>

        {/* Compare Section (unchanged) */}
        <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800 px-4">
          <Compare
            firstImage="https://assets.aceternity.com/code-problem.png"
            secondImage="https://assets.aceternity.com/code-solution.png"
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
            slideMode="hover"
          />
        </div>
      </div>
    </div>
  );
};

export default Transformations;
