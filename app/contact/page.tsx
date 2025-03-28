import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-background py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Contact Us</h1>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                We'd love to hear from you. Reach out to discuss your church's media needs or learn more about our
                services.
              </p>
            </div>

            <Contact />

            <div className="mt-16 bg-secondary rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left mt-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Are your services really free?</h3>
                  <p className="text-muted-foreground">
                    Yes, all our media services are provided at no cost to churches. We're able to do this through the
                    generous support of our donors and volunteers.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">How far in advance should we book?</h3>
                  <p className="text-muted-foreground">
                    We recommend contacting us at least 4-6 weeks before your event or project to ensure availability,
                    though we do our best to accommodate last-minute requests.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Do you serve churches of all denominations?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, we serve churches across all Christian denominations. Our focus is on helping all churches
                    effectively communicate their message.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">How can we support your ministry?</h3>
                  <p className="text-muted-foreground">
                    You can support us through one-time or monthly donations, volunteering your skills, or by spreading
                    the word about our services to other churches.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/">
                <Button variant="outline" className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

