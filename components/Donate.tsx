"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Heart, DollarSign, Calendar, Gift } from "lucide-react"
import Link from "next/link"
import DonationModal from "./DonationModal"

export default function Donate() {
  const [modalOpen, setModalOpen] = useState(false)
  const [donationType, setDonationType] = useState<"one-time" | "monthly" | "equipment">("one-time")

  const openModal = (type: "one-time" | "monthly" | "equipment") => {
    setDonationType(type)
    setModalOpen(true)
  }

  return (
    <div className="bg-primary" id="donate">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-primary-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="block">Support Our Ministry</span>
          <span className="block mt-2">Help Us Serve More Churches</span>
        </motion.h2>
        <motion.p
          className="mt-4 text-lg leading-6 text-primary-foreground/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Your generous donations allow us to continue providing free media services to churches in need. Every
          contribution makes a difference in our ability to serve and expand our reach.
        </motion.p>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Heart className="h-10 w-10 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">One-time Gift</h3>
            <p className="text-primary-foreground/80 mb-4">
              Support our ministry with a one-time donation of any amount.
            </p>
            <Button size="sm" variant="secondary" className="w-full" onClick={() => openModal("one-time")}>
              <DollarSign className="h-4 w-4 mr-2" /> Donate Now
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Calendar className="h-10 w-10 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Monthly Partner</h3>
            <p className="text-primary-foreground/80 mb-4">Become a monthly partner to provide sustainable support.</p>
            <Button size="sm" variant="secondary" className="w-full" onClick={() => openModal("monthly")}>
              <DollarSign className="h-4 w-4 mr-2" /> Become a Partner
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Gift className="h-10 w-10 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Equipment Donation</h3>
            <p className="text-primary-foreground/80 mb-4">Donate cameras, audio equipment, or other media gear.</p>
            <Button size="sm" variant="secondary" className="w-full" onClick={() => openModal("equipment")}>
              <DollarSign className="h-4 w-4 mr-2" /> Contact Us
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/donate">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Learn More About Donating
            </Button>
          </Link>
        </motion.div>
      </div>

      <DonationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} donationType={donationType} />
    </div>
  )
}

