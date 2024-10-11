'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { CircleCheck, Loader2 } from 'lucide-react';

// Validation schema using zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  message: z.string().min(1, "Message is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  rate: z.coerce.number().min(1, "Rating should be between 1 to 10").max(10),
});

const AddReviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const addReview = useMutation(api.admin.addReview);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      email: "",
      phone: "",
      rate: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await addReview({
        name: values.name,
        message: values.message,
        email: values.email,
        phone: values.phone,
        rating: values.rate,
        approved: false,
      });
      setIsLoading(false);
      setSent(true);
      toast.success("Review sent successfully!");
    } catch (error) {
      console.error('Error submitting review:', error);
      setIsLoading(false);
      toast.error("Error submitting review.");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/i.jpg')", // Update with your image path
      }}
    >
      {sent === false ? (
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Add a Review</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold text-gray-700">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="mt-1 w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Rating */}
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold text-gray-700">Rating (1 to 10)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Rating" {...field} className="mt-1 w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold text-gray-700">Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Phone Number" {...field} className="mt-1 w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold text-gray-700">Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email address" {...field} className="mt-1 w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold text-gray-700">Write a Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Message" {...field} className="mt-1 w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                {isLoading ? <Loader2 size={24} className='animate-spin' /> : 'Submit'}
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="bg-white p-6 flex flex-col items-center justify-center gap-5 shadow-md mt-10">
          <CircleCheck className="text-primary" size={50} />
          <h2>Review sent! Thank you.</h2>
        </div>
      )}
    </div>
  );
};

export default AddReviews;
