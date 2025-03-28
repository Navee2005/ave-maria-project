"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Update active section based on scroll position
      if (pathname === "/") {
        const sections = ["services", "portfolio", "about", "team", "donate", "contact"]

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  // Handle navigation to sections
  const handleNavigation = (sectionId: string) => {
    setIsMenuOpen(false)

    // If we're already on the home page
    if (pathname === "/") {
      // Scroll to the section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Navigate to home page with hash
      router.push(`/#${sectionId}`)
    }

    setActiveSection(sectionId)
  }

  const isActive = (section: string) => {
    return activeSection === section
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"} transition-all duration-200`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Ave Maria
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`text-base font-medium text-gray-800 dark:text-white relative group ${
                pathname === "/" && !activeSection ? "text-primary" : ""
              } hover:text-primary transition-colors`}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <button
              onClick={() => handleNavigation("services")}
              className={`text-base font-medium text-gray-800 dark:text-white relative group ${
                isActive("services") ? "text-primary" : ""
              } hover:text-primary transition-colors bg-transparent border-none cursor-pointer`}
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavigation("portfolio")}
              className={`text-base font-medium text-gray-800 dark:text-white relative group ${
                isActive("portfolio") ? "text-primary" : ""
              } hover:text-primary transition-colors bg-transparent border-none cursor-pointer`}
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavigation("about")}
              className={`text-base font-medium text-gray-800 dark:text-white relative group ${
                isActive("about") ? "text-primary" : ""
              } hover:text-primary transition-colors bg-transparent border-none cursor-pointer`}
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavigation("contact")}
              className={`text-base font-medium text-gray-800 dark:text-white relative group ${
                isActive("contact") ? "text-primary" : ""
              } hover:text-primary transition-colors bg-transparent border-none cursor-pointer`}
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/donate">
              <Button
                variant="default"
                className={`hidden sm:inline-flex ${pathname === "/donate" ? "bg-primary/80" : ""}`}
              >
                Donate
              </Button>
            </Link>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? (
                <X size={24} className="text-gray-800 dark:text-white" />
              ) : (
                <Menu size={24} className="text-gray-800 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4 space-y-3 flex flex-col items-center">
            <Link
              href="/"
              className={`w-full text-center text-base font-medium text-gray-800 dark:text-white relative group overflow-hidden ${
                pathname === "/" && !activeSection ? "text-primary" : ""
              } hover:text-primary transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full -translate-x-1/2"></span>
              <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
            <button
              onClick={() => handleNavigation("services")}
              className={`w-full text-center text-base font-medium text-gray-800 dark:text-white relative group overflow-hidden ${
                isActive("services") ? "text-primary" : ""
              } hover:text-primary transition-colors bg-transparent border-none cursor-pointer`}
            >
              <span className="relative z-10">Services</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full -translate-x-1/2"></span>
              <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </button>
            <button
              onClick={() => handleNavigation("portfolio")}
              className={`w-full text-center text-base font-medium text-gray-800 dark:text-white relative group overflow-hidden ${
                isActive("portfolio") ? "text-primary" : ""
              } hover:text-primary transition-colors bg-transparent border-none cursor-pointer`}
            >
              <span className="relative z-10">Projects</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full -translate-x-1/2"></span>
              <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </button>
            <button
              onClick={() => handleNavigation("about")}
              className={`w-full text-center text-base font-medium text-gray-800 dark:text-white relative group overflow-hidden ${
                isActive("about") ? "text-primary" : ""
              } hover:text-primary transition-colors bg-transparent border-none cursor-pointer`}
            >
              <span className="relative z-10">About Us</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full -translate-x-1/2"></span>
              <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </button>
            <button
              onClick={() => handleNavigation("contact")}
              className={`w-full text-center text-base font-medium text-gray-800 dark:text-white relative group overflow-hidden ${
                isActive("contact") ? "text-primary" : ""
              } hover:text-primary transition-colors bg-transparent border-none cursor-pointer`}
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full -translate-x-1/2"></span>
              <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </button>
            <Link href="/donate" onClick={() => setIsMenuOpen(false)} className="w-full">
              <Button variant="default" className="w-full mt-4">
                Donate
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

