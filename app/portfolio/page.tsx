"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const portfolioItems = [
  {
    title: "Easter Service",
    category: "Video Production",
    image: "/placeholder.svg?height=600&width=800",
    description: "Full video production for St. Mary's Church Easter celebration service.",
    client: "St. Mary's Church",
  },
  {
    title: "Worship Album",
    category: "Audio Production",
    image: "/placeholder.svg?height=600&width=800",
    description: "Recording and mixing for Grace Community Church's worship album.",
    client: "Grace Community Church",
  },
  {
    title: "Church Website",
    category: "Web Design",
    image: "/placeholder.svg?height=600&width=800",
    description: "Modern, responsive website design for Faith Baptist Church.",
    client: "Faith Baptist Church",
  },
  {
    title: "Christmas Concert",
    category: "Video Production",
    image: "/placeholder.svg?height=600&width=800",
    description: "Multi-camera video production for annual Christmas concert.",
    client: "Hope Fellowship",
  },
  {
    title: "Sermon Series Graphics",
    category: "Graphic Design",
    image: "/placeholder.svg?height=600&width=800",
    description: "Custom graphics package for 8-week sermon series.",
    client: "Cornerstone Church",
  },
  {
    title: "Youth Camp Highlights",
    category: "Video Production",
    image: "/placeholder.svg?height=600&width=800",
    description: "Highlight video capturing the best moments from summer youth camp.",
    client: "New Life Church",
  },
  {
    title: "Pastor Podcast",
    category: "Audio Production",
    image: "/placeholder.svg?height=600&width=800",
    description: "Weekly podcast production including recording, editing, and distribution.",
    client: "Trinity Church",
  },
  {
    title: "Church Anniversary",
    category: "Photography",
    image: "/placeholder.svg?height=600&width=800",
    description: "Event photography for 50th church anniversary celebration.",
    client: "First Baptist Church",
  },
  {
    title: "Worship Lyric Videos",
    category: "Motion Graphics",
    image: "/placeholder.svg?height=600&width=800",
    description: "Custom lyric videos for worship team with motion backgrounds.",
    client: "Harvest Church",
  },
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  // Define filter categories
  const filterCategories = ["All", "Video", "Audio", "Photography", "Design"]

  // Filter portfolio items based on active filter
  const filteredItems = portfolioItems.filter((item) => {
    if (activeFilter === "All") return true
    if (activeFilter === "Video") return item.category.includes("Video")
    if (activeFilter === "Audio") return item.category.includes("Audio")
    if (activeFilter === "Photography") return item.category.includes("Photography")
    if (activeFilter === "Design") return item.category.includes("Design") || item.category.includes("Graphic")
    return true
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-background py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Our Projects</h1>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our work with churches and religious organizations across various media services.
              </p>
            </div>

            <div className="mt-12">
              <div className="flex justify-center space-x-4 mb-8">
                {filterCategories.map((category) => (
                  <Button
                    key={category}
                    variant={activeFilter === category ? "outline" : "ghost"}
                    className={`text-sm ${activeFilter === category ? "bg-primary/10 border-primary text-primary" : ""}`}
                    onClick={() => setActiveFilter(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="portfolio-grid mt-8">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                          {item.category}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-primary mt-1">Client: {item.client}</p>
                        <p className="mt-2 text-muted-foreground">{item.description}</p>
                        <Button variant="link" className="mt-2 p-0 h-auto text-primary">
                          View Project
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-muted-foreground">No projects found in this category.</p>
                  </div>
                )}
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

