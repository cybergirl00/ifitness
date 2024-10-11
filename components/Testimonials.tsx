'use client'
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";

const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const testimonials = useQuery(api.admin.getApprovedReviews);

    // Function to render stars based on the rating
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star key={i} className={`w-5 h-5 ${i < rating ? "text-primary" : "text-gray-300"}`} />
            );
        }
        return stars;
    };

    return (
        <div>
            <div className="p-5">
                <h3 className="font-bold text-3xl text-center">What our <span className='text-primary'>Customers</span> say:</h3>
            </div>

            <section className="py-14">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <ul>
                            {
                                testimonials?.map((item, idx) => (
                                    currentTestimonial == idx ? (
                                        <li key={idx}>
                                            <figure>
                                                <blockquote>
                                                    <p className="text-gray-800 text-xl font-semibold sm:text-2xl">
                                                        “{item?.message}“
                                                    </p>
                                                </blockquote>
                                                <div className="mt-6">
                                                    <Image src={'/user.jpg'} className="w-16 h-16 mx-auto rounded-full" 
                                                    width={200}
                                                    height={200}
                                                    alt='user'
                                                    />
                                                    <div className="mt-3">
                                                        <span className="block text-gray-800 font-semibold">{item.name}</span>
                                                        {/* Render stars based on the rating */}
                                                        <div className="flex justify-center mt-2">
                                                            {renderStars(item.rating)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </figure>
                                        </li>
                                    ) : ""
                                ))
                            }
                        </ul>
                    </div>
                    <div className="mt-6">
                        <ul className="flex gap-x-3 justify-center">
                            {
                                testimonials?.map((item, idx) => (
                                    <li key={idx}>
                                        <button className={`w-2.5 h-2.5 rounded-full duration-150 ring-offset-2 ring-primary focus:ring ${currentTestimonial == idx ? "bg-primary" : "bg-gray-300"}`}
                                            onClick={() => setCurrentTestimonial(idx)}
                                        ></button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Testimonials;
