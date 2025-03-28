"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchContent } from "@/lib/content-utils"

export default function Hero() {
  const [content, setContent] = useState({
    heading1: "Spreading Faith Through Media",
    heading1Color: "#ffffff",
    heading2: "Ave Maria Media Services",
    heading2Color: "#4287f5",
    description:
      "We provide free professional media services to churches, helping them spread their message through high-quality content.",
    descriptionColor: "#ffffff",
    backgroundImage: "/images/hero-worship.png",
    overlayOpacity: 0.6,
    textColor: "#ffffff",
    primaryButton: {
      text: "Our Services",
      url: "#services",
      backgroundColor: "#2563eb",
      textColor: "#ffffff",
      hoverBackgroundColor: "#1d4ed8",
    },
    secondaryButton: {
      text: "Get in touch",
      url: "#contact",
      backgroundColor: "#ffffff",
      textColor: "#2563eb",
      hoverBackgroundColor: "#f9fafb",
    },
  })

  useEffect(() => {
    async function loadContent() {
      try {
        const heroContent = await fetchContent("hero")
        if (heroContent) {
          console.log("Loaded hero content:", heroContent)
          setContent({
            ...heroContent,
            ...content,
          })
        }
      } catch (error) {
        console.error("Error loading hero content:", error)
      }
    }

    loadContent()

    // Set up a refresh interval to check for content changes
    const intervalId = setInterval(loadContent, 10000) // Check every 10 seconds

    return () => clearInterval(intervalId)
  }, [])

  // Convert overlay opacity from decimal to rgba string
  const overlayBgColor = `rgba(0, 0, 0, ${content.overlayOpacity || 0.6})`

  return (
    <div className="bg-background py-20 md:py-32 overflow-hidden relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 z-0" style={{ backgroundColor: overlayBgColor }}></div>
        <img
          src={content.backgroundImage || "/images/hero-worship.png"}
          alt="Worship service with raised hands and cross"
          className="w-full h-full object-cover z-0"
        />
      </div>

      {/* Content - now with higher z-index */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <motion.span
              className="block mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ color: content.heading1Color || "#ffffff" }}
            >
              {content.heading1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ color: content.heading2Color || "#ffffff" }}
            >
              {content.heading2}
            </motion.span>
          </h1>
          <motion.p
            className="mt-6 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ color: content.descriptionColor || "#ffffff" }}
          >
            {content.description}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link href={content.primaryButton?.url || "#services"}>
              <Button
                size="lg"
                className="w-full sm:w-auto transition-colors"
                style={{
                  backgroundColor: content.primaryButton?.backgroundColor || "#2563eb",
                  color: content.primaryButton?.textColor || "#ffffff",
                }}
              >
                {content.primaryButton?.text || "Our Services"}
              </Button>
            </Link>
            <Button
              size="lg"
              className="w-full sm:w-auto transition-colors"
              style={{
                backgroundColor: content.secondaryButton?.backgroundColor || "#ffffff",
                color: content.secondaryButton?.textColor || "#2563eb",
              }}
              onClick={() => {
                const targetUrl = content.secondaryButton?.url || "#contact"
                if (targetUrl.startsWith("#")) {
                  const element = document.getElementById(targetUrl.substring(1))
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                } else {
                  window.location.href = targetUrl
                }
              }}
            >
              {content.secondaryButton?.text || "Get in touch"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

