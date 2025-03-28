import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Portfolio from "@/components/Portfolio"
import About from "@/components/About"
import TeamSlider from "@/components/TeamSlider"
import Donate from "@/components/Donate"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <TeamSlider />
        <Donate />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

