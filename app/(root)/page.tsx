import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
// import Membership from "@/components/Membership"
import Testimonials from "@/components/Testimonials"
import Trainners from "@/components/Trainners"
import Transformations from "@/components/Transformations"
import dynamic from 'next/dynamic';


const Membership = dynamic(() => import('@/components/Membership'), { ssr: false });

const Home = () => {
  return (
    <div>
        <Hero />

      <Trainners />

      
        <Transformations />
      

      <Testimonials />

      
      <Membership />

      <Contact />

      <Footer />
    </div>
  )
}

export default Home