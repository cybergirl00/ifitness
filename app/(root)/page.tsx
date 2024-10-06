import Hero from "@/components/Hero"
import Popular from "@/components/Popular"
import Testimonials from "@/components/Testimonials"
import Trainners from "@/components/Trainners"
import Transformations from "@/components/Transformations"

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
    </div>
  )
}

export default Home