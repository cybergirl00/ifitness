import Contact from "@/components/Contact"
import Hero from "@/components/Hero"
import Membership from "@/components/Membership"
import Popular from "@/components/Popular"
import Testimonials from "@/components/Testimonials"
import Trainners from "@/components/Trainners"
import Transformations from "@/components/Transformations"
import { toast } from "sonner"

const Home = () => {

  return (
    <div>
      <div className="">
        <Hero />
      </div>

      <div className="">
        <Popular />
      </div>

      <Trainners />

      <div className="">
        <Transformations />
      </div>

      <Testimonials />

      <Membership />

      <Contact />
    </div>
  )
}

export default Home