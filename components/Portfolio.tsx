"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const portfolioItems = [
  {
    title: "Easter Service",
    category: "Video Production",
    image: "/placeholder.svg?height=600&width=800",
    description: "Full video production for St. Mary's Church Easter celebration service.",
  },
  {
    title: "Worship Album",
    category: "Audio Production",
    image: "/placeholder.svg?height=600&width=800",
    description: "Recording and mixing for Grace Community Church's worship album.",
  },
  {
    title: "Church Website",
    category: "Web Design",
    image: "/placeholder.svg?height=600&width=800",
    description: "Modern, responsive website design for Faith Baptist Church.",
  },
]

export default function Portfolio() {
  const [activeItem, setActiveItem] = useState<number | null>(null)

  const handleItemClick = (index: number) => {
    setActiveItem(index === activeItem ? null : index)
  }

  return (
    <div className="bg-secondary py-16 sm:py-24 relative overflow-hidden" id="portfolio">
      {/* Add background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-16 w-32 h-32 bg-primary-light rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-16 w-24 h-24 bg-secondary-light rounded-full"
          animate={{
            y: [0, 30, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Our Projects</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            A selection of our recent work for churches and religious organizations
          </p>
        </motion.div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="relative group overflow-hidden rounded-lg bg-background border-2 border-blue-500/30 hover:border-blue-500/70 shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => handleItemClick(index)}
            >
              {/* Add shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="aspect-w-16 aspect-h-9 relative">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {item.category}
                </div>
              </div>
              <div className="p-6 relative">
                <h3 className="text-lg font-semibold text-foreground transform group-hover:translate-x-1 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground transform group-hover:translate-x-1 transition-transform duration-300">
                  {item.description}
                </p>

                {activeItem === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <p className="text-sm text-muted-foreground mb-4 transform group-hover:translate-x-1 transition-transform duration-300">
                      This project showcases our expertise in {item.category.toLowerCase()}. We worked closely with the
                      client to deliver high-quality results that exceeded expectations.
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-blue-500 hover:text-blue-600 hover:bg-blue-50/5 transform group-hover:translate-y-1 transition-all duration-300"
                    >
                      View Project Details
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/portfolio">
            <Button variant="outline" className="group">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

