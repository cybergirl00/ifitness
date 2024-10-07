'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import emailjs from '@emailjs/browser'
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState } from "react"
import { Loader } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(2)
})

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false)
   const sendEmail = useMutation(api.email.sendEmail)
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      await sendEmail({
        fromEmail: values.email,
        fromName: values.name,
        message: values.message
      });

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: values.name,
          email: values.email, 
          message: values.message
        })
      })
      if(response.ok) {
        toast("Email sent!, we will get back to you soon.")
        setIsLoading(false)
      }

      if (!response.ok) {
        setIsLoading(false)
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setIsLoading(false)
    }
  };
  const contactMethods = [
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ,
        contact: "Support@example.com"
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
        ,
        contact: "+1 (555) 000-000"
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ,
        contact: "Mountain View, California, United State."
    },
]
  return (
    <div>
        <div className="p-5">
            <h2 className='text-3xl font-bold text-center'><span className='text-primary'>Contact</span> Us</h2>
        </div>

        <div className="">
          <main className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                    <div className="max-w-lg space-y-3">
                        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Let us know how we can help
                        </p>
                        <p>
                            We’re here to help and answer any question you might have, We look forward to hearing from you! Please fill out the form, or us the contact information bellow .
                        </p>
                        <div>
                            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                                {
                                    contactMethods.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-x-3">
                                            <div className="flex-none text-primary">
                                                {item.icon}
                                            </div>
                                            <p>{item.contact}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
                    <Form {...form}> 
                    <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                           <FormField
                           control={form.control}
                             name="name"
                           render={({ field }) => (
                          <FormItem>
                   <FormLabel className="font-medium">Full name</FormLabel>
                   <FormControl>
                <Input placeholder="John Doe" {...field}   className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                             <FormField
                           control={form.control}
                             name="email"
                           render={({ field }) => (
                          <FormItem>
                   <FormLabel className="font-medium">Email</FormLabel>
                   <FormControl>
                <Input placeholder="Email address" {...field}   className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
                           control={form.control}
                             name="message"
                           render={({ field }) => (
                          <FormItem>
                   <FormLabel className="font-medium">Message</FormLabel>
                   <FormControl>
                   <Textarea  className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg" {...field}  />
              </FormControl>
              <FormMessage />
                </FormItem>
          )}
        />
                          
                            <Button
                                className="w-full px-4 py-2 text-white font-medium rounded-lg duration-150"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                  <Loader className='h-4 w-4 animate-spin' />
                                ) : 'Submit'}
                            </Button>
                        </form>
                    </Form>
                    </div>
                </div>
            </div>
            </main>
        </div>
    </div>
  )
}

export default Contact