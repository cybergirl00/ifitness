'use client'
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import Membership from "@/components/Membership"
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

      {/* <div className="">
        <Popular />
      </div> */}

      <Trainners />

      <div className="">
        <Transformations />
      </div>

      <Testimonials />

      <section id='membership'>
      <Membership />
      </section>

      <Contact />

      <Footer />
    </div>
  )
}

export default Home