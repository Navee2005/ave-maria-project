"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"

const teamMembers = [
  {
    name: "Michael Johnson",
    role: "Founder & Director",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Sarah Williams",
    role: "Lead Videographer",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "David Chen",
    role: "Audio Engineer",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Rebecca Martinez",
    role: "Graphic Designer",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "James Wilson",
    role: "Content Strategist",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Emily Taylor",
    role: "Photographer",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Thomas Brown",
    role: "Video Editor",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Sophia Garcia",
    role: "Social Media Manager",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function TeamSlider() {
  const controls = useAnimationControls()
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Create a triple set of team members to ensure seamless looping
  const extendedTeamMembers = [...teamMembers, ...teamMembers, ...teamMembers]

  useEffect(() => {
    const startAnimation = async () => {
      if (!sliderRef.current || isHovered) return

      const sliderWidth = sliderRef.current.scrollWidth / 3

      await controls.start({
        x: -sliderWidth,
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        },
      })
    }

    startAnimation()

    return () => {
      controls.stop()
    }
  }, [controls, isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
    controls.stop()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!sliderRef.current) return

    const sliderWidth = sliderRef.current.scrollWidth / 3
    controls.start({
      x: -sliderWidth,
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    })
  }

  return (
    <div className="py-24 bg-background relative overflow-hidden" id="team">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-1/2 h-1/2 bg-primary-light rounded-full"
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
          className="absolute -bottom-1/2 -left-1/4 w-1/2 h-1/2 bg-secondary-light rounded-full"
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
        <div className="text-center mb-12">
          <motion.h2
            className="text-base text-primary font-semibold tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Team
          </motion.h2>
          <motion.p
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Meet the People Behind Ave Maria
          </motion.p>
          <motion.p
            className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Our talented team of media professionals dedicated to serving churches
          </motion.p>
        </div>

        <div className="relative overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <motion.div
            ref={sliderRef}
            className="flex space-x-6 py-4"
            animate={controls}
            initial={{ x: 0 }}
            style={{ width: "fit-content" }}
          >
            {extendedTeamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-64 relative group overflow-hidden rounded-lg bg-card/80 backdrop-blur-sm border-2 border-blue-500/30 hover:border-blue-500/70 transition-all duration-300 shadow-lg"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                {/* Add shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="p-6 flex flex-col items-center relative bg-black/5 dark:bg-white/5">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-500/20 group-hover:border-blue-500/40 transition-colors duration-300">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-center transform group-hover:translate-y-[-2px] transition-transform duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-500 mt-1 text-center transform group-hover:translate-y-[-2px] transition-transform duration-300">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10"></div>
        </div>
      </div>
    </div>
  )
}

