"use client"

import { Video, Camera, Music, Edit, PenTool, Globe, type LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { fetchContent } from "@/lib/content-utils"
import { Button } from "@/components/ui/button"

// Map of icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Video,
  Camera,
  Music,
  Edit,
  PenTool,
  Globe,
}

export default function Services() {
  const [content, setContent] = useState({
    heading: "Our Services",
    headingColor: "",
    subheading: "Professional Media Services for Churches",
    subheadingColor: "",
    description: "We offer a wide range of media services to help churches effectively communicate their message.",
    descriptionColor: "",
    backgroundColor: "",
    items: [
      {
        title: "Video Production",
        description: "Professional video recording and editing for sermons, events, and promotional content.",
        icon: "Video",
        backgroundColor: "",
        textColor: "",
        iconColor: "",
      },
      {
        title: "Photography",
        description: "High-quality photography for church events, portraits, and promotional materials.",
        icon: "Camera",
        backgroundColor: "",
        textColor: "",
        iconColor: "",
      },
      {
        title: "Audio Production",
        description: "Professional audio recording and mixing for sermons, worship music, and podcasts.",
        icon: "Music",
        backgroundColor: "",
        textColor: "",
        iconColor: "",
      },
      {
        title: "Content Creation",
        description: "Engaging content for social media, websites, and other digital platforms.",
        icon: "Edit",
        backgroundColor: "",
        textColor: "",
        iconColor: "",
      },
    ],
  })

  useEffect(() => {
    async function loadContent() {
      try {
        const servicesContent = await fetchContent("services")
        if (servicesContent) {
          console.log("Loaded services content:", servicesContent)
          setContent({
            ...content,
            ...servicesContent,
          })
        }
      } catch (error) {
        console.error("Error loading services content:", error)
      }
    }

    loadContent()

    // Set up a refresh interval to check for content changes
    const intervalId = setInterval(loadContent, 10000) // Check every 10 seconds

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div
      className="py-24 relative overflow-hidden"
      id="services"
      style={{ backgroundColor: content.backgroundColor || "" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-1/2 h-1/2 bg-primary/10 dark:bg-primary/20 rounded-full opacity-70"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-1/2 h-1/2 bg-secondary/10 dark:bg-secondary/20 rounded-full opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3"
          >
            {content.heading}
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ color: content.subheadingColor || "var(--foreground)" }}
          >
            {content.subheading}
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ color: content.descriptionColor || "var(--muted-foreground)" }}
          >
            {content.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.items.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Video

            return (
              <motion.div
                key={service.title}
                className="relative group overflow-hidden rounded-lg bg-card hover:shadow-xl transition-all duration-300 border-2 border-blue-500/30 hover:border-blue-500/70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                style={{ backgroundColor: service.backgroundColor || "" }}
              >
                {/* Add shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Card content with animations */}
                <div className="relative p-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <IconComponent
                      className="h-7 w-7 text-blue-500"
                      aria-hidden="true"
                      style={{ color: service.iconColor || "var(--primary-foreground)" }}
                    />
                  </div>
                  <h3
                    className="text-xl font-semibold text-foreground mb-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    style={{ color: service.textColor || "var(--foreground)" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-muted-foreground transform group-hover:translate-x-1 transition-all duration-300"
                    style={{ color: service.textColor ? `${service.textColor}99` : "" }}
                  >
                    {service.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-blue-500 hover:text-blue-600 hover:bg-transparent group-hover:translate-x-1 transition-transform"
                  >
                    Learn more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

