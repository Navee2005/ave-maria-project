import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const teamMembers = [
  {
    name: "Michael Johnson",
    role: "Founder & Director",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Michael founded Ave Maria in 2015 with a vision to serve churches through media. He has over 15 years of experience in video production and a passion for ministry.",
  },
  {
    name: "Sarah Williams",
    role: "Lead Videographer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Sarah specializes in documentary-style videography and has filmed services and events for over 30 churches across the country.",
  },
  {
    name: "David Chen",
    role: "Audio Engineer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "David brings 10 years of studio experience to our team, ensuring the highest quality audio for all our productions.",
  },
  {
    name: "Rebecca Martinez",
    role: "Graphic Designer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Rebecca creates beautiful visual content that helps churches effectively communicate their message across various platforms.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-background py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">About Ave Maria</h1>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                Learn more about our mission, our team, and why we're passionate about serving churches through media.
              </p>
            </div>

            <div className="mt-16">
              <div className="bg-secondary rounded-lg p-8 md:p-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Ave Maria was founded in 2015 by Michael Johnson, a videographer with a passion for both media and
                    ministry. After volunteering his skills at his local church, Michael saw firsthand how professional
                    media could enhance worship and outreach efforts, but also recognized that many churches lacked the
                    resources to invest in quality media production.
                  </p>
                  <p>
                    What began as a one-person operation has grown into a team of dedicated media professionals who
                    share a common vision: to help churches effectively communicate their message through high-quality
                    media services at no cost.
                  </p>
                  <p>
                    Over the years, we've had the privilege of serving over 50 churches across various denominations,
                    helping them create impactful videos, engaging social media content, professional audio recordings,
                    and beautiful websites that extend their reach beyond the walls of their buildings.
                  </p>
                  <p>
                    Our name, "Ave Maria" (Hail Mary), reflects our dedication to serving with the same humility and
                    devotion exemplified by Mary in the Gospels. We see our work as a form of worship and ministry,
                    using our talents to glorify God and serve His church.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16" id="team">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Our Team</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="bg-background border border-border rounded-lg overflow-hidden shadow-sm"
                  >
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      <p className="mt-2 text-muted-foreground">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our passion for serving churches through media.
                Whether you're a videographer, photographer, audio engineer, or graphic designer, we'd love to hear from
                you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/volunteer">
                  <Button variant="secondary" size="lg">
                    Volunteer With Us
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    Support Our Work
                  </Button>
                </Link>
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

