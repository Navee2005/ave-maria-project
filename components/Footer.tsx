"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { fetchContent } from "@/lib/content-utils"

// Map of icon names to Lucide components
const iconMap: Record<string, any> = {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
}

// Default footer content
const defaultFooterContent = {
  logo: "Ave Maria Media Services",
  tagline: "Spreading Faith Through Media",
  address: "123 Faith Street, Anytown, USA 12345",
  phone: "(555) 123-4567",
  email: "info@avemariamedia.org",
  socialLinks: [
    { platform: "Facebook", url: "#", icon: "Facebook" },
    { platform: "Instagram", url: "#", icon: "Instagram" },
    { platform: "Twitter", url: "#", icon: "Twitter" },
    { platform: "YouTube", url: "#", icon: "Youtube" },
  ],
  quickLinks: [
    { label: "Services", url: "#services" },
    { label: "Portfolio", url: "#portfolio" },
    { label: "About Us", url: "#about" },
    { label: "Donate", url: "#donate" },
    { label: "Contact", url: "#contact" },
  ],
  copyright: `© ${new Date().getFullYear()} Ave Maria Media Services. All rights reserved.`,
}

export default function Footer() {
  const [content, setContent] = useState(defaultFooterContent)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadContent() {
      try {
        setIsLoading(true)
        const footerContent = await fetchContent("footer")
        if (footerContent) {
          setContent({ ...defaultFooterContent, ...footerContent })
        }
      } catch (error) {
        console.error("Error loading footer content:", error)
        // Keep using the default content
      } finally {
        setIsLoading(false)
      }
    }

    loadContent()

    // Set up a refresh interval to check for content changes
    const intervalId = setInterval(loadContent, 30000) // Check every 30 seconds

    return () => clearInterval(intervalId)
  }, [])

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About column */}
          <div>
            <h3 className="text-xl font-bold mb-4">{content.logo}</h3>
            <p className="text-gray-400 mb-4">{content.tagline}</p>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-2 mt-1" />
                <p className="text-gray-400">{content.address}</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-2" />
                <p className="text-gray-400">{content.phone}</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-2" />
                <p className="text-gray-400">{content.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {content.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="text-gray-400 hover:text-primary transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <p className="text-gray-400 mb-4">
              Follow us on social media to stay updated with our latest projects and services.
            </p>
            <div className="flex space-x-4">
              {content.socialLinks.map((social, index) => {
                const IconComponent = iconMap[social.icon] || Facebook

                return (
                  <Link
                    key={index}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                    aria-label={social.platform}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">{content.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

